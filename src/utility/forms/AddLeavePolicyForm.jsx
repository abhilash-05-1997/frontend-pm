import React, { useState } from "react";
import InputField from "../InputField"; // Assuming you have an InputField component

const AddLeavePolicyForm = ({ leaveTypes, initialData, onSave, onClose }) => {
  // console.log("form", initialData);

  const [formData, setFormData] = useState({
    id: initialData?.id,
    leavename: initialData?.leave_type?.leavename || "",
    description: initialData?.leave_type?.leave_description || "",
    max_days: initialData?.max_days || "",
    carry_forward_type: initialData?.carry_forward_type || "monthly",
    leave_type: initialData?.leave_type?.id,
    carry_forward: initialData?.carry_forward || false,
    carry_forward_days: initialData?.carry_forward_days || 0, // Default to 0
    company: initialData?.leave_type?.company || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "carry_forward" && !checked) {
      // When carry_forward is unchecked, reset carry_forward_days to 0
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
        carry_forward_days: 0,
      }));
    } else if (name === "carry_forward_days") {
      // Allow "0" to be entered, but don't display leading zeros
      const numericValue = value.replace(/^0+(?=\d)/, "") || ""; // Allow empty field
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg sm:max-w-lg lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-8">
          Add Leave Types
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Leave Name"
              type="text"
              id="leavename"
              name="leavename"
              value={formData.leavename}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={!!formData.id}
            />

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
                className="block mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <InputField
              label="Max Days"
              type="number"
              id="max_days"
              name="max_days"
              value={Number(formData.max_days)}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="col-span-1 sm:col-span-2 flex items-center">
              <input
                type="checkbox"
                name="carry_forward"
                id="carry_forward"
                checked={formData.carry_forward}
                onChange={handleChange}
                className="mr-2"
              />
              <label
                htmlFor="carry_forward"
                className="text-sm font-medium text-gray-700"
              >
                Carry Forward
              </label>
            </div>

            {formData.carry_forward && (
              <InputField
                label="Carry Forward Days"
                type="number"
                id="carry_forward_days"
                name="carry_forward_days"
                value={
                  formData.carry_forward ? formData.carry_forward_days : "" // Empty field when unchecked
                }
                onChange={handleChange}
                placeholder="Enter days to carry forward"
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          <InputField
            label="Description"
            type="textarea"
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="col-span-1 sm:col-span-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
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
              onClick={onClose}
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

export default AddLeavePolicyForm;
