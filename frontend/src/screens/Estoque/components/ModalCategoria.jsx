import React from "react";
import { FaTimes } from "react-icons/fa";

import Modal from "../../../components/ui/modal/Modal"

const ModalCategoria = ({ isOpen, onClose, onSave, value, onChange }) => {
  if (!isOpen) return null;

  const styles = {
    modal: {
      borderRadius: "16px",
      padding: "32px",
      maxWidth: "500px",
      width: "90%",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      paddingBottom: "16px",
      borderBottom: "2px solid var(--surface-border)",
    },
    modalTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "var(--text-primary)",
      margin: 0,
    },
    closeButton: {
      background: "transparent",
      border: "none",
      fontSize: "24px",
      color: "var(--text-muted)",
      cursor: "pointer",
      padding: "4px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "20px",
    },
    formLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "var(--text-secondary)",
    },
    formInput: {
      width: "95%",
      padding: "12px 16px",
      border: "2px solid var(--surface-border)",
      borderRadius: "8px",
      fontSize: "15px",
      color: "var(--text-primary)",
      background: "var(--background)",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
    },
    modalActions: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "24px",
      paddingTop: "24px",
      borderTop: "2px solid var(--surface-border)",
    },
    cancelButton: {
      padding: "10px 24px",
      background: "var(--surface)",
      color: "var(--text-primary)",
      border: "2px solid var(--surface-border)",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
    saveButton: {
      padding: "10px 24px",
      background: "var(--primary-color)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
  };

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
    } else {
      alert("O nome da categoria é obrigatório!");
    }
  };

  return (
    <Modal onClose={onClose} style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Nova Categoria</h3>
          <button style={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Nome da Categoria</label>
          <input
            type="text"
            style={styles.formInput}
            placeholder="Digite o nome da categoria..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div style={styles.modalActions}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button style={styles.saveButton} onClick={handleSave}>
            Salvar
          </button>
        </div>
      </Modal>
  );
};

export default ModalCategoria;