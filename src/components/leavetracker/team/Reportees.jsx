import React, { useState, useEffect } from "react";
import apiService from "../../../api/apiService";
import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa";

const Reportees = () => {
  const [reporteesData, setReporteesData] = useState({});

  useEffect(() => {
    fetchReporteesData();
  }, []);

  const fetchReporteesData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        // alert("You are not logged in.");

        return;
      }

      const response = await apiService.fetchInstance(
        "api/reportees/leave-balances/"
      );
      // console.log("response ", response);

      // Grouping the data by reportee name
      const groupedData = response.data.reduce((acc, current) => {
        const {
          reportee_first_name,
          reportee_last_name,
          leave_type,
          total_taken,
          remaining_balance,
          on_leave_today,
        } = current;
        const reportee = `${reportee_first_name} ${reportee_last_name}`;

        // Initialize reportee data if not already present
        if (!acc[reportee]) {
          acc[reportee] = {
            leave_details: [], // Ensure leave_details is always initialized as an empty array
            on_leave_today: false, // Track if on leave today
          };
        }

        // Add leave type details for the reportee
        acc[reportee].leave_details.push({
          leave_type,
          total_taken,
          remaining_balance,
        });

        // Check if the reportee is on leave today
        if (on_leave_today) {
          acc[reportee].on_leave_today = true;
        }

        return acc;
      }, {});

      setReporteesData(groupedData);
    } catch (error) {
      console.error("Error fetching reportees:", error);
      // alert("Failed to fetch reportees. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-8 sm:p-10 lg:p-12 mt-8 dark:bg-dark-bg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black-300 dark:text-dark-text">
        Reportees Leave Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {Object.keys(reporteesData).map((reportee, index) => (
          <div
            key={index}
            className="bg-gradient-to-r dark:bg-dark-info-cards border-gray-200 p-6 rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <FaRegUser className="text-3xl text-indigo-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-dark-text">
                {reportee}
                <span
                  className={`ml-2 text-sm font-semibold ${
                    reporteesData[reportee].on_leave_today
                      ? "text-red-500"
                      : "text-green-400"
                  }`}
                >
                  {reporteesData[reportee].on_leave_today
                    ? "On Leave"
                    : "Available"}
                </span>
              </h3>
            </div>
            <div className="space-y-4">
              {/* <ul className="list-none space-y-2 text-gray-700">
                {(reporteesData[reportee].leave_details || []).map(
                  (leave, leaveIndex) => (
                    <li
                      key={leaveIndex}
                      className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm hover:bg-indigo-50 transition-colors dark:bg-dark-info-cards dark:border-0-gray"
                    >
                      <span className="font-bold dark:text-dark-text">{leave.leave_type}:</span>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-600 dark:text-dark-text">Total Taken</span>
                        <span className="font-semibold text-gray-800 dark:text-dark-text">{leave.total_taken}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-600 dark:text-dark-text">Available</span>
                        <span className="font-semibold text-gray-800 dark:text-dark-text">{leave.remaining_balance}</span>
                      </div>
                    </li>
                  )
                )}
              </ul> */}
              <ul className="list-none space-y-2 text-gray-700">
                {(reporteesData[reportee].leave_details || []).map(
                  (leave, leaveIndex) => (
                    <li
                      key={leaveIndex}
                      className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm hover:bg-indigo-50 transition-colors dark:bg-dark-info-cards dark:border-0-gray"
                    >
                      <span className="font-bold dark:text-dark-text">
                        {leave.leave_type}:
                      </span>
                      <div className="flex space-x-8 items-center">
                        <div className="text-center">
                          <span className="text-sm text-gray-600 dark:text-dark-text">
                            Total Taken
                          </span>
                          <div className="font-semibold text-gray-800 dark:text-dark-text">
                            {leave.total_taken}
                          </div>
                        </div>
                        <div className="text-center">
                          <span className="text-sm text-gray-600 dark:text-dark-text">
                            Available
                          </span>
                          <div className="font-semibold text-gray-800 dark:text-dark-text">
                            {leave.remaining_balance}
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mt-4">
              <FaRegCalendarCheck
                className={`text-2xl ${
                  reporteesData[reportee].on_leave_today
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportees;
