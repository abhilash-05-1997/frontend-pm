// import React from "react";

// const NewHireForm = ({
//   formData,
//   managerList,
//   isLoading,
//   onChange,
//   onSubmit,
//   onCancel,
// }) => {
//   const renderInputField = (label, name, type, placeholder, required = false) => (
//     <div className="form-group flex items-center gap-4">
//       <label
//         htmlFor={name}
//         className="text-sm font-medium text-gray-700 w-32"
//       >
//         {`${label} :`}
//         {required }
//       </label>
//       <input
//         id={name}
//         type={type}
//         name={name}
//         value={formData[name]}
//         onChange={onChange}
//         placeholder={placeholder}
//         required={required}
//         className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 transition duration-200 text-sm"
//       />
//     </div>
//   );

//   // return (
//   //   <form
//   //     className="space-y-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-xl"
//   //     onSubmit={onSubmit}
//   //   >
//   //     <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
//   //       New Hire Registration
//   //     </h2>

//   //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//   //       {renderInputField("First Name", "firstName", "text", "Enter first name", true)}
//   //       {renderInputField("Last Name", "lastName", "text", "Enter last name", true)}
//   //     </div>

//   //     <div className="grid grid-cols-1 gap-4">
//   //       {renderInputField("Username", "username", "text", "Enter username", true)}
//   //       {renderInputField("Email", "email", "email", "Enter email address", true)}
//   //       {renderInputField("Password", "password", "password", "Enter password", true)}
//   //     </div>

//   //     <div className="form-group flex items-center gap-4">
//   //       <label
//   //         htmlFor="reportingManager"
//   //         className="text-sm font-medium text-gray-700 w-32"
//   //       >
//   //         Reporting Manager
//   //       </label>
//   //       <select
//   //         id="reportingManager"
//   //         name="reportingManager"
//   //         value={formData.reportingManager}
//   //         onChange={onChange}
//   //         className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 transition duration-200 text-sm"
//   //       >
//   //         <option value="">Select Manager</option>
//   //         {isLoading ? (
//   //           <option disabled>Loading managers...</option>
//   //         ) : (
//   //           managerList.map((manager) => (
//   //             <option key={manager.id} value={manager.id}>
//   //               {manager.username}
//   //             </option>
//   //           ))
//   //         )}
//   //       </select>
//   //     </div>

//   //     <div className="flex justify-end space-x-4">
//   //       <button
//   //         type="button"
//   //         onClick={onCancel}
//   //         className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
//   //       >
//   //         Cancel
//   //       </button>
//   //       <button
//   //         type="submit"
//   //         className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
//   //       >
//   //         Submit
//   //       </button>
//   //     </div>
//   //   </form>
//   // );
//   return (
//     <form
//       className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg w-full max-w-2xl border border-gray-200"
//       onSubmit={onSubmit}
//     >
//       <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
//         New Hire Registration
//       </h2>
  
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {renderInputField(
//           "First Name",
//           "firstName",
//           "text",
//           "Enter first name",
//           true
//         )}
//         {renderInputField(
//           "Last Name",
//           "lastName",
//           "text",
//           "Enter last name",
//           true
//         )}
//       </div>
  
//       <div className="grid grid-cols-1 gap-6">
//         {renderInputField(
//           "Username",
//           "username",
//           "text",
//           "Enter username",
//           true
//         )}
//         {renderInputField("Email", "email", "email", "Enter email address", true)}
//         {renderInputField(
//           "Password",
//           "password",
//           "password",
//           "Enter password",
//           true
//         )}
//       </div>
  
//       <div className="form-group flex items-center gap-4">
//         <label
//           htmlFor="reportingManager"
//           className="text-sm font-medium text-gray-700 w-32"
//         >
//           Reporting Manager
//         </label>
//         <select
//           id="reportingManager"
//           name="reportingManager"
//           value={formData.reportingManager}
//           onChange={onChange}
//           className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
//         >
//           <option value="">Select Manager</option>
//           {isLoading ? (
//             <option disabled>Loading managers...</option>
//           ) : (
//             managerList.map((manager) => (
//               <option key={manager.id} value={manager.id}>
//                 {manager.username}
//               </option>
//             ))
//           )}
//         </select>
//       </div>
  
//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="py-2 px-5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
//         >
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default NewHireForm;
import React, { useState } from "react";

const NewHireForm = ({
  formData,
  managerList,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Validate first name
    if (!formData.firstName) {
      newErrors.firstName = "First name is required.";
    }
    
    // Validate last name
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required.";
    }
    
    // Validate username
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Validate reporting manager
    if (!formData.reportingManager) {
      newErrors.reportingManager = "Reporting manager is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const renderInputField = (label, name, type, placeholder, required = false) => (
    <div className="form-group flex items-center gap-4">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 w-32"
      >
        {`${label} :`}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 transition duration-200 text-sm"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  return (
    <form
      className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg w-full max-w-2xl border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        New Hire Registration
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {renderInputField(
          "First Name",
          "firstName",
          "text",
          "Enter first name",
          true
        )}
        {renderInputField(
          "Last Name",
          "lastName",
          "text",
          "Enter last name",
          true
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {renderInputField(
          "Username",
          "username",
          "text",
          "Enter username",
          true
        )}
        {renderInputField("Email", "email", "email", "Enter email address", true)}
        {renderInputField(
          "Password",
          "password",
          "password",
          "Enter password",
          true
        )}
      </div>

      <div className="form-group flex items-center gap-4">
        <label
          htmlFor="reportingManager"
          className="text-sm font-medium text-gray-700 w-32"
        >
          Reporting Manager
        </label>
        <select
          id="reportingManager"
          name="reportingManager"
          value={formData.reportingManager}
          onChange={onChange}
          className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all duration-300 text-sm shadow-sm hover:shadow-md"
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
        {errors.reportingManager && (
          <p className="text-red-500 text-sm">{errors.reportingManager}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewHireForm;
