import React from "react";

const NewHireForm = ({
  formData,
  managerList,
  isLoading,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const renderInputField = (label, name, type, placeholder, required = false) => (
    <div className="form-group flex items-center gap-4">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 w-32"
      >
        {`${label} :`}
        {required }
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
    </div>
  );

  return (
    <form
      className="space-y-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-xl"
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        New Hire Registration
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderInputField("First Name", "firstName", "text", "Enter first name", true)}
        {renderInputField("Last Name", "lastName", "text", "Enter last name", true)}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {renderInputField("Username", "username", "text", "Enter username", true)}
        {renderInputField("Email", "email", "email", "Enter email address", true)}
        {renderInputField("Password", "password", "password", "Enter password", true)}
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
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-blue-500 transition duration-200 text-sm"
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

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewHireForm;
