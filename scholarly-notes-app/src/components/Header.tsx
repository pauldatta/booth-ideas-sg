import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">ScholarlyNotes</h1>
      <nav>
        <a href="/" className="px-3 py-2 rounded hover:bg-gray-700">Home</a>
        <a href="/subjects" className="px-3 py-2 rounded hover:bg-gray-700">Subjects</a>
        <a href="/settings" className="px-3 py-2 rounded hover:bg-gray-700">Settings</a>
      </nav>
    </header>
  );
}
