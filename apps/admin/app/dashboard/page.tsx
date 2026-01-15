'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, pendingContent: 0 });

  useEffect(() => {
    // Fetch stats from protected admin API
    fetch('http://localhost:4000/admin/stats', {
       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setStats(data));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Mission Control</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-4xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-500">Pending Approvals</h3>
          <p className="text-4xl font-bold">{stats.pendingContent}</p>
          <button className="mt-4 text-sm text-blue-600 hover:underline">
            Review Queue →
          </button>
        </div>
      </div>
    </div>
  );
}
