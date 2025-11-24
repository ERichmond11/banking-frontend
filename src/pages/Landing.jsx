import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Emmanuel&apos;s Bank</h1>
        <p style={styles.subtitle}>
          A modern banking sandbox to demo secure logins, account management,
          and money movement — built by Emmanuel Richmond.
        </p>

        <div style={styles.actions}>
          <button style={styles.primaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        <p style={styles.note}>
          This is a demo banking platform — no real money is moved. Perfect for
          showcasing full-stack engineering skills.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    color: "#e5e7eb",
  },
  card: {
    maxWidth: "520px",
    width: "100%",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.95), rgba(17,24,39,0.98))",
    borderRadius: "18px",
    padding: "32px 28px",
    boxShadow: "0 22px 60px rgba(0,0,0,0.65)",
    border: "1px solid rgba(148,163,184,0.4)",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#facc15",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#cbd5f5",
    marginBottom: "20px",
    lineHeight: 1.6,
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginBottom: "18px",
  },
  primaryBtn: {
    flex: 1,
    padding: "12px 0",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #f97316 0%, #facc15 50%, #f97316 100%)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  secondaryBtn: {
    flex: 1,
    padding: "12px 0",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.7)",
    background: "transparent",
    color: "#e5e7eb",
    fontWeight: 500,
    fontSize: "14px",
    cursor: "pointer",
  },
  note: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "6px",
  },
};

export default Landing;
