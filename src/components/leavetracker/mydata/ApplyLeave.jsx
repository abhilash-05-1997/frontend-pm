import React, { useEffect, useState } from "react";
import InputField from "../../../utility/InputField";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const ApplyLeave = ({ isOpen, onClose }) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveDayType, setLeaveDayType] = useState("Full day");
  const [halfDay, setHalfDay] = useState("First half");
  const [managerId, setManagerId] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [reason, setReason] = useState("");

  const GET_LEAVE_TYPES = "api/leave-types/";
  const GET_EMPLOYEE = "api/employees/me/";
  const GET_USER = "accounts/users/";
  const CREATE_LEAVE_REQUEST = "api/leave-requests/apply/";

  const fetchLeaveTypes = async (setLeaveTypes, onClose) => {
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

  const fetchEmployeeData = async (setEmployeeId, setManagerId, onClose) => {
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

    fetchLeaveTypes(setLeaveTypes, onClose);
    fetchEmployeeData(setEmployeeId, setManagerId, onClose);
  }, [isOpen, onClose, setLeaveTypes, setEmployeeId, setManagerId]);

  //   const [formData, setFormData] = useState({
  //     leaveType: "",
  //     startDate: "",
  //     endDate: "",
  //     reason: "",
  //     email: "", // Ensure email is included in the state
  //   });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  const payload = {
    employee: employeeId,
    leave_type: leaveType,
    start_date: startDate,
    end_date: endDate,
    leave_day_type: leaveDayType,
    half_day: leaveDayType === "Half day" ? halfDay : null,
    reporting_manager: managerId,
    reason_for_leave: reason,
    status: "Pending",
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(payload);
    

    if(!managerId){
        toast.error('Someting went wrong...')
        return;
    }

    if(new Date(startDate) > new Date(endDate)){
        toast.error('End date must be after start date')
        return;
    }
    try {
        const token = localStorage.getItem('accessToken');
        if(!token){
            toast.error('Please Login again');    
            onClose();
            return;
        }
        const response = await apiService.createInstance(CREATE_LEAVE_REQUEST, payload);
        if (response.status === 201) {
            toast.success('Leave request created successfully');
        }
        else{
            toast.error('Failed to Submit Leave Request..')
        }
    } catch (error) {
        console.error('Error Submitting Leave Requests', error);
        toast.error('Failed to Submit leave request')
        
    }

    // Add submission logic here
    onClose(); // Close modal after submission
  };

  const handleCancel = () => {
    // setFormData({
    //   leaveType: "",
    //   startDate: "",
    //   endDate: "",
    //   reason: "",
    //   email: "",
    // }); // Reset all fields
    onClose(); // Close modal on cancel
  };

  if (!isOpen) return null; // Do not render if not open

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
            {/* <InputField
              label="Team Email ID"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            /> */}
        <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="leave Day Type"
              className="block text-sm font-medium text-gray-700"
            >
              Leave Day Type
            </label>
            <select
              id="leaveDayType"
              name="leaveDayType"
              value={leaveDayType}
              onChange={(e) => setLeaveDayType(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Full day">Full day</option>
              <option value="Half day">Half day</option>
            </select>
        </div>
          </div>

          {leaveDayType === "Half day" && (
            <>
              <label
                htmlFor="leave Day Type"
                className="block text-sm font-medium text-gray-700"
              >
                Half day
              </label>
              <select value={halfDay} onChange={(e) => setHalfDay(e.target.value)}>
                <option value="First half">Morning</option>
                <option value="Second half">Afternoon</option>
              </select>
            </>
          )}

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
