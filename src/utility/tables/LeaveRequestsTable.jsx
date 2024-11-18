import React, { useState } from 'react';

const LeaveRequestsTable = ({
    data,
    showActions = false,
    onStatusChange,
}) => {
    const [filter, setFilter] = useState('All Requests');
    const [recordsPerPage, setRecordsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    // Filtered data
    const filteredData =
        filter === 'All Requests'
            ? data
            : data.filter((request) => request.status === filter);

    // Pagination logic
    const totalRecords = filteredData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + recordsPerPage);

    // Filter change handler
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };

    // Page change handler
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Filter and Pagination Controls */}
            <div className="flex flex-wrap items-center justify-between mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value="All Requests">All Requests</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <span className="text-sm text-gray-600">
                        Total Records: <strong>{totalRecords}</strong>
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <select
                        value={recordsPerPage}
                        onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value={20}>20</option>
                        <option value={40}>40</option>
                        <option value={60}>60</option>
                    </select>
                    <span className="text-sm text-gray-600">Records per page</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm text-gray-600">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-2 sm:px-4 py-2">Status</th>
                            <th className="px-2 sm:px-4 py-2">Employee Name</th>
                            <th className="px-2 sm:px-4 py-2">Leave Type</th>
                            <th className="px-2 sm:px-4 py-2">Type</th>
                            <th className="px-2 sm:px-4 py-2">Leave Dates</th>
                            <th className="px-2 sm:px-4 py-2">Days/Hours Taken</th>
                            <th className="px-2 sm:px-4 py-2">Date of Request</th>
                            {showActions && <th className="px-2 sm:px-4 py-2">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((request, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-2 sm:px-4 py-2 text-center text-orange-500">
                                    {request.status === 'Pending' && '⏳'}
                                    {request.status === 'Approved' && '✔️'}
                                    {request.status === 'Rejected' && '❌'}
                                </td>
                                <td className="px-2 sm:px-4 py-2">{request.employee}</td>
                                <td className="px-2 sm:px-4 py-2">{request.leaveType}</td>
                                <td className="px-2 sm:px-4 py-2">{request.type}</td>
                                <td className="px-2 sm:px-4 py-2">{request.leaveDates}</td>
                                <td className="px-2 sm:px-4 py-2">{request.daysTaken}</td>
                                <td className="px-2 sm:px-4 py-2">{request.requestDate}</td>
                                {showActions && (
                                    <td className="px-2 sm:px-4 py-2 text-center">
                                        <button
                                            onClick={() => onStatusChange(request.id, 'Approved')}
                                            className="text-sm bg-green-500 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => onStatusChange(request.id, 'Rejected')}
                                            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 space-x-1">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 border rounded text-sm ${
                            currentPage === i + 1
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LeaveRequestsTable;