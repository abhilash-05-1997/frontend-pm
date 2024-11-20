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
            : data.filter((request) => request.status_of_leave === filter);

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
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
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
                            <th className="px-2 sm:px-4 py-2">Leave Day Type</th>
                            <th className="px-2 sm:px-4 py-2">Leave Type</th>
                            <th className="px-2 sm:px-4 py-2">Reason for Leave</th>
                            <th className="px-2 sm:px-4 py-2">Start Date</th>
                            <th className="px-2 sm:px-4 py-2">End Date</th>
                            {showActions && <th className="px-2 sm:px-4 py-2">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((request, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-2 sm:px-4 py-2 text-center text-orange-500">
                                    {request.status_of_leave === 'Pending' && '⏳'}
                                    {request.status_of_leave === 'Approved' && '✔️'}
                                    {request.status_of_leave === 'Rejected' && '❌'}
                                </td>
                                <td className="px-2 sm:px-4 py-2">{request.employee.Name}</td>
                                <td className="px-2 sm:px-4 py-2">{request.leave_day_type}</td>
                                <td className="px-2 sm:px-4 py-2">{request.leave_type_name}</td>
                                <td className="px-2 sm:px-4 py-2">{request.reason_for_leave}</td>
                                <td className="px-2 sm:px-4 py-2">{request.start_date}</td>
                                <td className="px-2 sm:px-4 py-2">{request.end_date}</td>

                                {showActions && (
                                    <td className="px-2 sm:px-4 py-2 text-center">
                                        {request.status_of_leave === 'Pending' ? (
                                            <>
                                                <button
                                                    onClick={() => onStatusChange(request.id, 'approve')}
                                                    className="text-sm bg-green-500 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => onStatusChange(request.id, 'reject')}
                                                    className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-500 text-sm">
                                                {request.status_of_leave} 
                                            </span>
                                        )}
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
