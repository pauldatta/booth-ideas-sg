import { h } from 'preact';
import { useState } from 'preact/hooks';

interface StickyNoteProps {
  id: number;
  text: string;
  color: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

const StickyNote = ({ id, text, color, onDelete, onUpdate }: StickyNoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(id, noteText);
  };

  const handleChange = (e: h.JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    if (e.currentTarget instanceof HTMLTextAreaElement) {
      setNoteText(e.currentTarget.value);
    }
  };

  return (
    <div
      className={`relative p-4 rounded-lg shadow-md w-64 h-64 flex flex-col`}
      style={{ backgroundColor: color }}
      onDblClick={handleDoubleClick}
    >
      <button
        className="absolute top-2 right-2 text-black hover:text-gray-800"
        onClick={() => onDelete(id)}
      >
        &times;
      </button>
      {isEditing ? (
        <textarea
          className="w-full h-full bg-transparent border-none focus:outline-none resize-none"
          value={noteText}
          onInput={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div className="w-full h-full whitespace-pre-wrap">{noteText}</div>
      )}
    </div>
  );
};

export default StickyNote;
