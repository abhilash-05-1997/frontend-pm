import React, { useState, useEffect } from 'react';
import apiService from "../../../api/apiService"; // Ensure this is the correct path to your API service

const OnLeave = () => {
  const [onLeaveReportees, setOnLeaveReportees] = useState([]);

  useEffect(() => {
    fetchOnLeaveReportees();
  }, []);

  const fetchOnLeaveReportees = async () => {
    try {
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
      alert("Failed to fetch reportees. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
        Reportees On Leave Today
      </h2>
      {onLeaveReportees.length > 0 ? (
        onLeaveReportees.map((reportee, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
              {reportee.reportee_first_name} {reportee.reportee_last_name} - <span className="text-lg text-red-600">On Leave</span>
            </h3>
            <ul className="list-disc ml-4 text-gray-600">
              {/* Check if 'leave_types' exists before mapping */}
              {reportee.leave_types && reportee.leave_types.length > 0 ? (
                reportee.leave_types.map((leave, leaveIndex) => (
                  <li key={leaveIndex} className="mb-2">
                    <span className="font-bold">{leave.leave_type}:</span> Total Taken - <span className="font-semibold">{leave.total_taken}</span>, Remaining - <span className="font-semibold">{leave.remaining_balance}</span>
                  </li>
                ))
              ) : (
                <li>No leave data available</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">There are no members on leave today.</div>
      )}
    </div>
  );
};

export default OnLeave;
