import React, { useState } from "react";

const EditProfile = ({ profileData, onClose, onSubmit }) => {
  const { id, date_joined, user, Emp_id, Role, ...filteredData } = profileData;
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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Father's Name</label>
            <input
              type="text"
              name="FatherName"
              value={formData.FatherName || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Mother's Name</label>
            <input
              type="text"
              name="MotherName"
              value={formData.MotherName || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Mobile Number</label>
            <input
              type="text"
              name="PersonalMobileNumber"
              value={formData.PersonalMobileNumber || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded text-gray-700">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
