import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "../components/NavBar";

function TransferCenter() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main}>
        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to dashboard
        </button>

        <h2 style={styles.title}>Money Movement</h2>
        <p style={styles.subtitle}>
          Move money between accounts: deposit, withdraw, or transfer to
          another account.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Deposit</h3>
            <p style={styles.cardText}>
              Add funds into one of your existing accounts.
            </p>
            <Link to="/transfer/deposit" style={styles.primaryBtn}>
              Go to deposit
            </Link>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Withdraw</h3>
            <p style={styles.cardText}>
              Simulate taking money out of an account with balance validation.
            </p>
            <Link to="/transfer/withdraw" style={styles.primaryBtn}>
              Go to withdraw
            </Link>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Transfer</h3>
            <p style={styles.cardText}>
              Send funds between your own accounts with a full transaction log.
            </p>
            <Link to="/transfer/send" style={styles.primaryBtn}>
              Go to transfer
            </Link>
          </div>
        </div>
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
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "24px 20px 40px",
  },
  backBtn: {
    fontSize: "12px",
    color: "#9ca3af",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    marginBottom: "12px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#facc15",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(15,23,42,0.96)",
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
  primaryBtn: {
    display: "inline-block",
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
};

export default TransferCenter;
