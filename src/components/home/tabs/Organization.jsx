import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaBullhorn, FaClipboardList, FaUsers, FaTree, FaAddressBook, FaBirthdayCake, FaClipboardCheck, FaUser, FaCalendar } from "react-icons/fa"; // Importing icons
import Announcements_Tab from "../org_subtabs/Announcements_Tab";
import Policies_tab from "../org_subtabs/Policies_tab";
import EmployeeTree_tab from "../org_subtabs/EmployeeTree_tab";
import DepartmentTree_tab from "../org_subtabs/DepartmentTree_tab";
import DepartmentDirectory_tab from "../org_subtabs/DepartmentDirectory_tab";
import Birthdays_tab from "../org_subtabs/Birthdays_tab";
import NewHire_tab from "../org_subtabs/NewHire_tab";
import LeavePolicies_tab from "../org_subtabs/LeavePolicies_tab";
import Holidays_tab from "../org_subtabs/Holidays_tab";

const Organization = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const currentTab = queryParams.get("tab") || "announcements";
  const [showDropdown, setShowDropdown] = useState(false);

  // All Tabs
  const allTabs = [
    { name: "Announcements", query: "announcements", icon: <FaBullhorn /> },
    { name: "Policies", query: "policies", icon: <FaClipboardList /> },
    { name: "Employee Tree", query: "employee-tree", icon: <FaUsers /> },
    { name: "Department Tree", query: "department-tree", icon: <FaTree /> },
    { name: "Department Directory", query: "department-directory", icon: <FaAddressBook /> },
    { name: "Birthday Folks", query: "birthday-folks", icon: <FaBirthdayCake /> },
    { name: "New Hires", query: "new-hires", icon: <FaUser /> },
    { name: "Leave Policies", query: "leave-policies", icon: <FaClipboardCheck /> },
    { name: "Holidays", query: "holidays", icon: <FaCalendar /> }
  ];

  const renderTabContent = () => {
    switch (currentTab) {
      case "announcements":
        return <Announcements_Tab />;
      case "policies":
        return <Policies_tab />;
      case "employee-tree":
        return <EmployeeTree_tab />;
      case "department-tree":
        return <DepartmentTree_tab />;
      case "department-directory":
        return <DepartmentDirectory_tab />;
      case "birthday-folks":
        return <Birthdays_tab />;
      case "new-hires":
        return <NewHire_tab />;
      case "leave-policies":
        return <LeavePolicies_tab />;
      case "holidays":
        return <Holidays_tab/>
      default:
        return <Announcements_Tab />;
    }
  };

  const handleTabClick = () => {
    setShowDropdown(false); // Close the dropdown when a tab is clicked
  };

  return (
    <div className="mt-6 px-4 md:px-8 bg-gray-50 rounded-lg shadow-md">
      {/* Tabs for all screen sizes */}
      <div className="flex flex-wrap gap-4 border-b pb-4">
        {allTabs.map(({ name, query, icon }) => (
          <NavLink
            key={query}
            to={`?tab=${query}`}
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm md:text-base font-medium pb-2 border-b-2 transition duration-300 ease-in-out rounded-lg ${
                currentTab === query
                  ? "text-blue-600 border-blue-600 bg-blue-100"
                  : "text-gray-600 border-transparent hover:text-blue-600 hover:bg-blue-50"
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
      <div className="mt-6 text-center text-gray-600">{renderTabContent()}</div>
    </div>
  );
};

export default Organization;