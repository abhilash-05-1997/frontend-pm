import React, { useEffect, useState } from "react";
import ApplyLeave from "./ApplyLeave";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";

const LeaveSummary = () => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveSummary, setLeaveSummary] = useState([]);
  const [leaveStatistics, setLeaveStatistics] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [managerId, setManagerId] = useState(null);


  // API Endpoints
  const GET_EMPLOYEE_LEAVE_BALANCE = "api/employee/leave-balance/";
  const GET_EMPLOYEE_LEAVE_STATISTICS = "api/quarterly-leaves/";
  const GET_LEAVE_TYPES = "api/leave-types/";
  const GET_EMPLOYEE = "api/employees/me/";
  const GET_USER = "accounts/users/";
  const GET_HOLIDAYS = "api/holidays/";
  const CREATE_LEAVE_REQUEST = "api/leave-requests/apply/";

  // Utility Functions
  const currentYear = new Date().getFullYear();

  const getYears = (startYear = 2019) =>
    Array.from(
      { length: new Date().getFullYear() - startYear + 1 },
      (_, i) => startYear + i
    ).reverse();

  const getCurrentQuarter = () => {
    const month = new Date().getMonth() + 1;
    if (month <= 3) return "Quarter-1";
    if (month <= 6) return "Quarter-2";
    if (month <= 9) return "Quarter-3";
    return "Quarter-4";
  };

  const fetchLeaveBalance = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      const response = await apiService.fetchInstance(
        GET_EMPLOYEE_LEAVE_BALANCE
      );
      setLeaveSummary(response.data);
    } catch (error) {
      console.error("Error fetching leave balance.", error);
    }
  };

  const fetchLeaveStatistics = async (year) => {
    try {
      const token = localStorage.getItem("accessToken");
      const empID = localStorage.getItem("emp_id");
      if (!token || !empID) return;
      const response = await apiService.fetchInstance(
        `${GET_EMPLOYEE_LEAVE_STATISTICS}${empID}/?year=${year}`
      );
      setLeaveStatistics(response.data || []);
    } catch (error) {
      console.error("Error fetching leave statistics.");
    }
  };


  const fetchLeaveTypes = async () => {
    try {
      const response = await apiService.fetchAllInstances(GET_LEAVE_TYPES);
      setLeaveTypes(response.data);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await apiService.fetchAllInstances(GET_HOLIDAYS);
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const fetchEmployeeData = async () => {
    try {
      const response = await apiService.fetchInstance(GET_EMPLOYEE);
      const { id, user } = response.data;
      setEmployeeId(id);

      const managerResponse = await apiService.fetchInstance(`${GET_USER}${user}/`);
      const { reporting_manager } = managerResponse.data;

      if (reporting_manager) {
        setManagerId(reporting_manager);
      } else {
        toast.error("You are not assigned to any manager.");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };


  // Handlers
  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    fetchLeaveStatistics(year);
  };

  const handleApplyLeave = () => setIsModalOpen(true);
  const handleCloseApplyLeave = () => setIsModalOpen(false);

  const handleCardClick = (leave) => setSelectedLeave(leave);
  const handleCloseDetails = () => setSelectedLeave(null);


  useEffect(() => {
    fetchLeaveBalance();
    fetchLeaveStatistics(selectedYear);
    fetchLeaveTypes();
    fetchHolidays();
    fetchEmployeeData();
  }, [selectedYear]);

  // Effects
  // useEffect(() => {
  //   fetchLeaveBalance();
  //   fetchLeaveStatistics(selectedYear);
  // }, [selectedYear]);


  const handleSubmitLeaveRequest = async (leaveData) => {
    try {
      const payload = {
        employee: employeeId,
        leave_type: leaveData.leaveType,
        leave_days: leaveData.leaveDays,
        reporting_manager: managerId,
        reason_for_leave: leaveData.reason,
        status: "Pending",
      };

      const response = await apiService.createInstance(CREATE_LEAVE_REQUEST, payload);
      toast.success("Leave request submitted successfully.");
      handleCloseApplyLeave();
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request.");
    }
    fetchLeaveBalance();
    fetchLeaveStatistics();
  };


  // Constants
  const years = getYears();
  const currentQuarter = getCurrentQuarter();

  // Components
  const YearDropdown = () => (
    <div className="mb-4">
      <label
        htmlFor="year-select"
        className="text-lg font-medium text-gray-700 dark:text-dark-text"
      >
        Select Year:
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );

  const LeaveCard = ({ leave }) => (
    <div
      onClick={() => handleCardClick(leave)}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer dark:bg-dark-info-cards dark:border-none"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center dark:text-dark-text">
        {leave.leave_type}
      </h2>
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold text-green-400 mb-1">
          {leave.remaining_balance}
        </p>
        <p className="text-gray-600 text-lg mb-4 dark:text-dark-text">Available</p>
        <p className="text-gray-600 text-sm dark:text-dark-text">
          <span className="font-semibold text-red-600">
            {leave.total_taken}
          </span>{" "}
          Booked
        </p>
      </div>
    </div>
  );

  const StatisticsCard = ({ quarter }) => (
    <div
      onClick={() => handleCardClick(quarter)}
      className="bg-white p-6 rounded-xl shadow-md border dark:border-none border-gray-200 hover:shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer dark:bg-dark-info-cards"
    >
      <h3 className="text-lg font-bold text-gray-800 dark:text-dark-text">
        {quarter.leave_type}
      </h3>

      
        <p className="text-gray-600 dark:text-dark-text">
          Total Taken:{" "}
          <span className="text-yellow-400 font-bold">
            {quarter.total_booked_days}
          </span>
        </p>
        <p className="text-gray-600 dark:text-dark-text">
          Remaining in Year:{" "}
          <span className="text-green-400 font-bold">
            {quarter.remaining_leave_days}
          </span>
        </p>
      <p className="text-blue-600 text-sm">(Click here for Detail View)</p>
    </div>
  );

  const DetailViewModal = () =>
    selectedLeave && (
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
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-dark-bg">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-gray-700 dark:text-dark-text">
          Current {currentQuarter} Leave Summary in {currentYear}
        </h3>
        <button
          onClick={handleApplyLeave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 dark:bg-dark-add-button dark:text-dark-button-text"
        >
          Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {leaveSummary.map((leave, index) => (
          <LeaveCard key={index} leave={leave} />
        ))}
      </div>
      <YearDropdown />

      <h1 className="text-3xl font-bold text-gray-700 pb-6 dark:text-dark-text">
        Overall Leave Summary for {selectedYear}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaveStatistics.map((quarter, index) => (
          <StatisticsCard key={index} quarter={quarter} />
        ))}
      </div>

      <DetailViewModal />
      <ApplyLeave
        isOpen={isModalOpen}
        onClose={handleCloseApplyLeave}
        leaveTypes={leaveTypes}
        holidays={holidays}
        employeeId={employeeId}
        managerId={managerId}
        onSubmitLeaveRequest={handleSubmitLeaveRequest}
      />
    </div>
  );
};

export default LeaveSummary;
