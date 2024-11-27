import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MySpace from "./tabs/MySpace";
import Organization from "./tabs/Organization";
import apiService from "../../api/apiService";

const Home = () => {
  // Main tabs (MySpace and Organization)
  const [company, setCompany] = useState({});

  const GET_COMPANY = 'api/employees/me/';
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await apiService.fetchInstance(GET_COMPANY);
        console.log("reponse", response.data);
        
        setCompany(response.data);
        localStorage.setItem("company_id", response.data.company);
        localStorage.setItem("emp_id", response.data.id);
        
      } catch (error) {
        console.error("Failed to fetch company", error);
      }
    };
    fetchCompany();
  }, []);


  const mainTabs = [
    { name: "My Space", path: "myspace/overview/?tab=profile" },
    { name: "Organization", path: "/home/organization?tab=new-hires" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Main Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 gap-2 sm:gap-4 border-b pb-4">
          {mainTabs.map((tab, index) => (
            <NavLink
              key={index}
              to={`${tab.path}`.toLowerCase().replace(" ", "")}
              className={({ isActive }) =>
                `text-base sm:text-lg font-semibold pb-2 px-3 sm:px-4 py-1 sm:py-2 rounded-md ${
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 bg-gray-200"
                    : "text-gray-500 hover:text-blue-500 hover:bg-gray-100"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
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
