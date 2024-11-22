import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MySpace from "./tabs/MySpace";
import Organization from "./tabs/Organization";

const Home = () => {
  // Main tabs (MySpace and Organization)
  const mainTabs = [
    { name: "My Space", path: "/myspace" },
    { name: "Organization", path: "/organization?tab=announcements" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Tabs */}
        <div className="flex space-x-4 border-b pb-4 gap-4">
          {mainTabs.map((tab, index) => (
            <NavLink
              key={index}
              to={`${tab.name}`.toLowerCase().replace(" ", "")}
              className={({ isActive }) =>
                `text-lg font-semibold pb-2 px-4 py-2 ${
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 bg-gray-200"
                    : "text-gray-500 hover:text-blue-500"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>

        {/* Dynamic Routing 0for Content */}
        <Routes>
          <Route path="/myspace" element={<MySpace />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
