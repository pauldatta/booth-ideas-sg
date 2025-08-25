import React, { useState } from 'react';

const SightingForm = () => {
  const [enclosure, setEnclosure] = useState('');
  const [species, setSpecies] = useState('');
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="enclosure" className="block text-sm font-medium">Enclosure</label>
        <input
          type="text"
          id="enclosure"
          value={enclosure}
          onChange={(e) => setEnclosure(e.target.value)}
          className="w-full p-2 mt-1 text-black bg-gray-200 rounded"
        />
      </div>
      <div>
        <label htmlFor="species" className="block text-sm font-medium">Species</label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full p-2 mt-1 text-black bg-gray-200 rounded"
        />
      </div>
      <div>
        <label htmlFor="count" className="block text-sm font-medium">Count</label>
        <input
          type="number"
          id="count"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full p-2 mt-1 text-black bg-gray-200 rounded"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 mt-1 text-black bg-gray-200 rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default SightingForm;
