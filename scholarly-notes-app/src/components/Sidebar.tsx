import React from 'react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Subjects</h2>
      <ul>
        <li><a href="/subjects/history" className="block py-2 px-4 rounded hover:bg-gray-200">History</a></li>
        <li><a href="/subjects/math" className="block py-2 px-4 rounded hover:bg-gray-200">Math</a></li>
        <li><a href="/subjects/science" className="block py-2 px-4 rounded hover:bg-gray-200">Science</a></li>
      </ul>
    </aside>
  );
}
