import React from "react";
import "../styles/dashboard.css";

interface Note {
  id: string;
  title: string;
  preview: string;
  updatedAt: Date;
  sharedWith: number;
}

interface Stat {
  label: string;
  value: number;
  icon: string;
  color: string;
}

const DashboardPage: React.FC = () => {
  const recentNotes: Note[] = [
    {
      id: "1",
      title: "Project Kickoff Meeting",
      preview: "Discussion about the new project timeline and deliverables...",
      updatedAt: new Date(),
      sharedWith: 2,
    },
    {
      id: "2",
      title: "React Learning Notes",
      preview: "Key concepts: Hooks, Context API, Performance optimization...",
      updatedAt: new Date(Date.now() - 86400000),
      sharedWith: 0,
    },
    {
      id: "3",
      title: "Personal Goals Q2",
      preview: "Health, Career, Personal Development objectives...",
      updatedAt: new Date(Date.now() - 172800000),
      sharedWith: 1,
    },
  ];

  const stats: Stat[] = [
    { label: "Total Notes", value: 24, icon: "📝", color: "#6366f1" },
    { label: "Shared Notes", value: 8, icon: "👥", color: "#10b981" },
    { label: "Folders", value: 5, icon: "📁", color: "#f59e0b" },
    { label: "Collaborators", value: 12, icon: "🤝", color: "#3b82f6" },
  ];

  const recentActivity = [
    {
      action: "Created",
      item: "Project Kickoff Meeting",
      time: "Today at 2:30 PM",
    },
    {
      action: "Shared",
      item: "Q2 Roadmap with John",
      time: "Yesterday at 10:15 AM",
    },
    { action: "Updated", item: "Team Meeting Notes", time: "2 days ago" },
    { action: "Created", item: "Design System Guidelines", time: "3 days ago" },
  ];

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
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1>Welcome back! 👋</h1>
          <p>You have 3 new updates from your collaborators</p>
        </div>
        <button className="btn btn-primary">
          <span>+</span> Create New Note
        </button>
      </section>

      {/* Stats Grid */}
      <section className="dashboard-stats">
        <h2>Overview</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div
                className="stat-icon"
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Notes */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Notes</h2>
          <a href="/notes" className="view-all-link">
            View all →
          </a>
        </div>

        <div className="recent-notes">
          {recentNotes.map((note) => (
            <div key={note.id} className="recent-note-item">
              <div className="note-item-left">
                <h4>{note.title}</h4>
                <p>{note.preview}</p>
                <span className="note-date">{formatDate(note.updatedAt)}</span>
              </div>
              <div className="note-item-right">
                {note.sharedWith > 0 && (
                  <span className="shared-badge">👥 {note.sharedWith}</span>
                )}
                <button className="more-btn">⋮</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <a href="#" className="view-all-link">
            View all →
          </a>
        </div>

        <div className="activity-feed">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.action === "Created" && "✨"}
                {activity.action === "Shared" && "🔗"}
                {activity.action === "Updated" && "✏️"}
              </div>
              <div className="activity-content">
                <p className="activity-text">
                  <strong>{activity.action}</strong> <em>{activity.item}</em>
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <button className="action-card">
            <span className="action-icon">📝</span>
            <p>New Note</p>
          </button>
          <button className="action-card">
            <span className="action-icon">📁</span>
            <p>New Folder</p>
          </button>
          <button className="action-card">
            <span className="action-icon">👥</span>
            <p>Share with Others</p>
          </button>
          <button className="action-card">
            <span className="action-icon">📊</span>
            <p>View Stats</p>
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
