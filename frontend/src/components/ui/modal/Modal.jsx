import React from "react";
import ReactDOM from "react-dom";

export default function Modal({ style , onClose, children }) {
  return ReactDOM.createPortal(
    <div className="modal-backdrop" style={styles.backdrop} onClick={onClose}>
      <div
        className="modal-content"
        style={{ ...styles.modal, ...style }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  modal: {
    background: "var(--background)",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "90vw",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
  },
};
