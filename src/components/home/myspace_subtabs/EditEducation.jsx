import React, { useState } from "react";

const EditEducation = ({ educationData, onClose, onSubmit }) => {
  const { id, employee, ...filteredData } = educationData;
  const [formData, setFormData] = useState(filteredData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Education</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Education Type */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Education Type</label>
            <select
              name="education_type"
              value={formData.education_type || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="10th class">10th Class</option>
              <option value="12th class">12th Class</option>
              <option value="b.tech">Bachelor's</option>
              <option value="m.tech">Master's</option>
              {/* <option value="PhD">PhD</option> */}
            </select>
          </div>

          {/* College Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">College Name</label>
            <input
              type="text"
              name="college_name"
              value={formData.college_name || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* College Location */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">College Location</label>
            <input
              type="text"
              name="college_location"
              value={formData.college_location || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Start Year */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Start Year</label>
            <input
              type="date"
              name="start_year"
              value={formData.start_year || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* End Year */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">End Year</label>
            <input
              type="date"
              name="end_year"
              value={formData.end_year || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEducation;
