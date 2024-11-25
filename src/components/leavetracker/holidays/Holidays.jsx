import React, { useEffect, useState } from "react";
import apiService from "../../../api/apiService";

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

  return(
    <>
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Holidays</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Holiday Name</th>
              <th className="px-4 py-2 border-b text-left">Holiday Date</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id}>
                <td className="px-4 py-2 border-b">{holiday.holiday_name}</td>
                <td className="px-4 py-2 border-b">{holiday.holiday_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );;
};

export default Holidays;
