import React, { useState } from "react";

interface ShareModalProps {
  noteTitle: string;
  onClose: () => void;
}

interface SharedUser {
  id: string;
  email: string;
  permission: "view" | "edit";
}

const ShareModal: React.FC<ShareModalProps> = ({ noteTitle, onClose }) => {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState<"view" | "edit">("view");
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([
    { id: "1", email: "john@example.com", permission: "edit" },
    { id: "2", email: "sarah@example.com", permission: "view" },
  ]);

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSharedUsers([
        ...sharedUsers,
        { id: Date.now().toString(), email, permission },
      ]);
      setEmail("");
    }
  };

  const handleRemoveShare = (userId: string) => {
    setSharedUsers(sharedUsers.filter((user) => user.id !== userId));
  };

  const handlePermissionChange = (
    userId: string,
    newPermission: "view" | "edit",
  ) => {
    setSharedUsers(
      sharedUsers.map((user) =>
        user.id === userId ? { ...user, permission: newPermission } : user,
      ),
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Share "{noteTitle}"</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleShare} className="share-form">
            <div className="form-group">
              <label>Share with email</label>
              <div className="share-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="form-control"
                />
                <select
                  value={permission}
                  onChange={(e) =>
                    setPermission(e.target.value as "view" | "edit")
                  }
                  className="form-control"
                >
                  <option value="view">View</option>
                  <option value="edit">Edit</option>
                </select>
                <button type="submit" className="btn btn-primary">
                  Share
                </button>
              </div>
            </div>
          </form>

          <div className="shared-list">
            <h3>Shared with ({sharedUsers.length})</h3>
            {sharedUsers.map((user) => (
              <div key={user.id} className="shared-item">
                <div className="shared-info">
                  <span className="user-avatar">👤</span>
                  <div>
                    <p className="user-email">{user.email}</p>
                    <p className="user-permission">
                      <select
                        value={user.permission}
                        onChange={(e) =>
                          handlePermissionChange(
                            user.id,
                            e.target.value as "view" | "edit",
                          )
                        }
                        className="permission-select"
                      >
                        <option value="view">Can view</option>
                        <option value="edit">Can edit</option>
                      </select>
                    </p>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveShare(user.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="share-link">
            <h3>Share link</h3>
            <div className="link-input-group">
              <input
                type="text"
                value="https://sync-note.app/share/abc123def456"
                readOnly
                className="form-control"
              />
              <button className="btn btn-secondary">📋 Copy</button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
