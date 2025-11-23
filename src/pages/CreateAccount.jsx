import React, { useState, useEffect } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function CreateAccount() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("chequing");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/account/create", {
        account_type: accountType,
      });
      alert(
        `Account created: #${res.data.account_number} (${res.data.account_type})`
      );
      navigate("/accounts");
    } catch (err) {
      console.error(err);
      alert("Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main}>
        <h2 style={styles.title}>Open a new account</h2>
        <p style={styles.subtitle}>
          Choose your account type and we&apos;ll create a fresh sandbox
          account.
        </p>

        <button style={styles.backBtn} onClick={() => navigate("/accounts")}>
          ← Back to accounts
        </button>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Account type</label>
          <select
            style={styles.select}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="chequing">Chequing</option>
            <option value="savings">Savings</option>
          </select>

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
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
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px 20px 40px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#facc15",
  },
  subtitle: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "16px",
  },
  backBtn: {
    marginBottom: "16px",
    fontSize: "12px",
    color: "#9ca3af",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
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
  button: {
    marginTop: "8px",
    padding: "10px",
    borderRadius: "999px",
    border: "none",
    background:
      "linear-gradient(135deg, #22c55e 0%, #a3e635 50%, #22c55e 100%)",
    color: "#052e16",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default CreateAccount;
