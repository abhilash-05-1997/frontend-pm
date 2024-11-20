import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";
import apiService from "../../../api/apiService";


const LeaveRequests = () => {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [reportees, setReportees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReporteesLeaveRequests();
  }, []);

  const fetchReporteesLeaveRequests = async () => {
    try {
      // Accessing a AccessToken Value from Local Storage
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await apiService.fetchInstance("api/reportees/leave-requests/");
      console.log("response ", response.data);
      setReportees(response.data);
      setLoading(false);
    } 
    catch (error) {
      console.error("Error fetching leave requests:", error);
      setLoading(false);
    }
  };
  const updateRequestStatus = async (leaveId, action) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage

    if (!token) {
      alert('You are not authorized. Please log in again.');
      return;
    }

    try {
      await apiService.createInstance(`api/leave-requests/${leaveId}/approve-reject/`,{ action }); // action can be 'approve' or 'reject'
      alert(`Leave request ${action}d successfully!`);
      
      // Update the status of the reportee to remove the request from view
      setReportees(prevReportees =>
        prevReportees.map(reportee => 
          reportee.id === leaveId ? { ...reportee, status_of_leave: action } : reportee
        )
      );
    } catch (error) {
      console.error(`Error ${action}ing leave request:`, error);
      alert(`Failed to ${action} the leave request.`);
    }
  };

  return (

    <LeaveRequestsTable
      data={reportees}
      showActions={true}
      onStatusChange={updateRequestStatus}
    />
  );
};

export default LeaveRequests;
