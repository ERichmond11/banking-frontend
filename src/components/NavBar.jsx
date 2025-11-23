import React from "react";
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>Emmanuel&apos;s Bank</span>
      </div>
      <div style={styles.right}>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/accounts" style={styles.link}>
          Accounts
        </Link>
        <Link to="/transfer" style={styles.link}>
          Transfers
        </Link>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "14px 32px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background:
      "linear-gradient(90deg, rgba(15,23,42,1) 0%, rgba(17,24,39,1) 50%, rgba(15,23,42,1) 100%)",
    borderBottom: "1px solid rgba(148,163,184,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logo: {
    color: "#facc15",
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "0.06em",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
  },
  logoutBtn: {
    padding: "8px 14px",
    fontSize: "13px",
    borderRadius: "999px",
    border: "1px solid rgba(248,250,252,0.4)",
    background: "transparent",
    color: "#f9fafb",
    cursor: "pointer",
  },
};

export default NavBar;
