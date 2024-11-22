import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";
import { toast } from "react-toastify";
import apiService from "../../../api/apiService";

const LeaveRequest = () => {

  const [LeaveRequest, setLeaveRequest] = useState([]);


  const GET_LEAVE_REQUESTS = 'api/leave-requests/'

  
  
  
  // Generate and set data on initial load
  useEffect(() => {
    //API call will be made to fetch data from server based on logged user
    const fetchLeaveRequests = async() => {
      try {
        const token = localStorage.getItem('accessToken');
        if(!token){
          toast.error('Something went wrong...')
          return;
        }
        const response = await apiService.fetchInstance(GET_LEAVE_REQUESTS);
        console.log(response.data);
        setLeaveRequest(response.data);
        
      } catch (error) {
        console.error("Error fetching leave requests", error);

      }
    }
    fetchLeaveRequests();
  }, []);

  // Filtered data based on the selected filter
  
  
  // Pagination logic
  
  return (
    <LeaveRequestsTable
      data={LeaveRequest}
      showActions={false}
      
    />
  );
};

export default LeaveRequest;
