import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { supabase } from '../SupabaseClient'; // Adjust the import path accordingly
import { format } from 'date-fns'; // Import date-fns for date formatting

// Register required components with Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function SnippetsChart() {
  const [snippets, setSnippets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        // Fetch data from Supabase
        const response = await supabase
          .from('Code Snippets')
          .select('id, title, subtitle, prod_enabled, created_at')
          .eq('prod_enabled', true) // Only fetch snippets with prod_enabled = true
          .order('created_at', { ascending: true });

        if (response.error) {
          throw response.error;
        }

        setSnippets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  // Group and count snippets by month
  const labels = snippets.map(snippet => format(new Date(snippet.created_at), 'MMMM yyyy'));
  const dataCounts = labels.reduce((acc, month) => {
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Prepare the chart data
  const chartData = {
    labels: Object.keys(dataCounts),
    datasets: [
      {
        label: 'Code Snippets Count',
        data: Object.values(dataCounts),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
      },
    ],
  };

  // Customize the chart options, including tooltips
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true, // This is the default
        callbacks: {
          // Customize the tooltip content
          label: (tooltipItem) => {
            return `Count: ${tooltipItem.formattedValue}`;
          },
        },
      },
    },
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Code Snippets Dashboard</h2>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default SnippetsChart;