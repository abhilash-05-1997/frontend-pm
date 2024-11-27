import React, { useState, useEffect } from 'react';
import apiService from "../../../api/apiService"; // Ensure this is the correct path to your API service
import { FaRegSadTear } from "react-icons/fa"; // Optional: Add an icon for no members on leave

const OnLeave = () => {
  const [onLeaveReportees, setOnLeaveReportees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchOnLeaveReportees();
  }, []);

  const fetchOnLeaveReportees = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await apiService.fetchInstance("api/reportees/leave-balances/");
      console.log("response ", response);

      // Filter reportees who are on leave today
      const onLeave = response.data.filter((reportee) => reportee.on_leave_today);

      setOnLeaveReportees(onLeave);
    } catch (error) {
      console.error("Error fetching reportees:", error);
      setHasError(true);
      alert("Failed to fetch reportees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-black-300">
        Reportees On Leave Today
      </h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center text-lg text-gray-500">
          <div className="loader">Loading...</div> {/* You can use a CSS spinner here */}
        </div>
      ) : hasError ? (
        <div className="text-center text-red-600">
          Something went wrong. Please try again later.
        </div>
      ) : onLeaveReportees.length > 0 ? (
        onLeaveReportees.map((reportee, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl mb-6"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 flex items-center justify-between">
              <span>
                {reportee.reportee_first_name} {reportee.reportee_last_name}
              </span>
              <span className="text-red-600 font-semibold">On Leave</span>
            </h3>
            <div className="text-sm text-gray-600">
              {/* Display any additional information if available */}
              {reportee.leave_types && reportee.leave_types.length > 0 ? (
                <ul className="list-disc pl-4">
                  {reportee.leave_types.map((leave, leaveIndex) => (
                    <li key={leaveIndex} className="mb-2">
                      <span className="font-bold">{leave.leave_type}:</span> 
                      <span className="text-gray-800"> Total Taken - {leave.total_taken}, </span>
                      <span className="text-gray-800">Remaining - {leave.remaining_balance}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">
          <FaRegSadTear className="mx-auto mb-2 text-4xl text-gray-400" />
          There are no members on leave today.
        </div>
      )}
    </div>
  );
};

export default OnLeave;
