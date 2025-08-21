
import React from 'react';

const mockSleepData = [
  { date: '2025-08-20', duration: 7.5 },
  { date: '2025-08-19', duration: 6.8 },
  { date: '2025-08-18', duration: 8.2 },
  { date: '2025-08-17', duration: 7.1 },
];

const SleepHistory = () => {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Sleep History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid white', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Duration (hours)</th>
          </tr>
        </thead>
        <tbody>
          {mockSleepData.map((entry, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid white', padding: '8px' }}>{entry.date}</td>
              <td style={{ border: '1px solid white', padding: '8px' }}>{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SleepHistory;
