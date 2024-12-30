// import React, { useEffect, useState } from 'react'

// const HolidayForm = ({holiday, onClose, onSave }) => {
//     const [holidayName, setHolidayName] = useState("");
//     const [holidayDate, setHolidayDate] = useState("");
  
//     useEffect(() => {
//       setHolidayName(holiday.holiday_name); // Pre-fill the holiday name
//       setHolidayDate(holiday.holiday_date); // Pre-fill the holiday date
//     }, [holiday]);
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const updatedHoliday = {
//         holiday_name: holidayName,
//         holiday_date: holidayDate,
//       };
//       onSave(updatedHoliday); // Pass updated data to the parent handler
//     };
  
//     return (
//       <form onSubmit={handleSubmit} className="dark:bg-dark-bg dark:text-dark-text">
//         <div className="mb-4 dark:bg-dark-bg dark:text-dark-text ">
//           <label htmlFor="holiday_name" className="block text-gray-700 dark:text-dark-text">
//             Holiday Name
//           </label>
//           <input
//             type="text"
//             id="holiday_name"
//             value={holidayName|| ' '}
//             onChange={(e) => setHolidayName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md  dark:bg-dark-bg dark:text-dark-text"
//           />
//         </div>
  
//         <div className="mb-4">
//           <label htmlFor="holiday_date" className="block text-gray-700 dark:text-dark-text">
//             Holiday Date
//           </label>
//           <input
//             type="date"
//             id="holiday_date"
//             value={holidayDate || ' '}
//             onChange={(e) => setHolidayDate(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:text-dark-text"
//           />
//         </div>
  
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//           >
//            Save Holiday
//           </button>
//         </div>
//       </form>
//     );
// }

//export default HolidayForm
import React, { useEffect, useState } from 'react';

const HolidayForm = ({ holiday, onClose, onSave }) => {
  const [holidayName, setHolidayName] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHolidayName(holiday.holiday_name || ''); // Pre-fill the holiday name
    setHolidayDate(holiday.holiday_date || ''); // Pre-fill the holiday date
  }, [holiday]);

  const validateForm = () => {
    const newErrors = {};

    if (!holidayName.trim()) {
      newErrors.holidayName = 'Holiday name is required.';
    }

    if (!holidayDate) {
      newErrors.holidayDate = 'Holiday date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedHoliday = {
      holiday_name: holidayName,
      holiday_date: holidayDate,
    };

    onSave(updatedHoliday); // Pass updated data to the parent handler
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-dark-bg dark:text-dark-text">
      <div className="mb-4">
        <label htmlFor="holiday_name" className="block text-gray-700 dark:text-dark-text">
          Holiday Name
        </label>
        <input
          type="text"
          id="holiday_name"
          value={holidayName}
          onChange={(e) => setHolidayName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:text-dark-text ${
            errors.holidayName ? 'border-red-500' : ''
          }`}
        />
        {errors.holidayName && (
          <p className="text-red-500 text-sm mt-1">{errors.holidayName}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="holiday_date" className="block text-gray-700 dark:text-dark-text">
          Holiday Date
        </label>
        <input
          type="date"
          id="holiday_date"
          value={holidayDate}
          onChange={(e) => setHolidayDate(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:text-dark-text ${
            errors.holidayDate ? 'border-red-500' : ''
          }`}
        />
        {errors.holidayDate && (
          <p className="text-red-500 text-sm mt-1">{errors.holidayDate}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded-md dark:text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Holiday
        </button>
      </div>
    </form>
  );
};

export default HolidayForm;
