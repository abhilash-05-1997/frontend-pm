import React, { useState, useEffect } from "react";
import apiService from "../../../api/apiService";

const Reportees = () => {
  const [reporteesData, setReporteesData] = useState({});

  useEffect(() => {
    fetchReporteesData();
  }, []);

  const fetchReporteesData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      const response = await apiService.fetchInstance(
        "api/reportees/leave-balances/"
      );
      console.log("response ", response);

      // Grouping the data by reportee name
      const groupedData = response.data.reduce((acc, current) => {
        const {
          reportee_first_name,
          reportee_last_name,
          leave_type,
          total_taken,
          remaining_balance,
          on_leave_today,
        } = current;
        const reportee = `${reportee_first_name} ${reportee_last_name}`;

        // Initialize reportee data if not already present
        if (!acc[reportee]) {
          acc[reportee] = {
            leave_details: [], // Ensure leave_details is always initialized as an empty array
            on_leave_today: false, // Track if on leave today
          };
        }

        // Add leave type details for the reportee
        acc[reportee].leave_details.push({
          leave_type,
          total_taken,
          remaining_balance,
        });

        // Check if the reportee is on leave today
        if (on_leave_today) {
          acc[reportee].on_leave_today = true;
        }

        return acc;
      }, {});

      setReporteesData(groupedData);
    } catch (error) {
      console.error("Error fetching reportees:", error);
      alert("Failed to fetch reportees. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
        Reportees
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {Object.keys(reporteesData).map((reportee, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
              {reportee} -   
              <span
                className={`text-lg ${
                  reporteesData[reportee].on_leave_today
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {reporteesData[reportee].on_leave_today
                  ? "On Leave"
                  : "Available"}
              </span>
            </h3>

            <ul className="list-disc ml-4 text-gray-600">
              {(reporteesData[reportee].leave_details || []).map(
                (leave, leaveIndex) => (
                  <li key={leaveIndex} className="mb-2">
                    <span className="font-bold">{leave.leave_type}:</span> Total
                    Taken -{" "}
                    <span className="font-semibold">{leave.total_taken}</span>,
                    Remaining -{" "}
                    <span className="font-semibold">
                      {leave.remaining_balance}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportees;
