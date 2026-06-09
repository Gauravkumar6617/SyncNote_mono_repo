import { Outlet, Link, useLocation } from "react-router-dom";
import { PATHS } from "../routes/path";
import "../styles/layout.css";

export const MainLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: PATHS.PRIVATE.DASHBOARD, icon: "📊" },
    { name: "Notes", path: PATHS.PRIVATE.NOTES, icon: "📝" },
    { name: "Shared", path: PATHS.PRIVATE.SHARED_NOTES, icon: "👥" },
  ];

  return (
    <div className="layout-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <Link to={PATHS.PRIVATE.DASHBOARD} className="sidebar-logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">SyncNote</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? "active" : ""}`}
                title={item.name}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="new-note-btn">+ New Note</button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <input
              className="search-input"
              placeholder="Search notes, folders, tags..."
            />
          </div>
          <div className="topbar-right">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">⚙️</button>
            <div className="profile-menu">
              <button className="profile-btn">👤</button>
              <div className="profile-dropdown">
                <a href="#profile">Profile</a>
                <a href="#settings">Settings</a>
                <a href="#logout">Logout</a>
              </div>
            </div>
          </div>
        </header>

        <main className="layout-main">
          <div className="content-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
