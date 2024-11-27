import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const LeaveBalance = () => {
  const [leaveBalance, setLeaveBalance] = useState([]);
  const GET_EMPLOYEE_LEAVE_BALANCE = 'api/employee/leave-balance/';

  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return;
        }
        const response = await apiService.fetchInstance(GET_EMPLOYEE_LEAVE_BALANCE);
        setLeaveBalance(response.data);
      } catch (error) {
        toast.error("Something went wrong..");
      }
    };

    fetchLeaveBalance();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {leaveBalance.map((leave, index) => (
        <div
          key={leave.leave_type}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl">{leave.icon}</span>
            <div
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                leave.total_taken
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {leave.total_taken ? "Booked" : "Available"}
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-3">{leave.leave_type}</h2>
          <div className="flex justify-between text-gray-600 text-sm">
            <p>
              Available:{" "}
              <span className="font-semibold text-green-600">
                {leave.remaining_balance}
              </span>
            </p>
            <p>
              Booked:{" "}
              <span className="font-semibold text-red-600">
                {leave.total_taken}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveBalance;
