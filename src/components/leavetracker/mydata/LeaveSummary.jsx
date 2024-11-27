import React, { useEffect, useState } from "react";
import ApplyLeave from "./ApplyLeave";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";

const LeaveSummary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveSummary, setLeaveSummary] = useState([]);
  const [leaveStatistics, setLeaveStatistics] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const GET_EMPLOYEE_LEAVE_BALANCE = "api/employee/leave-balance/";
  const GET_EMPLOYEE_LEAVE_STATISTICS = "api/quarterly-leaves/";

  // Calculate the current quarter
  const getCurrentQuarter = () => {
    const month = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    if (month >= 1 && month <= 3) return "Quarter-1";
    if (month >= 4 && month <= 6) return "Quarter-2";
    if (month >= 7 && month <= 9) return "Quarter-3";
    if (month >= 10 && month <= 12) return "Quarter-4";
  };

  const currentQuarter = getCurrentQuarter();
  const year = new Date().getFullYear();

  useEffect(() => {
    fetchLeaveBalance();
    fetchLeaveStatistics();
  }, []);

  const fetchLeaveBalance = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const response = await apiService.fetchInstance(
        GET_EMPLOYEE_LEAVE_BALANCE
      );
      setLeaveSummary(response.data);
    } catch (error) {
      toast.error("Error fetching leave balance.");
    }
  };

  const fetchLeaveStatistics = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const empID = localStorage.getItem("emp_id");
      if (!token || !empID) return;
      const response = await apiService.fetchInstance(
        `${GET_EMPLOYEE_LEAVE_STATISTICS}${empID}/`
      );
      setLeaveStatistics(response.data || []);
    } catch (error) {
      toast.error("Error fetching leave statistics.");
    }
  };

  const handleApplyLeave = () => setIsModalOpen(true);
  const handleCloseApplyLeave = () => setIsModalOpen(false);

  const handleCardClick = (leave) => setSelectedLeave(leave);
  const handleCloseDetails = () => setSelectedLeave(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-700">
          Current {currentQuarter} Leave Summary in {year}
        </h1>
        <button
          onClick={handleApplyLeave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Apply Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {leaveSummary.map((leave, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(leave)}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              {leave.leave_type}
            </h2>
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-green-600 mb-1">
                {leave.remaining_balance}
              </p>
              <p className="text-gray-600 text-lg mb-4">Available</p>{" "}
              {/* Mentioning "Available" */}
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-red-600">
                  {leave.total_taken}
                </span>{" "}
                Booked
              </p>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-700 pb-6">
        Overall Leave Summary for {year}
      </h1>
      {/* Quarterly Leave Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaveStatistics.map((quarter, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(quarter)}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            <h3 className="text-lg font-bold text-gray-800">
              {quarter.leave_type}
            </h3>
            <p className="text-gray-600">
              Total Taken:{" "}
              <span className="text-yellow-500 font-bold">
                {quarter.total_booked_days}
              </span>
            </p>
            <p className="text-gray-600">
              Remaining in Year:{" "}
              <span className="text-green-600 font-bold">
                {quarter.remaining_leave_days}
              </span>
            </p>
            <p className="text-blue-600 text-sm">
              (Click here for Detail View)
            </p>
          </div>
        ))}
      </div>

      {/* Detailed View Modal */}
      {selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-2xl relative">
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {selectedLeave.leave_type || "Quarterly Leave Details"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selectedLeave.quarterly_booked_leaves &&
                ["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                  <div
                    key={i}
                    className="bg-blue-100 rounded-lg p-4 text-center shadow-md"
                  >
                    <h3 className="text-lg font-bold text-blue-600">{q}</h3>
                    <p className="text-4xl font-extrabold text-gray-900">
                      {selectedLeave.quarterly_booked_leaves[q]}
                    </p>
                    <p className="text-sm text-gray-600">Leaves Taken</p>
                  </div>
                ))}
            </div>
            <div className="mt-6 text-gray-700">
              <p>
                Total Taken:{" "}
                <span className="font-bold text-yellow-500">
                  {selectedLeave.total_booked_days}
                </span>
              </p>
              <p>
                Remaining in Year:{" "}
                <span className="font-bold text-green-600">
                  {selectedLeave.remaining_leave_days}
                </span>
              </p>
              <p>
                Maximum in Year:{" "}
                <span className="font-bold text-black">
                  {selectedLeave.max_leave_days}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      <ApplyLeave isOpen={isModalOpen} onClose={handleCloseApplyLeave} />
    </div>
    
  );
};

export default LeaveSummary;
