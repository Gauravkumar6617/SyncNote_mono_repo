import React, { useState } from "react";
import "../styles/auth.css";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // API call would go here
      console.log("Login attempt:", formData);
      // Mock successful login - navigate to dashboard
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>SyncNote</h1>
          <p>Collaborate smarter, write better</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Welcome Back</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
          <p>
            <a href="#">Forgot password?</a>
          </p>
        </div>

        <div className="oauth-section">
          <div className="divider">Or continue with</div>
          <div className="oauth-buttons">
            <button className="oauth-btn google-btn">
              <span>🔷</span> Google
            </button>
            <button className="oauth-btn github-btn">
              <span>⚫</span> GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
