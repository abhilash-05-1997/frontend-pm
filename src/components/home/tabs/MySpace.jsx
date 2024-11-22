import { NavLink, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Activities_tab from '../myspace_subtabs/Activities_tab';
import Profile_tab from '../myspace_subtabs/Profile_tab';
import Approvals_tab from '../myspace_subtabs/Approvals_tab';
import Feeds_tab from '../myspace_subtabs/Feeds_tab';
import Leave_tab from '../myspace_subtabs/Leave_tab';
import Files_tab from '../myspace_subtabs/Files_tab';
import RelatedData_tab from '../myspace_subtabs/RelatedData_tab';
import clsx from 'clsx'

function MySpace() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("Overview");
  const [activeTab, setActiveTab] = useState("My Space");



  function TabNavigation() {
    const [showDropdown, setShowDropdown] = useState(false);
    const OVERVIEW_TABS = ['Activities', 'Profile', 'Approvals', 'Feeds', 'Leave', 'Files', 'Related Data'];

  
    return (
      <div className="flex items-center justify-center space-x-4 mb-4 text-gray-600 relative">
        {/* Display the first three main icons */}
        {OVERVIEW_TABS.slice(0, 3).map((label) => (
          <NavLink
            key={label}
            to={`?tab=${label.toLowerCase().replace(' ', '-')}`} // Converts label to query parameter
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }
          >
            {label}
          </NavLink>
        ))}
  
        {/* Three dots for the dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="focus:outline-none text-gray-600 hover:text-blue-600"
          >
            &#x2026; {/* Unicode for three dots (ellipsis) */}
          </button>
          
          {/* Dropdown for remaining tabs */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
              {OVERVIEW_TABS.slice(3).map((label) => (
                <NavLink
                  key={label}
                  to={`?tab=${label.toLowerCase().replace(' ', '-')}`}
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-2 text-blue-600 font-semibold"
                      : "block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                  }
                  onClick={() => setShowDropdown(false)} // Close dropdown on click
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  

  const renderTabContent = () => {
    switch (tab) {
      case 'activities':
        return < Activities_tab/>;
      case 'profile':
        return <Profile_tab/>;
      case 'approvals':
        return <Approvals_tab />;
      case 'feeds':
        return <Feeds_tab/>;
      case 'leave':
        return <Leave_tab />;
      case 'files':
        return <Files_tab />;
      case 'related-data':
        return <RelatedData_tab />;
      default:
        return <Activities_tab />; // Default to Activities if tab is undefined
    }
  };

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 font-semibold",
        isActive
          ? "text-black-300 border-b-2 border-blue-600 bg-gray-200"
          : "text-gray-500 hover:text-blue-600"
      )}
    >
      {label}
    </button>
  );
  
  // Reusable Card component
  const Card = ({ title, content, className }) => (
    <div className={clsx("bg-white shadow-md rounded-lg p-4", className)}>
      <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
      <p className="text-gray-500 mt-2">{content}</p>
    </div>
  );
  
  // Reusable Header component for background image and profile text
  const Header = ({ backgroundImage, title }) => (
    <div
      className="relative bg-cover bg-center h-36 rounded-lg mb-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-lg">
        <h1 className="text-white text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );
  

  return (
    <>
    <div className="flex space-x-4 border-b-2 border-gray-200 mb-4">
        {/* {["My Space", "Organization"].map((label) => (
          <TabButton
            key={label}
            label={label}
            isActive={activeTab === label}
            onClick={() => setActiveTab(label)}
          />
        ))} */}
      </div>

      {/* Secondary Navigation Tabs */}
      <div className="flex space-x-4 mb-4 border-b-2 border-gray-200 mt-8">
        {["Overview", "Dashboard"].map((label) => (
          <TabButton
            key={label}
            label={label}
            isActive={activeSecondaryTab === label}
            onClick={() => setActiveSecondaryTab(label)}
          />
        ))}
      </div>

      {/* Header with background image and profile text */}
      <Header
        backgroundImage="https://example.com/your-image.jpg"
        title="Abhilash"
      />

    <div>
      <TabNavigation />
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  </>
  );
}

export default MySpace;
