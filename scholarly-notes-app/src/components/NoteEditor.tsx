import React from 'react';

export default function NoteEditor() {
  return (
    <div>
      <textarea
        className="w-full h-96 p-4 border rounded-lg"
        placeholder="Start writing your note..."
      ></textarea>
    </div>
  );
}
