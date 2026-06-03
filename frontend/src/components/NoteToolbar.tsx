import React from "react";

interface NoteData {
  id: string;
  title: string;
  folder: string;
}

interface NoteToolbarProps {
  note: NoteData;
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
}

const NoteToolbar: React.FC<NoteToolbarProps> = ({
  note,
  isSaved,
  onSave,
  onShare,
}) => {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-left">
        <button className="back-btn">← Back</button>
        <span className="current-note">📝 {note.title}</span>
      </div>

      <div className="toolbar-right">
        <button
          className={`btn btn-small ${isSaved ? "" : "unsaved"}`}
          onClick={onSave}
        >
          {isSaved ? "✓ Saved" : "⚪ Unsaved"}
        </button>
        <button className="btn btn-secondary btn-small" onClick={onShare}>
          🔗 Share
        </button>
        <button className="btn btn-secondary btn-small">⋮</button>
      </div>
    </div>
  );
};

export default NoteToolbar;
