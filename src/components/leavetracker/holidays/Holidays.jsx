import React, { useEffect, useState } from "react";
import apiService from "../../../api/apiService";
import { format } from "date-fns";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const FETCH_HOLIDAYS = "api/holidays/";

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token provided");
          return;
        }
        const response = await apiService.fetchInstance(FETCH_HOLIDAYS);
        setHolidays(response.data || []);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Holidays</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Holiday Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Holiday Date</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 border-t text-sm text-gray-700">{holiday.holiday_name}</td>
                <td className="px-6 py-4 border-t text-sm text-gray-700">
                  {format(new Date(holiday.holiday_date), 'MMM dd, yyyy')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
