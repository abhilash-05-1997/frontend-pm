import React, { useEffect, useState } from 'react'

const HolidayForm = ({holiday, onClose, onSave }) => {
    const [holidayName, setHolidayName] = useState("");
    const [holidayDate, setHolidayDate] = useState("");
  
    useEffect(() => {
      setHolidayName(holiday.holiday_name); // Pre-fill the holiday name
      setHolidayDate(holiday.holiday_date); // Pre-fill the holiday date
    }, [holiday]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedHoliday = {
        holiday_name: holidayName,
        holiday_date: holidayDate,
      };
      onSave(updatedHoliday); // Pass updated data to the parent handler
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="holiday_name" className="block text-gray-700">
            Holiday Name
          </label>
          <input
            type="text"
            id="holiday_name"
            value={holidayName|| ' '}
            onChange={(e) => setHolidayName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="holiday_date" className="block text-gray-700">
            Holiday Date
          </label>
          <input
            type="date"
            id="holiday_date"
            value={holidayDate || ' '}
            onChange={(e) => setHolidayDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
  
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
   l         Save Holiday
          </button>
        </div>
      </form>
    );
}

export default HolidayForm
