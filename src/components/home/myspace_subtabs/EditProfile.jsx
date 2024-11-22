import React, { useState } from "react";

const EditProfile = ({ profileData, onClose, onSubmit }) => {
  // Remove Emp_id and Role from formData
  const { Name, id, date_joined, user, Emp_id, Role, ...filteredData } = profileData;
  const [formData, setFormData] = useState(filteredData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass updated data back to the parent component
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 sm:mx-6 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamically render input fields except Emp_id and Role */}
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-gray-500 capitalize mb-1">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-gray-700"
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

export default EditProfile;
