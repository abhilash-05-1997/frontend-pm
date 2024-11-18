import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";

const LeaveRequests = () => {
  const generateDummyData = () => {
    const leaveTypes = [
      "Sick Leave",
      "Personal Leave",
      "Work From Home",
      "Vacation",
    ];
    const statuses = ["Approved", "Rejected", "Pending"];
    const types = ["Paid", "Unpaid"];
    const employees = [
      "John Doe",
      "Jane Smith",
      "Michael Johnson",
      "Emily Davis",
      "Chris Lee",
    ];

    const getRandomDate = (start, end) => {
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return `${date.getDate()}-${date.toLocaleString("en", {
        month: "short",
      })}-${date.getFullYear()}`;
    };

    return Array.from({ length: 100 }, (_, index) => ({
      employee: `${employees[Math.floor(Math.random() * employees.length)]} (${
        index + 1
      })`,
      leaveType: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      type: types[Math.floor(Math.random() * types.length)],
      leaveDates: `${getRandomDate(
        new Date(2024, 0, 1),
        new Date(2024, 11, 31)
      )} - ${getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31))}`,
      daysTaken: `${Math.floor(Math.random() * 10) + 1} Day(s)`,
      requestDate: getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31)),
    }));
  };

  const [data, setData] = useState([]);
  
  // Generate and set data on initial load
  useEffect(() => {
    //API call will be made to fetch data from server
    const data = generateDummyData();
    setData(data);
  }, []);

  // Filtered data based on the selected filter
  const updateRequestStatus = (id, newStatus) => {
    console.log(`Request ${id} updated to ${newStatus}`);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    // <div className="container mx-auto p-4">
    //     {/* Header Navigation */}
    //     <div className="flex flex-wrap items-center justify-between mb-4 space-y-2 sm:space-y-0">
    //         <div className="flex flex-wrap space-x-2 items-center">
    //             <select
    //                 value={filter}
    //                 onChange={handleFilterChange}
    //                 className="border border-gray-300 rounded px-2 py-1 text-sm"
    //             >
    //                 <option>All Requests</option>
    //                 <option>Approved</option>
    //                 <option>Rejected</option>
    //                 <option>Pending</option>
    //             </select>
    //             <button className="text-sm font-medium text-gray-600 px-4 py-1 border rounded focus:outline-none">Direct</button>
    //             <button className="text-sm font-medium text-gray-600 px-4 py-1 border rounded focus:outline-none">All</button>
    //             <button className="bg-blue-600 text-white px-4 py-1 rounded focus:outline-none">Add Request</button>
    //         </div>
    //     </div>

    //     {/* Table */}
    //     <div className="overflow-x-auto bg-white shadow rounded-lg">
    //         <table className="min-w-full text-sm text-gray-600">
    //             <thead>
    //                 <tr className="bg-gray-100 border-b">
    //                     {/* <th className="px-2 sm:px-4 py-2"><input type="checkbox" /></th> */}
    //                     <th className="px-2 sm:px-4 py-2">Status</th>
    //                     <th className="px-2 sm:px-4 py-2">Employee Name</th>
    //                     <th className="px-2 sm:px-4 py-2">Leave Type</th>
    //                     <th className="px-2 sm:px-4 py-2">Type</th>
    //                     <th className="px-2 sm:px-4 py-2">Leave Dates</th>
    //                     <th className="px-2 sm:px-4 py-2">Days/Hours Taken</th>
    //                     <th className="px-2 sm:px-4 py-2">Date of Request</th>
    //                     <th className="px-2 sm:px-4 py-2">Action</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //             {paginatedData.map((request, index) => (
    //                     <tr key={request.id} className="border-b hover:bg-gray-50">
    //                         <td className="px-2 sm:px-4 py-2 text-center text-orange-500">
    //                             {request.status === 'Pending' && '⏳'}
    //                             {request.status === 'Approved' && '✔️'}
    //                             {request.status === 'Rejected' && '❌'}
    //                         </td>
    //                         <td className="px-2 sm:px-4 py-2">{request.employee}</td>
    //                         <td className="px-2 sm:px-4 py-2">{request.leaveType}</td>
    //                         <td className="px-2 sm:px-4 py-2">{request.type}</td>
    //                         <td className="px-2 sm:px-4 py-2">{request.leaveDates}</td>
    //                         <td className="px-2 sm:px-4 py-2">{request.daysTaken}</td>
    //                         <td className="px-2 sm:px-4 py-2">{request.requestDate}</td>
    //                         <td className="px-2 sm:px-4 py-2 text-center">
    //                             <button
    //                                 onClick={() => updateRequestStatus(request.id, 'Approved')}
    //                                 className="text-sm bg-green-500 text-white px-3 py-1 rounded mr-2"
    //                             >
    //                                 Approve
    //                             </button>
    //                             <button
    //                                 onClick={() => updateRequestStatus(request.id, 'Rejected')}
    //                                 className="text-sm bg-red-500 text-white px-3 py-1 rounded"
    //                             >
    //                                 Reject
    //                             </button>
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>

    //     {/* Pagination */}
    //     <div className="flex flex-wrap items-center justify-between mt-4 space-y-2 sm:space-y-0">
    //         <div className="text-sm text-gray-600">Total Record Count: <span className="font-semibold">{totalRecords}</span></div>
    //         <div className="flex items-center space-x-2">
    //             <select
    //                 value={recordsPerPage}
    //                 onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
    //                 className="border border-gray-300 rounded px-2 py-1 text-sm"
    //             >
    //                 <option value={20}>20</option>
    //                 <option value={40}>40</option>
    //                 <option value={60}>60</option>
    //             </select>
    //             <span className="text-sm text-gray-6 ">Records per page</span>
    //             <div className="flex space-x-1">
    //                 {Array.from({ length: totalPages }, (_, i) => (
    //                     <button
    //                         onClick={() => handlePageChange(i + 1)}
    //                         className={`px-2 py-1 border rounded text-sm ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
    //                     >
    //                         {i + 1}
    //                     </button>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <LeaveRequestsTable
      data={data}
      showActions={true}
      onStatusChange={updateRequestStatus}
    />
  );
};

export default LeaveRequests;
