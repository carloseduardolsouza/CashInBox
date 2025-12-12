import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  backButton: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
};

function HeaderBack({ title }) {
  const navigate = useNavigate();
  return (
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} color="var(--text-primary)" />
        </button>
        <h1 style={styles.title}>{title}</h1>
      </div>
    </div>
  );
}

export default HeaderBack;
