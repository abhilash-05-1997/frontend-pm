import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import cronLabsLogo from "../../../../src/assets/cron-labs-logo.jpeg";
import {
  FaCalendarCheck,
  FaHome,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import clsx from "clsx";

const PROFILE_DROPDOWN = [];
const SIDEBAR_LINKS = ["Home", "LeaveTracker"];

const ProfileDropdown = ({ isDropdownOpen, toggleDropdown, dropdownRef }) => (
  <div className="flex items-center ms-3 relative">
    <button
      type="button"
      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      aria-expanded={isDropdownOpen}
      onClick={toggleDropdown}
    >
      <span className="sr-only">Open user menu</span>
      <img
        className="w-8 h-8 rounded-full"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="user"
      ></img>
    </button>
    {isDropdownOpen && (
      <div
        ref={dropdownRef}
        className="z-50 absolute right-0 mt-2 top-full w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 max-w-xs"
      >
        <div className="px-4 py-3">
          <p className="text-sm text-gray-900 dark:text-white"></p>
          <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
            
          </p>
        </div>
        <ul className="py-1">
          {PROFILE_DROPDOWN.map((item, index) => (
            <li key={index}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ICONS = {
  Home: <FaHome className="w-5 h-5" />,
  LeaveTracker: <FaCalendarCheck className="w-5 h-5" />,
  Logout: <FaSignOutAlt className="w-5 h-5" />,
};

const SidebarLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <ul className="space-y-2 font-medium">
      {SIDEBAR_LINKS.map((item, index) => (
        <li key={index}>
          <NavLink
            to={
              item === "Home"
                ? "home/myspace/overview/?tab=profile"
                : item === "LeaveTracker"
                ? "leavetracker/mydata/leave-summary"
                : `/${item.toLowerCase()}/`
            }
            className={clsx(
              "flex items-center p-2 rounded-lg",
              location.pathname.includes(item.toLowerCase())
                ? "bg-blue-400 text-black dark:bg-dark-card dark:text-dark-text"
                : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            )}
          >
            {ICONS[item]}
            <span className="ml-3">{item}</span>
          </NavLink>
        </li>
      ))}
      <li>
        <button
          onClick={handleLogout}
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {ICONS["Logout"]}
          <span className="ml-3">Logout</span>
        </button>
      </li>
    </ul>
  );
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    []
  );
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const toggleDropdown = useCallback((e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  }, []);
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target))
        closeSidebar();
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false);
    };
    if (isSidebarOpen || isDropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, isDropdownOpen, closeSidebar]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDarkMode(savedTheme === "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b dark:bg-dark-bg dark:border-gray-700">
          <div className="flex items-center justify-between px-3 py-3 lg:px-5">
          <button
            onClick={toggleSidebar}
            type="button"
            className="p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>
          <NavLink to="/" className="flex items-center">
            <img src={cronLabsLogo} className="h-8 mr-3" alt="Cron Labs Logo" />
            <span className="text-xl font-semibold sm:text-2xl dark:text-white">
              Cron Labs
            </span>
          </NavLink>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </button>
            <ProfileDropdown
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              dropdownRef={dropdownRef}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r dark:bg-dark-bg dark:border-gray-700 
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
          }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <SidebarLinks />
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 pt-14 sm:pl-64 transition-all duration-300 w-full dark:bg-dark-bg ${
          isSidebarOpen ? "opacity-50 sm:opacity-100" : ""
        }`}
        onClick={isSidebarOpen ? closeSidebar : null}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
