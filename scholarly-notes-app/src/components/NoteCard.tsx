import React from 'react';

interface NoteCardProps {
  title: string;
  excerpt: string;
  subject: string;
}

export default function NoteCard({ title, excerpt, subject }: NoteCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <span className="text-sm font-semibold text-gray-500">{subject}</span>
    </div>
  );
}
