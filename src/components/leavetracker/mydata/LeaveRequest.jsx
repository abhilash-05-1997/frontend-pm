import React, { useEffect, useState } from "react";
import LeaveRequestsTable from "../../../utility/tables/LeaveRequestsTable";

const LeaveRequest = () => {
  const generateDummyData = () => {
    const leaveTypes = [
      "Sick Leave",
      "Personal Leave",
      "Work From Home",
      "Vacation",
    ];
    const statuses = ["Approved", "Rejected", "Pending", "Cancelled"];
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
    //API call will be made to fetch data from server based on logged user
    const data = generateDummyData();
    setData(data);
  }, []);

  // Filtered data based on the selected filter
  
  
  // Pagination logic
  
  return (
    <LeaveRequestsTable
      data={data}
      showActions={false}
      
    />
  );
};

export default LeaveRequest;
