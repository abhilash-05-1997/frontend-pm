import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaClipboardCheck, FaUser, FaCalendar, FaUsers } from "react-icons/fa"; // Importing icons
import NewHire_tab from "../org_subtabs/NewHire_tab";
import LeavePolicies_tab from "../org_subtabs/LeavePolicies_tab";
import Holidays_tab from "../org_subtabs/Holidays_tab";
import Employee_tab from "../org_subtabs/Employee_tab";

const Organization = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentTab = queryParams.get("tab") || "announcements";
  const [showDropdown, setShowDropdown] = useState(false);

  // All Tabs
  const allTabs = [
    // { name: "Announcements", query: "announcements", icon: <FaBullhorn /> },
    // { name: "Policies", query: "policies", icon: <FaClipboardList /> },
    { name: "Employees", query: "employees", icon: <FaUsers /> },
    // { name: "Department Tree", query: "department-tree", icon: <FaTree /> },
    // { name: "Department Directory", query: "department-directory", icon: <FaAddressBook /> },
    // { name: "Birthday Folks", query: "birthday-folks", icon: <FaBirthdayCake /> },
    { name: "New Hires", query: "new-hires", icon: <FaUser /> },
    {
      name: "Leave Policies",
      query: "leave-policies",
      icon: <FaClipboardCheck />,
    },
    { name: "Holidays", query: "holidays", icon: <FaCalendar /> },
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      // case "announcements":
      //   return <Announcements_Tab />;
      // case "policies":
      //   return <Policies_tab />;
      // case "department-tree":
      //   return <DepartmentTree_tab />;
      // case "department-directory":
      //   return <DepartmentDirectory_tab />;
      // case "birthday-folks":
      //   return <Birthdays_tab />;

      case "new-hires":
        return <NewHire_tab />;
      case "leave-policies":
        return <LeavePolicies_tab />;
      case "employees":
        return <Employee_tab />;
      case "holidays":
        return <Holidays_tab />;
      default:
        return <NewHire_tab />;
    }
  };

  const handleTabClick = () => {
    setShowDropdown(false); // Close the dropdown when a tab is clicked
  };

  return (
    <div className="mt-6 px-4 md:px-8 bg-gray-50 rounded-lg shadow-md max-w-[1600px] dark:bg-dark-bg dark:text-dark-text">
      {/* Tabs for all screen sizes */}
      <div className="flex flex-wrap gap-4 border-b pb-4">
        {allTabs.map(({ name, query, icon }) => (
          <NavLink
            key={query}
            to={`?tab=${query}`}
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm md:text-base font-medium p-2 transition duration-300 ease-in-out rounded-xl ${
                currentTab === query
                  ? "text-blue-600 bg-blue-100 dark:bg-dark-card dark:text-dark-text"
                  : "text-gray-600 border-transparent hover:text-blue-600 hover:bg-blue-50 dark:text-dark-text dark:hover:text-dark-text dark:hover:bg-purple-700  "
              }`
            }
            onClick={handleTabClick} // Close dropdown on click
          >
            {icon}
            {name}
          </NavLink>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 text-center text-gray-600 dark:bg-dark-bg">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Organization;
