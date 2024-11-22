import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NewHireForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    reportingManager: "",
  });
  const [managerList, setManagerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchManagers = async () => {
      const token = localStorage.getItem("accessToken");
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/accounts/reporting-managers/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setManagerList(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching managers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "http://127.0.0.1:8000/accounts/register/",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          reporting_manager: formData.reportingManager,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("User registered successfully");
      toast.success("Added New User Successfully...");
      onClose();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const renderInputField = (label, name, type, placeholder, required = false) => (
    <div className="form-group">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </div>
  );

  return (
    <div className="max-h-screen overflow-y-auto p-6 bg-gray-50">
      <form
        className="space-y-8 p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          New Hire Registration
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {renderInputField("First Name *", "firstName", "text", "Enter first name", true)}
          {renderInputField("Last Name *", "lastName", "text", "Enter last name", true)}
        </div>
        {renderInputField("Username *", "username", "text", "Enter username", true)}
        {renderInputField("Email *", "email", "email", "Enter email address", true)}
        {renderInputField("Password *", "password", "password", "Enter password", true)}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Reporting Manager
          </label>
          <select
            name="reportingManager"
            value={formData.reportingManager}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <option value="">Select Manager</option>
            {isLoading ? (
              <option disabled>Loading managers...</option>
            ) : (
              managerList.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.username}
                </option>
              ))
            )}
          </select>
        </div>
        {/* Sticky Button Footer */}
        <div className="sticky bottom-0 bg-white py-4 flex justify-end space-x-6">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewHireForm;
