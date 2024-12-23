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
import space_image from '../../../assets/space_image.jpg';

const Overview = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "activities"; // Default to "Activities"

  const OVERVIEW_TABS = [
    // { label: "Activities", key: "activities", component: <Activities_tab /> },
    { label: "Profile", key: "profile", component: <Profile_tab /> },
    // { label: "Approvals", key: "approvals", component: <Approvals_tab /> },
    // { label: "Feeds", key: "feeds", component: <Feeds_tab /> },
    // { label: "Leave", key: "leave", component: <Leave_tab /> },
    // { label: "Files", key: "files", component: <Files_tab /> },
    // { label: "Related Data", key: "related-data", component: <RelatedData_tab /> },
  ];

  const currentTab = OVERVIEW_TABS.find((t) => t.key === tab) || OVERVIEW_TABS[0];

  return (
    <div>
      {/* Navigation for subtabs */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-gray-600">
        {OVERVIEW_TABS.map((t) => (
          <NavLink
            key={t.key}
            to={`/home/myspace/overview/?tab=${t.key}`}
            className={clsx(
              "text-sm sm:text-base md:text-lg font-semibold px-3 py-2 rounded-xl",
              tab === t.key
                ? "text-blue-600 border-b-2 border-blue-500 bg-gray-200 dark:text-dark-text dark:bg-dark-subtabs"
                : "hover:text-blue-500 dark:text-dark-text"
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
    className="relative bg-cover bg-center h-36 sm:h-28 md:h-36 lg:h-40 xl:h-60 rounded-lg mb-6"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 rounded-lg">
      <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
        Welcome Back, {title}!!
      </h1>
    </div>
  </div>
);

const MySpace = () => {
  const location = useLocation();
  const GET_USER = "accounts/users/";
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token provided");
          return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        const response = await apiService.fetchInstance(`${GET_USER}${userId}/`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };
    fetchUserDetail();
  }, []);

  return (
    <div className=" min-h-screen w-full lg:max-h-fit md:h-full dark:bg-dark-bg">
      {/* Changed to mx-0 to prevent centering */}
      <div className="w-full mx-0 py-2 sm:w-full md:w-full dark:bg-dark-bg">
        {/* Main Tabs: Overview and Dashboard */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 border-b-[1.5px] dark:text-white border-gray-200 dark:bg-dark-bg">
          <NavLink
            to="/home/myspace/overview/"
            className={({ isActive }) =>
              clsx(
                "text-sm sm:text-base md:text-lg px-3 py-2 font-semibold rounded-xl",
                isActive
                  ? "bg-blue-100 text-blue-600 dark:text-dark-text dark:bg-dark-card"
                  : "hover:bg-blue-100 hover:text-blue-600 dark:text-white"
              )
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/home/myspace/dashboard"
            className={({ isActive }) =>
              clsx(
                "text-sm sm:text-base md:text-lg px-3 py-2 font-semibold rounded-xl",
                isActive
                  ? "bg-blue-100 text-blue-600 dark:text-dark-text dark:bg-dark-card"
                  : "hover:bg-blue-100 hover:text-blue-600 dark:text-white"
              )
            }
          >
            Dashboard
          </NavLink>
        </div>
  
        {location.pathname === "/home/myspace/overview/" && (
          <Header
            backgroundImage={space_image}
            title={`${user.first_name || "User "} ${user.last_name || ""}`}
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
