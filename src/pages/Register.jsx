import React, { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Account created successfully. Please login.");
      navigate("/login");
    } catch (err) {
      alert("Unable to register. Email may already be in use.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create your account</h2>
        <p style={styles.subtitle}>
          Register a new profile to start using Emmanuel&apos;s Bank.
        </p>

        <form onSubmit={handleRegister} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Emmanuel Richmond"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            placeholder="Choose a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p style={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
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
    maxWidth: "460px",
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
      "linear-gradient(135deg, #22c55e 0%, #a3e635 50%, #22c55e 100%)",
    color: "#052e16",
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

export default Register;

