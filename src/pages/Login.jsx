import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, resetPassword } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import "../styles/Footer.css";  

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false); // ✅ Toggle reset form
  const [newPassword, setNewPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(credentials);

      if (response?.data?.status === "success") {
        login({ username: credentials.username });
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("❌ Login failed:", error);
      setError("Invalid username or password.");
    }

    setLoading(false);
  };

  // ✅ Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!credentials.username || !newPassword) {
      setError("Please enter username and new password");
      return;
    }

    try {
      await resetPassword({ username: credentials.username, newPassword });
      alert("✅ Password reset successful. Please login with new password.");
      setShowReset(false);
      setNewPassword("");
    } catch (error) {
      console.error("❌ Password reset failed:", error);
      setError("Password reset failed. User not found.");
    }
  };

  return (
    <>
    <div className="login-container">
      <h2>{showReset ? "Reset Password" : "Login"}</h2>

      {!showReset ? (
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          {error && (
            <p className="error-message">
              {error}{" "}
              <span
                className="forgot-password-link"
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setShowReset(true)}
              >
                Forgot Password?
              </span>
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Reset Password</button>
          <button type="button" onClick={() => setShowReset(false)}>
            Back to Login
          </button>
        </form>
      )}
    </div>
    </>
  );
};

export default Login;
