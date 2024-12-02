import React, { useEffect, useState } from "react";
import InputField from "../../../utility/InputField";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const ApplyLeave = ({ isOpen, onClose, leaveTypes, holidays, employeeId, managerId, onSubmitLeaveRequest }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDays, setLeaveDays] = useState([]);
  const [reason, setReason] = useState("");

  

  const handleDateChange = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const tempDays = [];

    // Fetch holidays dates as a Set for quick lookup
    const holidayDates = new Set(holidays.map((holiday) => holiday.holiday_date));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isHoliday = holidayDates.has(d.toISOString().split("T")[0]);

      tempDays.push({
        date: d.toISOString().split("T")[0],
        leave_day_type: isWeekend ? "Weekend" : isHoliday ? "Holiday" : "Full day",
        half_day: null,
        isWeekend,
        isHoliday,
      });
    }

    setLeaveDays(tempDays);
  };

  useEffect(() => {
    handleDateChange();
  }, [startDate, endDate]);

  const updateLeaveDayType = (index, type, half) => {
    const leaveDayType =
      type === "Half day" && half ? `Half day (${half})` : type;

    setLeaveDays((prevLeaveDays) =>
      prevLeaveDays.map((day, i) =>
        i === index ? { ...day, leave_day_type: leaveDayType } : day
      )
    );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!leaveType || !reason || leaveDays.length === 0) {
  //     toast.error("Please complete all fields before submitting.");
  //     return;
  //   }

  //   if (new Date(startDate) > new Date(endDate)) {
  //     toast.error("End date must be after start date.");
  //     return;
  //   }

  //   const validDays = leaveDays.filter(
  //     (day) => !day.isWeekend && !day.isHoliday && day.leave_day_type !== "Weekend"
  //   );

  //   if (validDays.length === 0) {
  //     toast.error("Leave days cannot only be weekends or holidays.");
  //     return;
  //   }

  //   const payload = {
  //     employee: employeeId,
  //     leave_type: leaveType,
  //     leave_days: leaveDays,
  //     reporting_manager: managerId,
  //     reason_for_leave: reason,
  //     status: "Pending",
  //   };
  //   console.log(payload);

  //   try {
  //     const response = await apiService.createInstance(CREATE_LEAVE_REQUEST, payload);
  //     if (response.status === 201) {
  //       toast.success("Leave request created successfully.");
  //     } else {
  //       toast.error("Failed to submit leave request.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting leave request:", error);
  //     toast.error("Failed to submit leave request.");
  //   }

  //   onClose();
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !reason || leaveDays.length === 0) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("End date must be after start date.");
      return;
    }

    const validDays = leaveDays.filter(
      (day) => !day.isWeekend && !day.isHoliday && day.leave_day_type !== "Weekend"
    );

    if (validDays.length === 0) {
      toast.error("Leave days cannot only be weekends or holidays.");
      return;
    }

    const leaveData = {
      leaveType,
      leaveDays: validDays,
      reason,
    };

    onSubmitLeaveRequest(leaveData);
  };



  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto dark:bg-dark-bg">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-8">
          Apply Leave
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          <div>
            <h3 className="text-lg font-medium">Leave Days</h3>
            {leaveDays.map((day, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <span>{day.date}</span>
                {day.isWeekend ? (
                  <span className="text-gray-500 italic">Weekend</span>
                ) : day.isHoliday ? (
                  <span className="text-gray-500 italic">Holiday</span>
                ) : (
                  <>
                    <select
                      value={day.leave_day_type}
                      onChange={(e) =>
                        updateLeaveDayType(
                          index,
                          e.target.value,
                          day.isWeekend || day.isHoliday ? null : "1st half"
                        )
                      }
                      className="p-2 border rounded"
                    >
                      <option value="Full day">Full day</option>
                      <option value="Half day (1st half)">Half day (1st half)</option>
                      <option value="Half day (2nd half)">Half day (2nd half)</option>
                    </select>
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

          <div className="flex justify-between items-center space-x-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 text-gray-600 bg-gray-200 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
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
