import React, { useState } from "react";
import "../styles/notes.css";
import NoteCard from "../components/NoteCard";
import NoteFilters from "../components/NoteFilters";

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

const NotesListPage: React.FC = () => {
  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Project Kickoff Meeting",
      content: "Discussion about the new project timeline and deliverables...",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ["work", "meeting"],
      folder: "Work",
      sharedWith: 2,
    },
    {
      id: "2",
      title: "React Learning Notes",
      content: "Key concepts: Hooks, Context API, Performance optimization...",
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
      tags: ["learning", "react"],
      folder: "Development",
      sharedWith: 0,
    },
    {
      id: "3",
      title: "Personal Goals Q2",
      content: "Health, Career, Personal Development objectives...",
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date(Date.now() - 172800000),
      tags: ["personal", "goals"],
      folder: "Personal",
      sharedWith: 1,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const folders = ["All", "Work", "Development", "Personal", "Ideas"];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder =
      selectedFolder === "All" || note.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="notes-container">
      <div className="notes-header">
        <div className="header-top">
          <h1>My Notes</h1>
          <button className="btn btn-primary">
            <span>+</span> New Note
          </button>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="notes-main">
        <aside className="notes-sidebar">
          <NoteFilters
            folders={folders}
            selectedFolder={selectedFolder}
            onFolderChange={setSelectedFolder}
          />
        </aside>

        <main className="notes-content">
          <div className="notes-toolbar">
            <div className="toolbar-left">
              <span className="note-count">{filteredNotes.length} notes</span>
            </div>
            <div className="toolbar-right">
              <button
                className={`view-toggle ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid view"
              >
                ⊞
              </button>
              <button
                className={`view-toggle ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List view"
              >
                ☰
              </button>
            </div>
          </div>

          <div
            className={`notes-grid ${viewMode === "list" ? "list-view" : ""}`}
          >
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} viewMode={viewMode} />
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>No notes yet</h3>
                <p>Create your first note to get started</p>
                <button className="btn btn-primary">Create Note</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesListPage;
