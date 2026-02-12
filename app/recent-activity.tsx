"use client"

import React from "react"

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md h-fit">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Recent Activity</h2>
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-2 bg-green-500 rounded-full"></div>
          <p className="text-slate-600 text-sm">New teacher added</p>
        </div>
        <div className="flex gap-3">
          <div className="w-2 bg-blue-500 rounded-full"></div>
          <p className="text-slate-600 text-sm">Student attendance updated</p>
        </div>
        <div className="flex gap-3">
          <div className="w-2 bg-purple-500 rounded-full"></div>
          <p className="text-slate-600 text-sm">New class scheduled</p>
        </div>
        <div className="flex gap-3">
          <div className="w-2 bg-orange-400 rounded-full"></div>
          <p className="text-slate-600 text-sm">Teacher profile updated</p>
        </div>
      </div>
    </div>
  )
}