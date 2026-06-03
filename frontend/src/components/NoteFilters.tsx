import React from "react";

interface NoteFilterProps {
  folders: string[];
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
}

const NoteFilters: React.FC<NoteFilterProps> = ({
  folders,
  selectedFolder,
  onFolderChange,
}) => {
  return (
    <div className="filters">
      <h3>Folders</h3>
      <div className="folder-list">
        {folders.map((folder) => (
          <button
            key={folder}
            className={`folder-btn ${selectedFolder === folder ? "active" : ""}`}
            onClick={() => onFolderChange(folder)}
          >
            <span className="folder-icon">📁</span>
            {folder}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: "2rem" }}>Tags</h3>
      <div className="tags-list">
        <button className="tag-btn">work</button>
        <button className="tag-btn">meeting</button>
        <button className="tag-btn">learning</button>
        <button className="tag-btn">react</button>
        <button className="tag-btn">personal</button>
        <button className="tag-btn">goals</button>
      </div>

      <h3 style={{ marginTop: "2rem" }}>Shared with me</h3>
      <button className="sidebar-link">
        <span>👥</span> View shared notes
      </button>
    </div>
  );
};

export default NoteFilters;
