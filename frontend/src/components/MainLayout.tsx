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
    <div className="layout-container">
      {/* Header */}
      <header className="layout-header">
        <div className="header-left">
          <Link to={PATHS.PRIVATE.DASHBOARD} className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">SyncNote</span>
          </Link>
        </div>

        <nav className="header-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
                title={item.name}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header-right">
          <button className="header-btn">🔔</button>
          <button className="header-btn">⚙️</button>
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

      {/* Main Content */}
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};
