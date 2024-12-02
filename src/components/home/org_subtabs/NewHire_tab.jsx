import React, { useEffect, useState } from "react";
import NewHireForm from "./NewHireForm";
import apiService from "../../../api/apiService";

const NewHire_tab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [managerList, setManagerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    reportingManager: "",
  });
  const [newHires, setNewHires] = useState([]);
  const [filter, setFilter] = useState('last_7_days');
  const GET_NEW_HIRES_URL = 'accounts/new-hires/';


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchManagers = async () => {
    const token = localStorage.getItem("accessToken");
    setIsLoading(true);
    try {
      const response = await apiService.fetchInstance('accounts/reporting-managers/');
      setManagerList(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {

      const response = await apiService.createInstance(
        "accounts/register/",
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          reporting_manager: formData.reportingManager,
          company: localStorage.getItem('company_id')
        },
      );
    
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        reportingManager: "",
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const formatDate = (dateString) => {
    // Replace the space between the date and time with 'T' to ensure compatibility with JavaScript's Date constructor
    const formattedDateString = dateString.replace(' ', 'T');
    
    // Parse the formatted date string
    const date = new Date(formattedDateString);
    
    // Check if the date is valid
    if (isNaN(date)) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  
    // Format the date into dd-mm-yyyy format
    const day = ("0" + date.getDate()).slice(-2); // Add leading zero if needed
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero for month
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
  

  useEffect(() => {
    const fetchNewHires = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await apiService.fetchInstance(`${GET_NEW_HIRES_URL}?filter_type=${filter}`);
        // console.log("hire-response", response.data);
        setNewHires(response.data);
      } catch (error) {
        console.error("Error fetching new hires:", error);
      }
    };

    fetchNewHires();
  }, [filter]);

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 dark:bg-dark-add-button dark:font-bold dark:text-black"
      >
        Add New Hire
      </button>
      <h1 className="text-2xl font-semibold text-start mb-6 dark:text-dark-text">New Hires</h1>

      <div className="mb-4">
        <label htmlFor="filter" className="text-sm dark:text-dark-text">Filter by: </label>
        <select
          id="filter"
          className="px-4 py-2 border rounded dark:bg-dark-bg dark:text-dark-text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="last_7_days">Last 7 Days</option>
          <option value="last_month">Last Month</option>
          <option value="last_year">Last Year</option>
          <option value="ALL">ALL</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-dark-bg text-sm text-gray-700 dark:text-dark-text">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
              <th className="px-6 py-3 text-center font-medium">Name</th>
              <th className="px-6 py-3 text-center font-medium">Email</th>
              <th className="px-6 py-3 text-center font-medium">Role</th>
              <th className="px-6 py-3 text-center font-medium">Manager</th>
              <th className="px-6 py-3 text-center font-medium">Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {newHires.length > 0 ? (
              newHires.map((hire, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-dark-bg'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="px-6 py-4">{hire.first_name}</td>
                  <td className="px-6 py-4">{hire.email}</td>
                  <td className="px-6 py-4">{hire.role}</td>
                  <td className="px-6 py-4">{hire.reporting_manager || "N/A"}</td>
                  <td className="px-6 py-4">{formatDate(hire.date_joined)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">
                  No new hires found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Hire</h2>
              {/* <button
                className="text-gray-500 hover:text-gray-800"
                onClick={handleCloseModal}
              >
                X
              </button> */}
            </header>
            <NewHireForm
              formData={formData}
              managerList={managerList}
              isLoading={isLoading}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
      </div>
    </div>


      
  );
};

export default NewHire_tab;
