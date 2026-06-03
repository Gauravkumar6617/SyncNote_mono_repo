import React, { useState } from "react";
import "../styles/shared-notes.css";
import NoteCard from "../components/NoteCard";

interface SharedNote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  folder: string;
  sharedWith: number;
  sharedBy: string;
  permission: "view" | "edit";
}

const SharedNotesPage: React.FC = () => {
  const [sharedNotes] = useState<SharedNote[]>([
    {
      id: "1",
      title: "Q2 Project Roadmap",
      content: "Project timeline and milestones for Q2...",
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
      tags: ["work", "roadmap"],
      folder: "Projects",
      sharedWith: 3,
      sharedBy: "John Doe",
      permission: "edit",
    },
    {
      id: "2",
      title: "Team Meeting Notes",
      content: "Discussion points from today's standup...",
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000),
      tags: ["meeting", "team"],
      folder: "Meetings",
      sharedWith: 5,
      sharedBy: "Sarah Smith",
      permission: "view",
    },
    {
      id: "3",
      title: "Design System Guidelines",
      content: "UI components, typography, colors...",
      createdAt: new Date(Date.now() - 259200000),
      updatedAt: new Date(Date.now() - 259200000),
      tags: ["design", "guidelines"],
      folder: "Design",
      sharedWith: 4,
      sharedBy: "Mike Johnson",
      permission: "view",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "editable">("all");

  const filteredNotes = sharedNotes.filter((note) => {
    if (filter === "editable") {
      return note.permission === "edit";
    }
    return true;
  });

  return (
    <div className="shared-notes-container">
      <div className="shared-header">
        <h1>📤 Shared with me</h1>
        <p>Notes that others have shared with you</p>
      </div>

      <div className="shared-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({sharedNotes.length})
        </button>
        <button
          className={`filter-btn ${filter === "editable" ? "active" : ""}`}
          onClick={() => setFilter("editable")}
        >
          Editable ({sharedNotes.filter((n) => n.permission === "edit").length})
        </button>
      </div>

      <div className="shared-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="shared-card-wrapper">
              <NoteCard note={note} viewMode="grid" />
              <div className="shared-info-bar">
                <span className="shared-by">👤 Shared by {note.sharedBy}</span>
                <span className={`permission-badge ${note.permission}`}>
                  {note.permission === "edit" ? "✏️ Can edit" : "👁️ Can view"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No shared notes</h3>
            <p>Notes shared with you will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedNotesPage;
