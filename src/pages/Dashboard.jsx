import api from "../api/axiosClient";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div style={styles.page}>
      <NavBar />

      <main style={styles.main}>
        <section style={styles.hero}>
          <div>
            <h1 style={styles.title}>Welcome back 👋</h1>
            <p style={styles.subtitle}>
              Manage accounts, move money, and inspect transaction history —
              all inside your sandbox banking dashboard.
            </p>
          </div>
        </section>

        <section style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Accounts</h3>
            <p style={styles.cardText}>
              View all of your chequing and savings accounts and open new ones.
            </p>
            <div style={styles.cardActions}>
              <Link to="/accounts" style={styles.primaryBtn}>
                View accounts
              </Link>
              <Link to="/accounts/create" style={styles.secondaryBtn}>
                Open new account
              </Link>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Money Movement</h3>
            <p style={styles.cardText}>
              Deposit, withdraw, and transfer between accounts in real time.
            </p>
            <div style={styles.cardActions}>
              <Link to="/transfer" style={styles.primaryBtn}>
                Transfer center
              </Link>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Transactions</h3>
            <p style={styles.cardText}>
              Drill into transaction history by account to see a full audit
              trail.
            </p>
            <div style={styles.cardActions}>
              <Link to="/accounts" style={styles.secondaryBtn}>
                Select account
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #020617 0, #000 55%)",
    color: "#e5e7eb",
  },
  main: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px 20px 40px",
  },
  hero: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#facc15",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    maxWidth: "620px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
    marginTop: "16px",
  },
  card: {
    background: "rgba(15,23,42,0.95)",
    borderRadius: "16px",
    padding: "18px 16px",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "6px",
  },
  cardText: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "14px",
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #f97316 0%, #facc15 50%, #f97316 100%)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "13px",
    textDecoration: "none",
  },
  secondaryBtn: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.9)",
    background: "transparent",
    color: "#e5e7eb",
    fontWeight: 500,
    fontSize: "13px",
    textDecoration: "none",
  },
};

export default Dashboard;
