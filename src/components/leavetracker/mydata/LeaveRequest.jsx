import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const GET_LEAVE_REQUESTS = 'api/leave-requests/';

  // Fetching data from the API on initial load
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          toast.error('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await apiService.fetchInstance(GET_LEAVE_REQUESTS);
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leave requests", error);
        toast.error("Error fetching leave requests.");
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Leave Requests</h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-700">Loading...</span>
          </div>
        ) : leaveRequests.length === 0 ? (
          <div className="text-center text-gray-700">
            <p>No leave requests available at the moment.</p>
          </div>
        ) : (
          <LeaveRequestsTable
            data={leaveRequests}
            showActions={true}
            className="shadow-lg rounded-lg overflow-hidden bg-white"
          />
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
