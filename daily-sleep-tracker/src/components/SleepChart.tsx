
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockSleepData = [
  { date: '2025-08-17', duration: 7.1 },
  { date: '2025-08-18', duration: 8.2 },
  { date: '2025-08-19', duration: 6.8 },
  { date: '2025-08-20', duration: 7.5 },
];

const SleepChart = () => {
  const data = {
    labels: mockSleepData.map(entry => entry.date),
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: mockSleepData.map(entry => entry.duration),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Sleep Pattern</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SleepChart;
