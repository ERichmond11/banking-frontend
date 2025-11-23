import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import NavBar from "../components/NavBar";

function Transactions() {
  const { id } = useParams(); // account_id from URL
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    async function fetchTransactions() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await api.get(`/account/transactions/${id}`);
        setTransactions(res.data.transactions);
        setAccountId(res.data.account_id);
      } catch (err) {
        console.error(err);
        alert("Unable to load transactions");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [id, navigate]);

  return (
    <div style={styles.page}>
      <NavBar />

      <main style={styles.main}>
        <button style={styles.backLink} onClick={() => navigate("/accounts")}>
          ← Back to accounts
        </button>

        <button style={styles.backDash} onClick={() => navigate("/dashboard")}>
          ← Back to dashboard
        </button>

        <h2 style={styles.title}>Transactions for Account #{accountId}</h2>

        {loading ? (
          <p style={styles.info}>Loading...</p>
        ) : transactions.length === 0 ? (
          <p style={styles.info}>No transactions yet.</p>
        ) : (
          <div style={styles.list}>
            {transactions.map((txn) => (
              <div key={txn.id} style={styles.card}>
                <div style={styles.row}>
                  <span style={styles.label}>Type</span>
                  <span style={styles.value}>{txn.type}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Amount</span>
                  <span style={styles.value}>${txn.amount.toFixed(2)}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Description</span>
                  <span style={styles.value}>{txn.description}</span>
                </div>
                <div style={styles.row}>
                  <span style={styles.label}>Date</span>
                  <span style={styles.value}>
                    {new Date(txn.timestamp).toLocaleString()}
                  </span>
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
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px 18px 40px",
  },
  backLink: {
    fontSize: "12px",
    color: "#9ca3af",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
    marginRight: "12px",
  },
  backDash: {
    fontSize: "12px",
    color: "#9ca3af",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
  title: {
    marginTop: "10px",
    fontSize: "20px",
    fontWeight: 700,
    color: "#facc15",
    marginBottom: "14px",
  },
  info: {
    fontSize: "13px",
    color: "#9ca3af",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  card: {
    background: "rgba(15,23,42,0.96)",
    borderRadius: "14px",
    padding: "14px 13px",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginBottom: "4px",
  },
  label: {
    color: "#9ca3af",
  },
  value: {
    color: "#e5e7eb",
    marginLeft: "8px",
    textAlign: "right",
  },
};

export default Transactions;
