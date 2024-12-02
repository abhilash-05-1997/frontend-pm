import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import MySpace from "./tabs/MySpace";
import Organization from "./tabs/Organization";
import apiService from "../../api/apiService";

const Home = () => {
  // Main tabs (MySpace and Organization)
  const [company, setCompany] = useState({});
  const location = useLocation();
  const [role, setRole] = useState('Employee');

  const GET_COMPANY = "api/employees/me/";
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await apiService.fetchInstance(GET_COMPANY);
        setCompany(response.data);
        localStorage.setItem("company_id", response.data.company);
        localStorage.setItem("emp_id", response.data.id);
      } catch (error) {
        console.error("Failed to fetch company", error);
      }
    };
    fetchCompany();
    setRole(localStorage.getItem('Role'))
  }, []);

 // This could come from a state or props

// Filter out the "Organization" tab if the role is "Employee"
const mainTabs = [
  { name: "My Space", path: "/home/myspace/overview/?tab=profile" },
  { name: "Organization", path: "/home/organization?tab=new-hires" },
];

const filteredTabs = role === 'Employee'
  ? mainTabs.filter(tab => tab.name !== "Organization")
  : mainTabs;
  

 
  return (
    <div className="bg-gray-100 dark:bg-dark-bg w-full">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        {/* Main Tabs */}
        <div className="light:bg-white flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 gap-2 sm:gap-4 border-b pb-4 dark:border-gray-700 py-4">
          {filteredTabs.map((tab, index) => {
            // Log tab details for debugging
            // Determine if the tab is active
            const isActive = location.pathname.includes(`home/${tab.name}`.toLowerCase().replace(" ", ""))

            return (
              <NavLink
                key={index}
                to={tab.path.toLowerCase().replace(" ", "")}
                end
                className={() =>
                  `text-base sm:text-lg font-semibold pb-2 px-3 sm:px-4 sm:py-2 rounded-xl ${
                    isActive
                      ? "text-blue-500 bg-gray-200 dark:bg-dark-card dark:text-dark-text"
                      : "text-gray-500 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`
                }
              >
                {tab.name}
              </NavLink>
            );
          })}
        </div>

        {/* Dynamic Routing for Content */}
        <Routes>
          <Route path="/myspace/*" element={<MySpace />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
