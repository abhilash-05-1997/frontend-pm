// import React, { useState } from "react";
// import InputField from "../InputField"; // Assuming you have an InputField component

// const AddLeavePolicyForm = ({ leaveTypes, initialData, onSave, onClose }) => {
//   // console.log("form", initialData);

//   const [formData, setFormData] = useState({
//     id: initialData?.id,
//     leavename: initialData?.leave_type?.leavename || "",
//     description: initialData?.leave_type?.leave_description || "",
//     max_days: initialData?.max_days || "",
//     carry_forward_type: initialData?.carry_forward_type || "monthly",
//     leave_type: initialData?.leave_type?.id,
//     carry_forward: initialData?.carry_forward || false,
//     carry_forward_days: initialData?.carry_forward_days || 0, // Default to 0
//     company: initialData?.leave_type?.company || "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name === "carry_forward" && !checked) {
//       // When carry_forward is unchecked, reset carry_forward_days to 0
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: checked,
//         carry_forward_days: 0,
//       }));
//     } else if (name === "carry_forward_days") {
//       // Allow "0" to be entered, but don't display leading zeros
//       const numericValue = value.replace(/^0+(?=\d)/, "") || ""; // Allow empty field
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: numericValue,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-dark-bg dark:text-dark-text">
//       <div className="w-full max-w-lg sm:max-w-lg lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg dark:bg-dark-bg dark:text-dark-text">
//         <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-8  dark:bg-dark-bg dark:text-dark-text">
//           Add Leave Types
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6 dark:bg-dark-bg dark:text-dark-text">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6  dark:bg-dark-bg dark:text-dark-text" >
//             <InputField
//               label="Leave Name"
//               type="text"
//               id="leavename"
//               name="leavename"
//               value={formData.leavename}
//               onChange={handleChange}
//               required
//               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
//               disabled={!!formData.id}
//             />

//             <div>
//               <label
//                 htmlFor="carryForwardType"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Carry Forward Type
//               </label>
//               <select
//                 id="carryForwardType"
//                 name="carry_forward_type"
//                 value={formData.carry_forward_type}
//                 onChange={handleChange}
//                 className="block mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500  dark:bg-dark-bg dark:text-dark-text"
//               >
//                 <option value="monthly">Monthly</option>
//                 <option value="quarterly">Quarterly</option>
//               </select>
//             </div>

//             <InputField
//               label="Max Days"
//               type="number"
//               id="max_days"
//               name="max_days"
//               value={(formData.max_days)}
//               onChange={handleChange}
//               required
//               className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />

//             <div className="col-span-1 sm:col-span-2 flex items-center  dark:bg-dark-bg dark:text-dark-text">
//               <input
//                 type="checkbox"
//                 name="carry_forward"
//                 id="carry_forward"
//                 checked={formData.carry_forward}
//                 onChange={handleChange}
//                 className="mr-2  dark:bg-dark-bg dark:text-dark-text"
//               />
//               <label
//                 htmlFor="carry_forward"
//                 className="text-sm font-medium text-gray-700  dark:bg-dark-bg dark:text-dark-text"
//               >
//                 Carry Forward
//               </label>
//             </div>

//             {formData.carry_forward && (
//               <InputField
//                 label="Carry Forward Days"
//                 type="number"
//                 id="carry_forward_days"
//                 name="carry_forward_days"
//                 value={
//                   formData.carry_forward ? formData.carry_forward_days : "" // Empty field when unchecked
//                 }
//                 onChange={handleChange}
//                 placeholder="Enter days to carry forward"
//                 className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//             )}
//           </div>

//           <InputField
//             label="Description"
//             type="textarea"
//             id="description"
//             name="description"
//             value={formData.description || ""}
//             onChange={handleChange}
//             className="col-span-1 sm:col-span-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500  dark:bg-dark-bg dark:text-dark-text"
//             rows={3}
//             required
//           />

