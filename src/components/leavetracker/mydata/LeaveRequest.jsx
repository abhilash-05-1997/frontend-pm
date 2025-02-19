import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";
import apiService from "../../../api/apiService";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const GET_LEAVE_REQUESTS = 'api/leave-requests/';
  const DELETE_LEAVE_REQUEST = 'api/leave-requests-cancel/'; // Base URL for deleting leave requests

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await apiService.fetchInstance(GET_LEAVE_REQUESTS);
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave requests", error);
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);

  // Function to cancel a leave request
  const handleCancelRequest = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      // Make DELETE request to the API
      await apiService.deleteInstance(`${DELETE_LEAVE_REQUEST}${id}/`, {
        method: "DELETE",
      });

      // Update state to reflect the canceled request
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error("Error canceling leave request", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-dark-text">
          Leave Requests
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-700 dark:text-dark-text">
              Loading...
            </span>
          </div>
        ) : leaveRequests.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-dark-text">
            <p className="dark:text-dark-text">No leave requests available at the moment.</p>
          </div>
        ) : (
          <LeaveRequestsTable
            data={leaveRequests}
            showActions={false}
            onCancelRequest={handleCancelRequest} // Pass cancel handler
            className="shadow-lg rounded-lg overflow-hidden bg-white"
          />
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
