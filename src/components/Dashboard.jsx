// Dashboard.js
import React from 'react';
import SnippetsChart from './Charts/SnippetsChart';
import UsersChart from './Charts/UsersChart';


function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="chart-container">
        <SnippetsChart />
        <UsersChart />

      </div>
    </div>
  );
}

export default Dashboard;