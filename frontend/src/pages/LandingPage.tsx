import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">📝</span>
            <span className="logo-text">SyncNote</span>
          </div>
          <div className="nav-buttons">
            <button
              className="nav-button nav-login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="nav-button nav-signup"
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Notes,
            <span className="gradient-text"> Perfectly Synced</span>
          </h1>
          <p className="hero-subtitle">
            Write, organize, and collaborate on notes seamlessly. Access your
            ideas anywhere, anytime with real-time synchronization.
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/register")}
            >
              Start for Free
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
          <p className="hero-note">✨ No credit card required</p>
        </div>

        <div className="hero-image">
          <div className="hero-card card-1">
            <div className="card-icon">📝</div>
            <div className="card-text">My Project Ideas</div>
          </div>
          <div className="hero-card card-2">
            <div className="card-icon">✓</div>
            <div className="card-text">Task List</div>
          </div>
          <div className="hero-card card-3">
            <div className="card-icon">💭</div>
            <div className="card-text">Quick Thoughts</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose SyncNote?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Instant synchronization across all your devices in real-time</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>End-to-end encryption keeps your notes safe and confidential</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Easy Collaboration</h3>
            <p>Share notes and collaborate with team members in real-time</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Organize with Ease</h3>
            <p>Create folders, tags, and organize notes exactly how you want</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Powerful Search</h3>
            <p>Find any note instantly with advanced search capabilities</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Multi-Device</h3>
            <p>Access your notes on web, mobile, and desktop applications</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <h2>Stay Organized. Stay Productive.</h2>
          <ul className="benefits-list">
            <li>
              <span className="checkmark">✓</span>
              Capture ideas as they come with quick note creation
            </li>
            <li>
              <span className="checkmark">✓</span>
              Never lose important information with automatic backups
            </li>
            <li>
              <span className="checkmark">✓</span>
              Share your knowledge with your team effortlessly
            </li>
            <li>
              <span className="checkmark">✓</span>
              Track changes and restore previous versions anytime
            </li>
          </ul>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/register")}
          >
            Create Your Free Account
          </button>
        </div>

        <div className="benefits-image">
          <div className="stats-card">
            <div className="stat">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-number">50M+</div>
              <div className="stat-label">Notes Created</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>Loved by Users Worldwide</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "SyncNote has completely changed how I manage my daily tasks. The
              sync feature is seamless!"
            </p>
            <div className="testimonial-author">
              <div className="avatar">JD</div>
              <div>
                <div className="author-name">John Doe</div>
                <div className="author-role">Product Manager</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "The collaboration features make teamwork incredibly easy. Highly
              recommended!"
            </p>
            <div className="testimonial-author">
              <div className="avatar">SA</div>
              <div>
                <div className="author-name">Sarah Anderson</div>
                <div className="author-role">Design Lead</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "The best note-taking app I've used. Simple, fast, and reliable."
            </p>
            <div className="testimonial-author">
              <div className="avatar">MJ</div>
              <div>
                <div className="author-name">Mike Johnson</div>
                <div className="author-role">Developer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users who are already syncing their notes</p>
        <div className="cta-buttons">
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/register")}
          >
            Sign Up Now
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/login")}
          >
            Already Have an Account?
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>SyncNote</h4>
            <p>Making note-taking effortless</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SyncNote. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
