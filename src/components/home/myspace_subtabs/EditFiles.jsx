import React, { useState } from "react";
import axios from "axios";

const EditFiles = ({ onClose }) => {
  const [adhaarFile, setAdhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  const handleAdhaarChange = (e) => {
    setAdhaarFile(e.target.files[0]);
  };

  const handlePanChange = (e) => {
    setPanFile(e.target.files[0]);
  };

  const handleSubmit = async (file, documentType) => {
    const empId = localStorage.getItem("emp_id"); // Retrieve emp_id from local storage
    const accessToken = localStorage.getItem("accessToken"); // Retrieve accessToken from local storage

    if (!empId) {
      alert("Employee ID not found in local storage.");
      return;
    }

    if (!accessToken) {
      alert("Access token not found in local storage.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", documentType);
    formData.append("employee", empId);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/employee-attachments/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`, // Add Authorization header
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert("File upload failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Files</h2>
        <form className="space-y-4">
          {/* Adhaar File */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Adhaar File</label>
            <input
              type="file"
              onChange={handleAdhaarChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => handleSubmit(adhaarFile, "aadhar")}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Adhaar
            </button>
          </div>

          {/* PAN File */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">PAN File</label>
            <input
              type="file"
              onChange={handlePanChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => handleSubmit(panFile, "pan")}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save PAN
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFiles;
