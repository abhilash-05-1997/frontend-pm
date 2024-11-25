import React from "react";

const Dashboard = () => {
  const cards = [
    { title: "Birthday", content: "No birthdays today" },
    { title: "New Hires", content: "No New Joinees in past 15 days." },
    { title: "Favorites", content: "No Favorites found." },
    { title: "Quick Links", content: "No quick links" },
    { title: "Announcements", content: "No Announcement" },
    { title: "Leave Report", content: "Leave Without Pay\nPersonal Leave - Available 3 Day(s)\nSick Leave - Available 2 Day(s)\nWork From Home - Available 5 Day(s)" },
    { title: "Upcoming Holidays", content: "No upcoming holidays" },
    { title: "My Pending Tasks", content: "No pending tasks" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-4 bg-white border rounded shadow-sm"
        >
          <h2 className="text-lg font-bold">{card.title}</h2>
          <p className="text-gray-500 whitespace-pre-line">{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
