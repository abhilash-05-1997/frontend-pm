// import React, { useEffect, useState } from "react";
// import apiService from "../../../api/apiService";
// import { toast } from "react-toastify";

// const EmployeeTab = () => {
//   const [employees, setEmployees] = useState([]);
//   const GET_ALL_USERS = "accounts/users/all/";
//   const GET_MANAGERS = "accounts/reporting-managers/";
//   const UPDATE_MANAGER = "accounts/users/update-manager/";
//   const [managerList, setManagerList] = useState([]);

//   const [roleOptions] = useState([
//     { value: 1, label: "Admin" },
//     { value: 2, label: "Employee" },
//     { value: 3, label: "Manager" },
//   ]);
//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }
//       const response = await apiService.fetchInstance(GET_ALL_USERS);
//       console.log("employees", response.data);
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("ERROR FETCHING USERS", error);
//     }
//   };

//   const handleManagerChange = async (userId, newManagerId) => {
//     try {
//       await apiService.modifyInstance(UPDATE_MANAGER, {
//         user_id: userId,
//         new_manager_id: newManagerId,
//       });

//       // Update the employee list to reflect the change
//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee.id === userId
//             ? { ...employee, reporting_manager: newManagerId }
//             : employee
//         )
//       );

//       toast.success("Manager updated successfully.");
//       fetchEmployees();
//     } catch (error) {
//       console.error("Error updating manager:", error);
//       toast.error("Failed to update manager.");
//     }
//   };

//   const fetchManagers = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return;
//     try {
//       const response = await apiService.fetchInstance(GET_MANAGERS);
//       console.log("Response", response.data);

//       setManagerList(response.data);
//       console.log("managerList", managerList);
//     } catch (error) {
//       console.error("Error fetching managers:", error);
//     }
//   };
//   useEffect(() => {
//     fetchEmployees();
//     fetchManagers();
//   }, []);

//   console.log("Employees", employees);

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       // Send PATCH request to update role
//       await apiService.modifyInstance(`accounts/users/update_role/`, {
//         user_id: userId,
//         newRole,
//       });

//       // Update the employees state with the new role
//       // setEmployees((prevEmployees) =>
//       //   prevEmployees.map((employee) =>
//       //     employee.id === userId
//       //       ? { ...employee, role: roleOptions.find((role) => role.value === newRole)?.label }
//       //       : employee
//       //   )
//       // );
//       setEmployees((prevEmployees) =>
//         prevEmployees.map((employee) =>
//           employee.id === userId
//             ? { ...employee, role: newRole } // Update role with the new value
//             : employee
//         )
//       );

//       toast.success("Role Updated Successfully");
//       fetchEmployees();
//     } catch (error) {
//       console.error("Error updating role", error);
//     }
//   };

//   console.log("Employees", employees);

//   return (
//     <div className="p-6 dark:bg-dark-bg">
//       <h1 className="text-2xl font-semibold text-start mb-6 dark:text-dark-text">
//         Employees
//       </h1>
  
