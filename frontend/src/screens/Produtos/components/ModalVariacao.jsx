import React from "react";
import { FaTimes } from "react-icons/fa";

const ModalVariacao = ({
  isOpen,
  onClose,
  onSave,
  data,
  onChange,
  isEditing,
  images,
}) => {
  if (!isOpen) return null;

  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      background: "var(--background)",
      borderRadius: "16px",
      padding: "32px",
      maxWidth: "600px",
      width: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
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
    modalFormGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    fullWidth: {
      gridColumn: "1 / -1",
    },
    formLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "var(--text-secondary)",
    },
    requiredIndicator: {
      color: "var(--error-500)",
      fontSize: "12px",
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
    if (!data.nome.trim()) {
      alert("Nome da variação é obrigatório!");
      return;
    }
    onSave(data);
  };

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>
            {isEditing ? "Editar Variação" : "Nova Variação"}
          </h3>
          <button style={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div style={styles.modalFormGrid}>
          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.formLabel}>
              Nome da Variação <span style={styles.requiredIndicator}>*</span>
            </label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="Ex: Vermelho - Tamanho M"
              value={data.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Tipo</label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="Ex: Cor, Tamanho"
              value={data.tipo}
              onChange={(e) => handleChange("tipo", e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Código Interno</label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="SKU"
              value={data.cod_interno}
              onChange={(e) => handleChange("cod_interno", e.target.value)}
            />
          </div>

          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.formLabel}>Código de Barras</label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="EAN/UPC"
              value={data.cod_barras}
              onChange={(e) => handleChange("cod_barras", e.target.value)}
            />
          </div>

          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.formLabel}>Imagem Associada</label>
            <select
              style={styles.formInput}
              value={data.imagemIndex ?? ""}
              onChange={(e) =>
                handleChange(
                  "imagemIndex",
                  e.target.value === "" ? null : parseInt(e.target.value)
                )
              }
            >
              <option value="">Nenhuma imagem</option>
              {images.map((img, index) => (
                <option key={index} value={index}>
                  Imagem {index + 1}
                </option>
              ))}
            </select>

            {data.imagemIndex !== null && images[data.imagemIndex] && (
              <div
                style={{
                  marginTop: "8px",
                  border: "2px solid var(--surface-border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  maxWidth: "200px",
                }}
              >
                <img
                  src={images[data.imagemIndex]}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Estoque</label>
            <input
              type="number"
              style={styles.formInput}
              placeholder="0"
              min="0"
              value={data.estoque}
              onChange={(e) => handleChange("estoque", e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Estoque Mínimo</label>
            <input
              type="number"
              style={styles.formInput}
              placeholder="0"
              min="0"
              value={data.estoque_minimo}
              onChange={(e) => handleChange("estoque_minimo", e.target.value)}
            />
          </div>
        </div>

        <div style={styles.modalActions}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button style={styles.saveButton} onClick={handleSave}>
            {isEditing ? "Atualizar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVariacao;
