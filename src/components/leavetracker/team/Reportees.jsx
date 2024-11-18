// Reportees.js
import React from 'react';

const Reportees = ({ reportees }) => {
  
  const reporteeData = [
    { id: 1, name: 'HRM19 - Nirav Butani', status: 'Leave', leave: 25.0 },
    { id: 2, name: 'HRM3 - Kunal Kashyap', status: 'Leave', leave: 25.5 },
    { id: 3, name: 'HRM12 - Snehi Jain', status: 'Yet to check-in', leave: 21.0 },
    { id: 4, name: 'HRM15 - Arpit Gupta', status: 'Yet to check-in', leave: 10.0 },
    { id: 5, name: 'HRM6 - Prahalad Chouhan', status: 'Leave', leave: 20.5 },
    { id: 6, name: 'HRM18 - Akshat Nawani', status: 'Leave', leave: 40.0 },
    { id: 7, name: 'HRM27 - Sumanth J M', status: 'Leave', leave: 5.5 },
    { id: 8, name: 'HRM21 - Nagashree M K', status: 'Yet to check-in', leave: 13.5 },
    { id: 9, name: 'HRM28 - Rishi Jain', status: 'Yet to check-in', leave: 0.0 },
  ];
  
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">Reportees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reporteeData.map((reportee) => (
          <div 
            key={reportee.id} 
            className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                {reportee.name.slice(0, 3)}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{reportee.name}</h3>
                <p className={`text-sm font-medium ${reportee.status === 'Leave' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {reportee.status}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Leave booked this year: <span className="font-bold text-gray-700">{reportee.leave}</span></p>
            <p className="text-sm text-gray-600">Working Hours: <span className="font-semibold">9:00 AM - 6:00 PM</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportees;