//       <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
//         <table className="min-w-full bg-white dark:bg-dark-bg text-sm text-gray-700 dark:text-dark-text">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
//               <th className="px-6 py-3 text-center font-medium">Name</th>
//               <th className="px-6 py-3 text-center font-medium">Email</th>
//               {/* <th className="px-6 py-3 text-center font-medium">Role</th> */}
//               {/* <th className="px-6 py-3 text-center font-medium">Manager</th> */}
//               <th className="px-6 py-3 text-center font-medium">Action</th>
//               <th className="px-6 py-3 text-center font-medium">
//                 Update Manager
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length > 0 ? (
//               employees.map((employee, index) => (
//                 <tr
//                   key={index}
//                   className={`border-b dark:border-gray-700 ${
//                     index % 2 === 0
//                       ? "bg-gray-50 dark:bg-gray-900"
//                       : "bg-white dark:bg-dark-bg"
//                   } hover:bg-gray-100 dark:hover:bg-gray-700`}
//                 >
//                   <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
//                     {employee.name}
//                   </td>
//                   <td className="px-6 py-4 text-center font-medium text-gray-600 dark:text-gray-300">
//                     {employee.email}
//                   </td>
//                   {/* <td className="px-6 py-4">{employee.role}</td> */}
//                   {/* <td className="px-6 py-4">{employee.manager_name || "N/A"}</td> */}
//                   <td className="px-6 py-4">
//                     <select
//                       value={
//                         roleOptions.find(
//                           (role) => role.label === employee.role
//                         )?.value || ""
//                       }
//                       onChange={(e) =>
//                         handleRoleChange(employee.user_id, parseInt(e.target.value))
//                       }
//                       className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
//                     >
//                       {roleOptions.map((role) => (
//                         <option key={role.value} value={role.value}>
//                           {role.label}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   {/* <td className="px-6 py-4">
//                     <select
//                       value={employee.manager_id || ""}
//                       onChange={(e) => handleManagerChange(employee.user_id, parseInt(e.target.value))}
//                       className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded"
//                     >
//                       <option>Select Manager</option>
//                       {managerList.map((manager) => (
//                         <option key={manager.id} value={manager.id}>
//                             {`${manager.first_name} ${manager.last_name}`}
//                         </option>
//                       ))}
//                     </select>
//                     </td> */}
//                   <td className="px-6 py-4">
//                     <select
//                       value={employee.reporting_manager || ""}
//                       onChange={(e) =>
//                         handleManagerChange(
//                           employee.user_id,
//                           parseInt(e.target.value)
//                         )
//                       }
//                       className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">
//                         {employee.manager_name
//                           ? `${employee.manager_name}`
//                           : "No Manager Assigned"}
//                       </option>
//                       {managerList.map((manager) => (
//                         <option key={manager.id} value={manager.id}>
//                           {`${manager.first_name} ${manager.last_name}`}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
//                   No employees found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeTab;

// Above code is previous one
import React, { useEffect, useState } from "react";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";

const EmployeeTab = () => {
  const [employees, setEmployees] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("");
  const [managerList, setManagerList] = useState([]);
  const GET_ALL_USERS = "accounts/users/all/";
  const GET_MANAGERS = "accounts/reporting-managers/";
  const UPDATE_MANAGER = "accounts/users/update-manager/";

  const [roleOptions] = useState([
    { value: 1, label: "Admin" },
    { value: 2, label: "Employee" },
    { value: 3, label: "Manager" },
  ]);

  const fetchEmployees = async (name = "") => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found");
        return;
      }
      // const response = await apiService.fetchInstance(
      //   `${GET_ALL_USERS}?name=${query}`
      // );
      const endpoint = name ? `${GET_ALL_USERS}?name=${name}` : GET_ALL_USERS;
      const response = await apiService.fetchInstance(endpoint);
      setEmployees(response.data);
    } catch (error) {
      console.error("ERROR FETCHING USERS", error);
    }
  };

  const handleManagerChange = async (userId, newManagerId) => {
    try {
      await apiService.modifyInstance(UPDATE_MANAGER, {
        user_id: userId,
        new_manager_id: newManagerId,
      });
      toast.success("Manager updated successfully.");
      fetchEmployees();
    } catch (error) {
      console.error("Error updating manager:", error);
      toast.error("Failed to update manager.");
    }
  };

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const response = await apiService.fetchInstance(GET_MANAGERS);
      setManagerList(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await apiService.modifyInstance(`accounts/users/update_role/`, {
        user_id: userId,
        newRole,
      });
      toast.success("Role Updated Successfully");
      fetchEmployees();
    } catch (error) {
      console.error("Error updating role", error);
    }
  };

    // const handleSearch = (e) => {
    //   setSearchQuery(e.target.value);
    //   fetchEmployees(e.target.value);
    // };

    const handleSearchKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        fetchEmployees(searchName); // Fetch employees with the search query
      }
    };

  useEffect(() => {
    fetchEmployees();
    fetchManagers();
  }, []);

  return (
    <div className=" dark:bg-dark-bg">
            <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold dark:text-dark-text">
          Employees
        </h1>
        <input
          type="text"
          placeholder="Search by Name"
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-dark-bg text-sm text-gray-700 dark:text-dark-text">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
              <th className="px-6 py-3 text-center font-medium">Name</th>
              <th className="px-6 py-3 text-center font-medium">Email</th>
              <th className="px-6 py-3 text-center font-medium">Action</th>
              <th className="px-6 py-3 text-center font-medium">
                Update Manager
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr
                  key={index}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-dark-bg"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-600 dark:text-gray-300">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={
                        roleOptions.find(
                          (role) => role.label === employee.role
                        )?.value || ""
                      }
                      onChange={(e) =>
                        handleRoleChange(employee.user_id, parseInt(e.target.value))
                      }
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    >
                      {roleOptions.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={employee.reporting_manager || ""}
                      onChange={(e) =>
                        handleManagerChange(
                          employee.user_id,
                          parseInt(e.target.value)
                        )
                      }
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded w-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">
                        {employee.manager_name
                          ? `${employee.manager_name}`
                          : "No Manager Assigned"}
                      </option>
                      {managerList.map((manager) => (
                        <option key={manager.id} value={manager.id}>
                          {`${manager.first_name} ${manager.last_name}`}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
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

