import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Guenon', count: 12 },
  { name: 'Macaque', count: 19 },
  { name: 'Tamarin', count: 3 },
  { name: 'Marmoset', count: 5 },
  { name: 'Capuchin', count: 2 },
];

const Dashboard = () => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default Dashboard;
