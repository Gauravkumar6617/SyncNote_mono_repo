import React, { useState } from "react";
import "../styles/note-editor.css";
import NoteToolbar from "../components/NoteToolbar";
import ShareModal from "../components/ShareModal";

interface NoteData {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folder: string;
  createdAt: Date;
  updatedAt: Date;
}

const NoteEditorPage: React.FC = () => {
  const [note, setNote] = useState<NoteData>({
    id: "1",
    title: "Project Kickoff Meeting",
    content: `# Project Overview

This is our new project that aims to revolutionize note-taking.

## Key Points
- Real-time collaboration
- Rich text support
- Version history

## Next Steps
1. Finalize requirements
2. Set up development environment
3. Begin implementation

## Team Members
- John (Project Lead)
- Sarah (Designer)
- Mike (Developer)`,
    tags: ["work", "meeting"],
    folder: "Work",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [showShareModal, setShowShareModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const handleTitleChange = (newTitle: string) => {
    setNote((prev) => ({ ...prev, title: newTitle }));
    setIsSaved(false);
  };

  const handleContentChange = (newContent: string) => {
    setNote((prev) => ({ ...prev, content: newContent }));
    setIsSaved(false);
  };

  const handleSave = () => {
    console.log("Saving note:", note);
    setIsSaved(true);
  };

  return (
    <div className="note-editor-container">
      <NoteToolbar
        note={note}
        isSaved={isSaved}
        onSave={handleSave}
        onShare={() => setShowShareModal(true)}
      />

      <div className="editor-main">
        <div className="editor-content">
          <input
            type="text"
            className="editor-title"
            value={note.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Note title..."
          />

          <div className="editor-meta">
            <span className="folder-badge">📁 {note.folder}</span>
            <span className="created-date">
              Created {note.createdAt.toLocaleDateString()}
            </span>
          </div>

          <textarea
            className="editor-textarea"
            value={note.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start typing your note..."
          />

          <div className="editor-tags">
            <label>Tags:</label>
            <div className="tags-container">
              {note.tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  {tag}
                  <button
                    className="remove-tag"
                    onClick={() =>
                      setNote((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((t) => t !== tag),
                      }))
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
              <input
                type="text"
                className="tag-input"
                placeholder="Add tag..."
                onKeyPress={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    setNote((prev) => ({
                      ...prev,
                      tags: [...prev.tags, e.currentTarget.value],
                    }));
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>

        <aside className="editor-sidebar">
          <div className="sidebar-section">
            <h4>Note Details</h4>
            <div className="detail-item">
              <span className="label">Folder</span>
              <select value={note.folder} className="select-input">
                <option>Work</option>
                <option>Personal</option>
                <option>Development</option>
                <option>Ideas</option>
              </select>
            </div>
            <div className="detail-item">
              <span className="label">Created</span>
              <p>{note.createdAt.toLocaleString()}</p>
            </div>
            <div className="detail-item">
              <span className="label">Last Modified</span>
              <p>{note.updatedAt.toLocaleString()}</p>
            </div>
          </div>

          <div className="sidebar-section">
            <h4>Sharing</h4>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => setShowShareModal(true)}
            >
              🔗 Share Note
            </button>
          </div>

          <div className="sidebar-section">
            <h4>Actions</h4>
            <button className="btn btn-secondary btn-block">
              📋 Duplicate
            </button>
            <button className="btn btn-secondary btn-block">
              📜 View History
            </button>
            <button className="btn btn-danger btn-block">🗑️ Delete</button>
          </div>
        </aside>
      </div>

      {showShareModal && (
        <ShareModal
          noteTitle={note.title}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default NoteEditorPage;
