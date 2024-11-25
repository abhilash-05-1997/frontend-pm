import React, { useState } from "react";

const AddLeavePolicyForm = ({ leaveTypes, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    max_days: "",
    carry_forward_type: "monthly", // Default value for carry forward type
    leave_type: "", // Leave type ID will be stored here
    carry_forward: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onSave(formData); // Pass the form data with the leave type ID back to the parent
    onClose(); // Close the form
  };

  return (
    <form
      className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-6">Add Leave Policy</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Max Days */}
        <div>
          <label
            htmlFor="maxDays"
            className="block text-sm font-medium text-gray-700"
          >
            Max Days
          </label>
          <input
            type="number"
            id="maxDays"
            name="max_days"
            value={formData.max_days}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Carry Forward Type */}
        <div>
          <label
            htmlFor="carryForwardType"
            className="block text-sm font-medium text-gray-700"
          >
            Carry Forward Type
          </label>
          <select
            id="carryForwardType"
            name="carry_forward_type"
            value={formData.carry_forward_type}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
        </div>

        {/* Leave Type Dropdown */}
        <div>
          <label
            htmlFor="leaveType"
            className="block text-sm font-medium text-gray-700"
          >
            Leave Type
          </label>
          <select
            id="leaveType"
            name="leave_type"
            value={formData.leave_type}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.leavename}
              </option>
            ))}
          </select>
        </div>

        {/* Carry Forward Checkbox */}
        <div className="col-span-full">
          <label
            htmlFor="carryForward"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <input
              type="checkbox"
              id="carryForward"
              name="carry_forward"
              checked={formData.carry_forward}
              onChange={handleChange}
              className="mr-2"
            />
            Carry Forward
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          type="button"
          onClick={onClose} // Close the form without saving
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Policy
        </button>
      </div>
    </form>
  );
};

export default AddLeavePolicyForm;
