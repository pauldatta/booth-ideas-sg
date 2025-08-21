
import React, { useState } from 'react';

const SleepLogger = () => {
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // for example, by sending the data to a server or storing it locally.
    console.log({ date, duration });
    alert(`Sleep logged for ${date}: ${duration} hours`);
    setDate('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }}>
      <h2>Log Your Sleep</h2>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Duration (in hours):
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required min="0" max="24" step="0.1" />
      </label>
      <button type="submit">Log Sleep</button>
    </form>
  );
};

export default SleepLogger;
