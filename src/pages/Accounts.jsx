import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import NavBar from "../components/NavBar";

function Accounts() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await api.get("/account/list");
        setAccounts(res.data);
      } catch (err) {
        console.error(err);
        alert("Unable to load accounts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  return (
    <div style={styles.page}>
      <NavBar />

      <main style={styles.main}>
        <div style={styles.headerRow}>
          <div>
            <h2 style={styles.title}>My Accounts</h2>
            <p style={styles.subtitle}>
              View balances, open new accounts, or drill into transactions.
            </p>
          </div>
          <button
            style={styles.createBtn}
            onClick={() => navigate("/accounts/create")}
          >
            + Open new account
          </button>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
          ← Back to dashboard
        </button>

        {loading ? (
          <p style={styles.info}>Loading accounts...</p>
        ) : accounts.length === 0 ? (
          <p style={styles.info}>No accounts yet. Create one to get started.</p>
        ) : (
          <div style={styles.list}>
            {accounts.map((acc) => (
              <div key={acc.account_id} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.chip}>{acc.account_type}</span>
                  <span style={styles.number}>#{acc.account_number}</span>
                </div>
                <div style={styles.balanceRow}>
                  <span style={styles.balanceLabel}>Balance</span>
                  <span style={styles.balanceValue}>
                    ${acc.balance.toFixed(2)}
                  </span>
                </div>
                <div style={styles.actions}>
                  <button
                    style={styles.primaryBtn}
                    onClick={() =>
                      navigate(`/transactions/${acc.account_id}`)
                    }
                  >
                    View transactions
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#facc15",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9ca3af",
  },
  createBtn: {
    padding: "9px 16px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #22c55e 0%, #a3e635 50%, #22c55e 100%)",
    color: "#052e16",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },
  backBtn: {
    marginTop: "4px",
    marginBottom: "16px",
    fontSize: "12px",
    color: "#9ca3af",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
  info: {
    fontSize: "13px",
    color: "#9ca3af",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "14px",
  },
  card: {
    background: "rgba(15,23,42,0.96)",
    borderRadius: "16px",
    padding: "16px 14px",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  chip: {
    fontSize: "12px",
    padding: "3px 8px",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.2)",
    border: "1px solid rgba(59,130,246,0.8)",
    textTransform: "capitalize",
  },
  number: {
    fontSize: "11px",
    color: "#9ca3af",
  },
  balanceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "12px",
  },
  balanceLabel: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  balanceValue: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#f9fafb",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryBtn: {
    padding: "7px 12px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #f97316 0%, #facc15 50%, #f97316 100%)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "12px",
    cursor: "pointer",
  },
};

export default Accounts;
