import React from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  folder: string;
  sharedWith: number;
}

interface NoteCardProps {
  note: Note;
  viewMode: "grid" | "list";
}

const NoteCard: React.FC<NoteCardProps> = ({ note, viewMode }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`note-card ${viewMode === "list" ? "list-item" : ""}`}>
      <div className="note-card-header">
        <h3>{note.title}</h3>
        <button className="note-menu-btn">⋮</button>
      </div>

      <p className="note-preview">{note.content}</p>

      <div className="note-tags">
        {note.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="note-footer">
        <div className="note-meta">
          <span className="folder-label">📁 {note.folder}</span>
          <span className="date-label">{formatDate(note.updatedAt)}</span>
        </div>
        {note.sharedWith > 0 && (
          <div className="shared-indicator">
            <span>👥 {note.sharedWith}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
