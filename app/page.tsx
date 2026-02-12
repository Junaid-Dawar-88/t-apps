import React from "react"
import StudentsWidget from "./students-widget"
import TeachersWidget from "./teachers-widget"
import RecentActivity from "./recent-activity"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-10 shadow-xl mb-10">
        <h1 className="text-4xl font-bold mb-2">Welcome to Dawaloom</h1>
        <p className="text-blue-100 text-lg">Smart Teacher & Student Management System</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <StudentsWidget />
        <TeachersWidget showCount />
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <p className="text-slate-500 font-medium">Active Classes</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">8</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <p className="text-slate-500 font-medium">Attendance Today</p>
          <h2 className="text-4xl font-bold text-orange-500 mt-2">145</h2>
        </div>
      </div>

      {/* Top Teachers + Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Top Teachers</h2>
          <TeachersWidget showTop={4} />
        </div>
        <RecentActivity />
      </div>

    </div>
  )
}