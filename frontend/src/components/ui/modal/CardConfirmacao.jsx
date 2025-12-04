import { useState } from "react";
import Modal from "./Modal";

const styles = {
  container: {
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
  },
  iconContainer: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    backgroundColor: "var(--neutral-600)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "35px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--text-secondary)",
    marginBottom: "12px",
    marginTop: "0",
  },
  subtitle: {
    fontSize: "15px",
    color: "var(--text-muted)",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
  },
  buttonBase: {
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    outline: "none",
  },
  buttonCancel: {
    backgroundColor: "#c7c7c7ff",
    color: "#4b5563",
  },
  buttonCancelHover: {
    backgroundColor: "#a2a2a2ff",
    transform: "translateY(-1px)",
  },
  buttonConfirm: {
    backgroundColor: "var(--primary-color)",
    color: "#fff",
    boxShadow: "0 4px 12px var(--primary-hover)",
  },
  buttonConfirmHover: {
    backgroundColor: "var(--primary-hover)",
    transform: "translateY(-1px)",
    boxShadow: "0 6px 16px var(--primary-color)",
  },
};

function CardConfirmacao({ onClose, text, subText, action }) {
  const [hoverCancel, setHoverCancel] = useState(false);
  const [hoverConfirm, setHoverConfirm] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div style={styles.container}>
        <div style={styles.iconContainer}>
          ⚠️
        </div>
        
        <h2 style={styles.title}>{text}</h2>
        <p style={styles.subtitle}>{subText}</p>

        <div style={styles.buttonContainer}>
          <button
            style={{
              ...styles.buttonBase,
              ...styles.buttonCancel,
              ...(hoverCancel ? styles.buttonCancelHover : {}),
            }}
            onClick={() => onClose()}
            onMouseEnter={() => setHoverCancel(true)}
            onMouseLeave={() => setHoverCancel(false)}
          >
            Cancelar
          </button>
          <button
            style={{
              ...styles.buttonBase,
              ...styles.buttonConfirm,
              ...(hoverConfirm ? styles.buttonConfirmHover : {}),
            }}
            onClick={() => action()}
            onMouseEnter={() => setHoverConfirm(true)}
            onMouseLeave={() => setHoverConfirm(false)}
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CardConfirmacao;