import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Activities_tab from "../myspace_subtabs/Activities_tab";
import Profile_tab from "../myspace_subtabs/Profile_tab";
import Approvals_tab from "../myspace_subtabs/Approvals_tab";
import Feeds_tab from "../myspace_subtabs/Feeds_tab";
import Leave_tab from "../myspace_subtabs/Leave_tab";
import Files_tab from "../myspace_subtabs/Files_tab";
import RelatedData_tab from "../myspace_subtabs/RelatedData_tab";
import Dashboard from "./Dashboard";
import clsx from "clsx";
import apiService from "../../../api/apiService";
import { jwtDecode } from "jwt-decode";
import space_image from '../../../assets/space_image.jpg'

const Overview = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "activities"; // Default to "Activities"

  const OVERVIEW_TABS = [
    { label: "Activities", key: "activities", component: <Activities_tab /> },
    { label: "Profile", key: "profile", component: <Profile_tab /> },
    { label: "Approvals", key: "approvals", component: <Approvals_tab /> },
    { label: "Feeds", key: "feeds", component: <Feeds_tab /> },
    { label: "Leave", key: "leave", component: <Leave_tab /> },
    { label: "Files", key: "files", component: <Files_tab /> },
    { label: "Related Data", key: "related-data", component: <RelatedData_tab /> },
  ];

  const currentTab = OVERVIEW_TABS.find((t) => t.key === tab) || OVERVIEW_TABS[0];

  return (
    <div>
      {/* Navigation for subtabs */}
      <div className="flex flex-wrap justify-center space-x-4 mb-4 text-gray-600">
        {OVERVIEW_TABS.map((t) => (
          <NavLink
            key={t.key}
            to={`/home/myspace/overview?tab=${t.key}`}
            className={clsx(
              "text-lg font-semibold px-4 py-2",
              tab === t.key
                ? "text-black border-b-2 border-blue-500"
                : "hover:text-blue-600"
            )}
          >
            {t.label}
          </NavLink>
        ))}
      </div>

      {/* Render the active tab's content */}
      <div className="tab-content">{currentTab.component}</div>
    </div>
  );
};

const Header = ({ backgroundImage, title }) => (
  <div
    className="relative bg-cover bg-center h-36 sm:h-24 md:h-36 lg:h-32 xl:h-60 rounded-lg mb-6"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 rounded-lg">
      <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-bold">Welcome Back, {title}!!</h1>
    </div>
  </div>
);

const MySpace = () => {
  const location = useLocation();
  const GET_USER = 'accounts/users/'
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if(!token){
          console.error("No token Provied");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        const response = await apiService.fetchInstance(`${GET_USER}${userId}/`);
        console.log("response", response);
        setUser(response.data)
      } catch (error) { 
        console.error("Failed to fetch user details", error);
      }
    }
    fetchUserDetail();
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Tabs: Overview and Dashboard */}
        <div className="flex flex-wrap space-x-4 mb-4 border-b-2 border-gray-200">
          <NavLink
            to="/home/myspace/overview"
            className={({ isActive }) =>
              clsx(
                "px-4 py-2 font-semibold",
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 bg-gray-200"
                  : "text-gray-500 hover:text-blue-600"
              )
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/home/myspace/dashboard"
            className={({ isActive }) =>
              clsx(
                "px-4 py-2 font-semibold",
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 bg-gray-200"
                  : "text-gray-500 hover:text-blue-600"
              )
            }
          >
            Dashboard
          </NavLink>
        </div>

        {location.pathname === "/home/myspace/overview" && (
          <Header
            backgroundImage={space_image}
            title={`${user.first_name} ${user.last_name}`}
          />
        )}

        {/* Routes */}
        <Routes>
          <Route path="/overview/" element={<Overview />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default MySpace;
