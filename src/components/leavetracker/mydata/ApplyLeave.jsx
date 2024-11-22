import React, { useEffect, useState } from "react";
import InputField from "../../../utility/InputField";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const ApplyLeave = ({ isOpen, onClose }) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDays, setLeaveDays] = useState([]);
  const [managerId, setManagerId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [reason, setReason] = useState("");

  const GET_LEAVE_TYPES = "api/leave-types/";
  const GET_EMPLOYEE = "api/employees/me/";
  const GET_USER = "accounts/users/";
  const CREATE_LEAVE_REQUEST = "api/leave-requests/apply/";

  const fetchLeaveTypes = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to apply leave");
      return;
    }

    try {
      const response = await apiService.fetchAllInstances(GET_LEAVE_TYPES);
      setLeaveTypes(response.data);
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  const fetchEmployeeData = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to apply leave");
      return;
    }

    try {
      const response = await apiService.fetchInstance(GET_EMPLOYEE);
      const { id, user } = response.data;
      setEmployeeId(id);

      const managerResponse = await apiService.fetchInstance(
        `${GET_USER}${user}/`
      );
      const { reporting_manager } = managerResponse.data;

      if (reporting_manager) {
        setManagerId(reporting_manager);
      } else {
        toast.error("You are not assigned to any manager...");
        onClose();
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    fetchLeaveTypes();
    fetchEmployeeData();
  }, [isOpen]);

  const handleDateChange = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const tempDays = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      tempDays.push({
        date: d.toISOString().split("T")[0],
        leave_day_type: isWeekend ? "Weekend" : "Full day",
        half_day: null,
        isWeekend,
      });
    }

    setLeaveDays(tempDays);
  };

  useEffect(() => {
    handleDateChange();
  }, [startDate, endDate]);

  const updateLeaveDayType = (index, type, half) => {
    const updatedDays = [...leaveDays];
    updatedDays[index] = {
      ...updatedDays[index],
      leave_day_type: type,
      half_day: type === "Half day" ? half : null,
    };
    setLeaveDays(updatedDays);
  };

  const payload = {
    employee: employeeId,
    leave_type: leaveType,
    leave_days: leaveDays,
    reporting_manager: managerId,
    reason_for_leave: reason,
    status: "Pending",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!managerId) {
      toast.error("Something went wrong...");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("Please login again");
        onClose();
        return;
      }
      const response = await apiService.createInstance(
        CREATE_LEAVE_REQUEST,
        payload
      );
      if (response.status === 201) {
        toast.success("Leave request created successfully");
      } else {
        toast.error("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request");
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-8">
          Apply Leave
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Leave Type Dropdown */}
            <div className="col-span-1 sm:col-span-2">
              <label
                htmlFor="leaveType"
                className="block text-sm font-medium text-gray-700"
              >
                Leave Type
              </label>
              <select
                id="leaveType"
                name="leaveType"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select leave type
                </option>
                {leaveTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.leavename}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Fields */}
            <InputField
              label="Start Date"
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <InputField
              label="End Date"
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {/* Dynamic Leave Days */}
          <div>
            <h3 className="text-lg font-medium">Leave Days</h3>
            {leaveDays.map((day, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <span>{day.date}</span>
                {day.isWeekend ? (
                  <span className="text-gray-500 italic">Weekend</span>
                ) : (
                  <>
                    <select
                      value={day.leave_day_type}
                      onChange={(e) =>
                        updateLeaveDayType(
                          index,
                          e.target.value,
                          e.target.value === "Half day" ? "First half" : null
                        )
                      }
                      className="p-2 border rounded"
                    >
                      <option value="Full day">Full day</option>
                      <option value="Half day">Half day</option>
                    </select>
                    {day.leave_day_type === "Half day" && (
                      <select
                        value={day.half_day || "First half"}
                        onChange={(e) =>
                          updateLeaveDayType(index, "Half day", e.target.value)
                        }
                        className="p-2 border rounded"
                      >
                        <option value="First half">First half</option>
                        <option value="Second half">Second half</option>
                      </select>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <InputField
            label="Reason for Leave"
            type="textarea"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason for leave..."
            rows="4"
            required
          />

          {/* Buttons */}
          <div className="flex justify-between items-center space-x-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 text-blue-600 bg-white border border-blue-600 rounded-lg shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeave;
