import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';

const EmployeeTab = () => {
  const [employees, setEmployees] = useState([]);
  const GET_ALL_USERS = 'accounts/users/all/';

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await apiService.fetchInstance(GET_ALL_USERS);
        setEmployees(response.data);
      } catch (error) {
        console.error("ERROR FETCHING USERS", error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-6 dark:bg-dark-bg">
      <h1 className="text-2xl font-semibold text-start mb-6 dark:text-dark-text">Employees</h1>
      
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white dark:bg-dark-bg text-sm text-gray-700 dark:text-dark-text">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
              <th className="px-6 py-3 text-center font-medium">Name</th>
              <th className="px-6 py-3 text-center font-medium">Email</th>
              <th className="px-6 py-3 text-center font-medium">Role</th>
              <th className="px-6 py-3 text-center font-medium">Manager</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-dark-bg'} hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.email}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.manager_name || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTab;
