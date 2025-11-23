import React, { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign in to Emmanuel&apos;s Bank</h2>
        <p style={styles.subtitle}>
          Enter your credentials to access your dashboard.
        </p>

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.switchText}>
          New here?{" "}
          <Link to="/register" style={styles.link}>
            Create an account
          </Link>
        </p>

        <button style={styles.backHome} onClick={() => navigate("/")}>
          ← Back to welcome
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #1f2937 0, #020617 50%, #000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(17,24,39,0.98))",
    borderRadius: "18px",
    padding: "28px 26px",
    color: "#e5e7eb",
    boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
    border: "1px solid rgba(148,163,184,0.5)",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#facc15",
    marginBottom: "4px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "14px",
  },
  label: {
    fontSize: "13px",
    color: "#e5e7eb",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(75,85,99,0.9)",
    background: "rgba(15,23,42,0.9)",
    color: "#f9fafb",
    fontSize: "14px",
    outline: "none",
  },
  button: {
    marginTop: "10px",
    padding: "11px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #f97316 0%, #facc15 50%, #f97316 100%)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  switchText: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "6px",
  },
  link: {
    color: "#facc15",
    textDecoration: "none",
    fontWeight: 500,
  },
  backHome: {
    marginTop: "4px",
    fontSize: "12px",
    color: "#9ca3af",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
