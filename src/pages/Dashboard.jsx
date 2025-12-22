import DashboardLayout from "../layout/DashboardLayout";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/Dashboard.css";

import {
  FiTrendingUp,
  FiBarChart2,
  FiActivity,
  FiPieChart,
} from "react-icons/fi";

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const [counts, setCounts] = useState({
    blogs: 0,
    banners: 0,
    testimonials: 0,
    services: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard-counts/counts")
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch((err) => console.error("Dashboard count error:", err));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold mb-8 text-black">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatsCard
          icon={<FiTrendingUp size={50} className="text-blue-500" />}
          label="Blogs"
          count={counts.blogs}
        />
        <StatsCard
          icon={<FiBarChart2 size={50} className="text-blue-500" />}
          label="Banners"
          count={counts.banners}
        />
        <StatsCard
          icon={<FiActivity size={50} className="text-blue-500" />}
          label="Testimonials"
          count={counts.testimonials}
        />
        <StatsCard
          icon={<FiPieChart size={50} className="text-blue-500" />}
          label="Services"
          count={counts.services}
        />
      </div>

      <div className="custom-calendar-container">
        <div className="custom-calendar-header">
          <h2>Calendar</h2>
          <button>Show All</button>
        </div>

        <Calendar onChange={setDate} value={date} className="custom-calendar" />
      </div>
    </DashboardLayout>
  );
}

function StatsCard({ icon, label, count }) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        {icon}
        <div className="text-left">
          <p className="text-gray-600 text-md">{label}</p>
          <p className="text-2xl font-bold text-black">{count}</p>
        </div>
      </div>
    </div>
  );
}