//           <div className="flex justify-between items-center space-x-4">
//             <button
//               type="submit"
//               className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-full sm:w-auto px-6 py-3 text-gray-600 bg-gray-200 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddLeavePolicyForm;
import React, { useState } from "react";
import InputField from "../InputField"; // Assuming you have an InputField component

const AddLeavePolicyForm = ({ leaveTypes, initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id,
    leavename: initialData?.leave_type?.leavename || "",
    description: initialData?.leave_type?.leave_description || "",
    max_days: initialData?.max_days || "",
    carry_forward_type: initialData?.carry_forward_type || "monthly",
    leave_type: initialData?.leave_type?.id,
    carry_forward: initialData?.carry_forward || false,
    carry_forward_days: initialData?.carry_forward_days || 0,
    company: initialData?.leave_type?.company || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.leavename.trim()) {
      newErrors.leavename = "Leave name is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.max_days) {
      newErrors.max_days = "Max days is required.";
    } else if (isNaN(formData.max_days) || formData.max_days <= 0) {
      newErrors.max_days = "Max days must be a positive number.";
    }
    if (formData.carry_forward && (!formData.carry_forward_days || formData.carry_forward_days <= 0)) {
      newErrors.carry_forward_days = "Carry forward days must be a positive number if carry forward is enabled.";
    }
    if (formData.carry_forward && Number(formData.carry_forward_days) > Number(formData.max_days)) {
      newErrors.carry_forward_days = "Carry Forward Days should not be greater than Max Days."
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "carry_forward" && !checked) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
        carry_forward_days: 0,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-dark-bg dark:text-dark-text">
      <div className="w-full max-w-lg sm:max-w-lg lg:max-w-3xl p-6 bg-white rounded-lg shadow-lg dark:bg-dark-bg dark:text-dark-text">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 text-center mb-8">
          Add Leave Types
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Leave Name"
              type="text"
              id="leavename"
              name="leavename"
              value={formData.leavename}
              onChange={handleChange}
              className={`p-3 border rounded-lg shadow-sm ${
                errors.leavename ? "border-red-500" : "border-gray-300"
              }`}
              disabled={!!formData.id}
            />
            {errors.leavename && <p className="text-red-500">{errors.leavename}</p>}

            <div>
              <label htmlFor="carryForwardType" className="block text-sm font-medium text-gray-700 dark:bg-dark-bg dark:text-dark-text">
                Carry Forward Type
              </label>
              <select
                id="carryForwardType"
                name="carry_forward_type"
                value={formData.carry_forward_type}
                onChange={handleChange}
                className="block mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-dark-bg dark:text-dark-text"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <InputField
              label="Max Days"
              type="number"
              id="max_days"
              name="max_days"
              value={formData.max_days}
              onChange={handleChange}
              className={`p-3 border rounded-lg shadow-sm ${
                errors.max_days ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.max_days && <p className="text-red-500">{errors.max_days}</p>}

            <div className="col-span-1 sm:col-span-2 flex items-center">
              <input
                type="checkbox"
                name="carry_forward"
                id="carry_forward"
                checked={formData.carry_forward}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="carry_forward" className="text-sm font-medium text-gray-700 dark:text-dark-text">
                Carry Forward
              </label>
            </div>

            {formData.carry_forward && (
              <InputField
                label="Carry Forward Days"
                type="number"
                id="carry_forward_days"
                name="carry_forward_days"
                value={formData.carry_forward_days || ""}
                onChange={handleChange}
                className={`p-3 border rounded-lg shadow-sm ${
                  errors.carry_forward_days ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
            {errors.carry_forward_days && <p className="text-red-500">{errors.carry_forward_days}</p>}
          </div>

          <InputField
            label="Description"
            type="textarea"
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className={`col-span-1 sm:col-span-2 w-full p-3 border rounded-lg shadow-sm dark:bg-dark-bg dark:text-dark-text${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}

          <div className="flex justify-between items-center space-x-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-gray-600 bg-gray-200 rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeavePolicyForm;
