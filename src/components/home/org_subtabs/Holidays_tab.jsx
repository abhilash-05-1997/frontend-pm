import React, { useEffect, useState } from 'react';
import apiService from '../../../api/apiService';
import HolidayForm from '../../../utility/forms/HolidayForm';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Holidays_tab = () => {
  const [holidays, setHolidays] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [holidayToEdit, setHolidayToEdit] = useState(null);
  const [holidayToDelete, setHolidayToDelete] = useState("");

  const FETCH_HOLIDAYS = "api/holidays/";
  const ADD_HOLIDAY = "api/holidays/";
  const DELETE_HOLIDAY = "api/holidays/";

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if(!token){
          console.error("No token provided");
          return;
        }
        const response = await apiService.fetchInstance(FETCH_HOLIDAYS);
        setHolidays(response.data || []);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  const openModalForAdding = () => setIsAddModalOpen(true);

  const openModalForEditing = (holiday) => {
    setHolidayToEdit(holiday);
    setIsEditModalOpen(true);
  };

  const handleAddHoliday = async (newHoliday) => {
    try {
      await apiService.createInstance(ADD_HOLIDAY, newHoliday);
      const response = await apiService.fetchInstance(FETCH_HOLIDAYS);
      setHolidays(response.data || []);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding holiday:", error);
    }
  };

  const handleEditHoliday = async (updatedHoliday) => {
    try {
      const { id } = holidayToEdit;
      await apiService.modifyInstance(`${FETCH_HOLIDAYS}${id}/`, updatedHoliday);
      const response = await apiService.fetchInstance(FETCH_HOLIDAYS);
      setHolidays(response.data || []);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing holiday:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiService.deleteInstance(`${DELETE_HOLIDAY}${holidayToDelete}/`);
      setHolidays(holidays.filter((holiday) => holiday.id !== holidayToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  const openDeleteConfirmationModal = (holidayId) => {
    setHolidayToDelete(holidayId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 dark:text-dark-text">Holidays</h2>

      <button
        onClick={openModalForAdding}
        className="mb-4 px-4 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition dark:bg-dark-add-button dark:text-dark-button-text dark:font-bold"
      >
        Add Holiday
      </button>

      <div className="overflow-x-auto flex-auto">
        <table className="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg text-left dark:bg-dark-bg dark:text-dark-text">
          <thead>
            <tr>
              <th className="py-2 border-b text-left">Holiday Name</th>
              <th className="py-2 border-b text-left">Holiday Date</th>
              <th className="py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id}>
                <td className="py-2 border-b">{holiday.holiday_name}</td>
                <td className="py-2 border-b">{holiday.holiday_date}</td>
                <td className="py-2 border-b">
                  <button
                    onClick={() => openModalForEditing(holiday)}
                    className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-600 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    
                    <FaEdit/>
                  </button>
                  <button
                    onClick={() => openDeleteConfirmationModal(holiday.id)}
                    className="ml-2 px-3 py-1 sm:px-4 sm:py-2 bg-red-700 text-white rounded-md hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Holiday Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <HolidayForm
              holiday={[]}
              onClose={() => setIsAddModalOpen(false)}
              onSave={handleAddHoliday}
            />
          </div>
        </div>
      )}

      {/* Edit Holiday Modal */}
      {isEditModalOpen && holidayToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <HolidayForm
              holiday={holidayToEdit}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleEditHoliday}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h3 className="text-lg sm:text-xl font-semibold">
              Are you sure you want to delete this holiday?
            </h3>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holidays_tab;
