import { useAppStore } from "../../store/useAppStore";
import { useState } from "react";

export default function NotesPage() {
  // 1. Grab exactly what you need from the store using selectors
  const username = useAppStore((state) => state.username);
  const notes = useAppStore((state) => state.notes);
  const addNote = useAppStore((state) => state.addNote);
  const clearNotes = useAppStore((state) => state.clearNotes);

  // Local state just for the input text box
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addNote(text); // Fire store action
    setText(""); // Clear local input
  };

  return (
    <div className="p-6 space-y-6 max-w-md bg-slate-900 border border-slate-800 rounded-xl">
      <div>
        <h2 className="text-xl font-bold text-white">Developer: {username}</h2>
        <p className="text-slate-400 text-xs">
          Learning state manipulation basics
        </p>
      </div>

      {/* Input controls */}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a test entry..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-[#ff5b04] text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
        >
          Add
        </button>
      </div>

      {/* Render the data list */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Store Array Count: {notes.length}
        </h3>

        {notes.length === 0 ? (
          <p className="text-slate-600 text-sm italic">
            Array is currently empty.
          </p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}
      </div>

      {notes.length > 0 && (
        <button
          onClick={clearNotes}
          className="text-xs text-rose-400 hover:underline block"
        >
          Reset Store Array
        </button>
      )}
    </div>
  );
}
