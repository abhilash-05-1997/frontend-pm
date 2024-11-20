import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const LeaveBalance = () => {
  const [leaveBalance, setLeaveBalance] = useState([]);
  const GET_EMPLOYEE_LEAVE_BALANCE = 'api/employee/leave-balance/'

  // const leaves = [
  //   { type: "Leave Without Pay", available: 0, booked: 0, icon: "🌞" },
  //   { type: "Personal Leave", available: 2.5, booked: 9.5, icon: "🌴" },
  //   { type: "Sick Leave", available: 2, booked: 1, icon: "🤒" },
  //   { type: "Work From Home", available: 11, booked: 10, icon: "🏠" },
  // ];

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return;
        }
        const response = await apiService.fetchInstance(
          GET_EMPLOYEE_LEAVE_BALANCE
        );
        console.log(response.data);
        setLeaveBalance(response.data);
      } catch (error) {
        toast.error("Something went wrong..");
      }
    };

    fetchLeaveBalance();
  },
  
  []);

  return (
    <div className="grid grid-rows-1 sm:grid-rows-1 lg:grid-rows-1 gap-4 mb-8">
      {leaveBalance.map((leave, index) => (
        <div
          key={leave.leave_type}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{leave.icon}</span>
            <div
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                leave.total_taken
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {leave.total_taken ? "Booked" : "Available"}
            </div>
          </div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            {leave.leave_type}
          </h2>
          <div className="flex justify-between text-gray-500">
            <p>
              Available:{" "}
              <span className="font-semibold text-green-600">
                {leave.remaining_balance}
              </span>
            </p>
            <p>
              Booked:{" "}
              <span className="font-semibold text-red-600">{leave.total_taken}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveBalance;
