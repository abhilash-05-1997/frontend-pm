import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewHireForm from './NewHireForm';

const NewHire_tab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button 
        onClick={handleOpenModal} 
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add New Hire
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Hire</h2>
              <button className="text-gray-500 hover:text-gray-800" onClick={handleCloseModal}>X</button>
            </header>
            <NewHireForm onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewHire_tab
