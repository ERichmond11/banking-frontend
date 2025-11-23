import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Transfer() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function load() {
      try {
        const res = await api.get("/account/list");
        setAccounts(res.data);
      } catch (err) {
        console.error(err);
        alert("Unable to load accounts");
      }
    }
    load();
  }, [navigate]);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (fromId === toId) {
      alert("Cannot transfer to the same account");
      return;
    }

    try {
      await api.post("/account/transfer", {
        from_account: Number(fromId),
        to_account: Number(toId),
        amount: Number(amount),
      });
      alert("Transfer successful");
      navigate("/accounts");
    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    }
  };

  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main}>
        <button style={styles.backBtn} onClick={() => navigate("/transfer")}>
          ← Back to transfer center
        </button>
        <button style={styles.backDash} onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>

        <h2 style={styles.title}>Transfer Between Accounts</h2>
        <p style={styles.subtitle}>
          Move funds between your own accounts with full validation and
          transaction logging.
        </p>

        <form onSubmit={handleTransfer} style={styles.form}>
          <label style={styles.label}>From account</label>
          <select
            style={styles.select}
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
          >
            <option value="">Select source account</option>
            {accounts.map((acc) => (
              <option key={acc.account_id} value={acc.account_id}>
                {acc.account_type} #{acc.account_number} — $
                {acc.balance.toFixed(2)}
              </option>
            ))}
          </select>

          <label style={styles.label}>To account</label>
          <select
            style={styles.select}
            value={toId}
            onChange={(e) => setToId(e.target.value)}
          >
            <option value="">Select destination account</option>
            {accounts.map((acc) => (
              <option key={acc.account_id} value={acc.account_id}>
                {acc.account_type} #{acc.account_number} — $
                {acc.balance.toFixed(2)}
              </option>
            ))}
          </select>

          <label style={styles.label}>Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            style={styles.input}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Transfer
          </button>
        </form>
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
    maxWidth: "650px",
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
    marginRight: "10px",
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
    fontSize: "22px",
    fontWeight: 700,
    color: "#facc15",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "18px",
  },
  form: {
    background: "rgba(15,23,42,0.96)",
    borderRadius: "16px",
    padding: "18px 16px",
    border: "1px solid rgba(148,163,184,0.5)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(75,85,99,0.9)",
    background: "rgba(15,23,42,0.9)",
    color: "#f9fafb",
    fontSize: "14px",
    outline: "none",
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
    marginTop: "8px",
    padding: "10px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #f97316 0%, #facc15 50%, #f97316 100%)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Transfer;
