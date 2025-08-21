import { h } from 'preact';
import { useState } from 'preact/hooks';
import StickyNote from './StickyNote';

interface Note {
  id: number;
  text: string;
  color: string;
}

const colors = ['#ffc', '#cfc', '#ccf', '#fcc', '#cff', '#fcf'];

const Canvas = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [notePositions, setNotePositions] = useState<{ [key: number]: { x: number; y: number } }>({});

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: 'New Note',
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setNotes([...notes, newNote]);
    setNotePositions({
      ...notePositions,
      [newNote.id]: { x: Math.random() * 200, y: Math.random() * 200 },
    });
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    const newPositions = { ...notePositions };
    delete newPositions[id];
    setNotePositions(newPositions);
  };

  const updateNote = (id: number, text: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };

  const handleDragStart = (e: h.JSX.TargetedMouseEvent<HTMLDivElement>, id: number) => {
    const noteElement = e.currentTarget as HTMLDivElement;
    const startX = e.clientX - noteElement.offsetLeft;
    const startY = e.clientY - noteElement.offsetTop;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      setNotePositions((prevPositions) => ({
        ...prevPositions,
        [id]: { x: newX, y: newY },
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <button
        className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addNote}
      >
        Add Note
      </button>
      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute"
          style={{
            left: `${notePositions[note.id]?.x || 0}px`,
            top: `${notePositions[note.id]?.y || 0}px`,
          }}
          onMouseDown={(e) => handleDragStart(e, note.id)}
        >
          <StickyNote
            id={note.id}
            text={note.text}
            color={note.color}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
