import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";
import apiService from "../../../api/apiService";
import { toast } from "react-toastify";

const LeaveRequests = () => {
  const [reportees, setReportees] = useState([]); // Ensure empty array as initial state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReporteesLeaveRequests();
  }, []);

  const fetchReporteesLeaveRequests = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("You have been logged out.. Please Login again");
        return;
      }

    const response = await apiService.fetchInstance("api/reportees/leave-requests/");
    setReportees(response.data.results);
        // console.error("Expected an array but got:", response.data);
        // setReportees([]);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      setReportees([]); // Gracefully handle errors
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (leaveId, action) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("You are not authorized. Please log in again.");
        return;
      }

      await apiService.createInstance(`api/leave-requests/${leaveId}/approve-reject/`, { action });
      toast.success(`Leave request ${action}d successfully!`);

      // Update local state
      setReportees((prevReportees) =>
        prevReportees.map((reportee) =>
          reportee.id === leaveId ? { ...reportee, status_of_leave: action } : reportee
        )
      );
      fetchReporteesLeaveRequests();
    } catch (error) {
      console.error(`Error ${action}ing leave request:`, error);
      // alert(`Failed to ${action} the leave request.`);
      toast.error(`Failed to ${action} the leave request.`);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading leave requests...</p>
      ) : (
        <LeaveRequestsTable
          data={reportees}
          showActions={true}
          onStatusChange={updateRequestStatus}
        />
      )}
    </div>
  );
};

export default LeaveRequests;
