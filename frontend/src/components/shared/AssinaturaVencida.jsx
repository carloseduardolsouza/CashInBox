import { useContext } from "react";
import Modal from "../ui/modal/Modal";

function AssinaturaVencida() {
  const styles = {
    cardAssinaturaVencida: {
      display: "flex",
      flexDirection: "column",
      width: "400px",
      overflow: "hidden",
      position: "relative",
      textAlign: "left",
      borderRadius: "0.5rem",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      padding: "1.25rem 1rem 1rem 1rem",
    },
    image: {
      display: "flex",
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "var(--error-100)",
      flexShrink: 0,
      justifyContent: "center",
      alignItems: "center",
      width: "3rem",
      height: "3rem",
      borderRadius: "9999px",
    },
    svg: {
      color: "var(--error-700)",
      width: "1.5rem",
      height: "1.5rem",
    },
    content: {
      marginTop: "0.75rem",
      textAlign: "center",
    },
    title: {
      color: "var(--text-primary)",
      fontSize: "1rem",
      fontWeight: "600",
      lineHeight: "1.5rem",
    },
    message: {
      marginTop: "0.5rem",
      color: "var(--text-secondary)",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
    },
    actions: {
      margin: "0.75rem 1rem",
      backgroundColor: "var(--error-100)",
    },
    desactivate: {
      display: "inline-flex",
      padding: "0.5rem 1rem",
      backgroundColor: "var(--error-700)",
      color: "var(--error-100)",
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: "500",
      justifyContent: "center",
      width: "100%",
      borderRadius: "0.375rem",
      borderWidth: "1px",
      borderColor: "transparent",
      cursor: "pointer",
    },
    cancel: {
      display: "inline-flex",
      marginTop: "0.75rem",
      padding: "0.5rem 1rem",
      backgroundColor: "var(--background-color)",
      color: "var(--text-secondary)",
      fontSize: "1rem",
      lineHeight: "1.5rem",
      fontWeight: "500",
      justifyContent: "center",
      width: "100%",
      borderRadius: "0.375rem",
      border: "1px solid var(--surface-border)",
      cursor: "pointer",
    },
  };

  return (
    <Modal>
      <div style={styles.cardAssinaturaVencida}>
        <div style={styles.header}>
          <div style={styles.image}>
            <svg
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              style={styles.svg}
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </div>
          <div style={styles.content}>
            <span style={styles.title}>🚫 Assinatura Vencida</span>
            <p style={styles.message}>
              Oops! Detectamos que sua mensalidade da{" "}
              <strong>Cash In Box</strong> está em atraso. 😕
              <br />
              <br />
              Para recuperar o <strong>acesso os nossos serviços</strong>, entre
              em contato com nosso suporte e regularize sua situação o quanto
              antes.
              <br />
              <br />
              📞 Estamos prontos para te ajudar – conte com a gente!
            </p>
          </div>

          <div style={styles.actions}>
            <button style={styles.desactivate} type="button">
              Suporte
            </button>
            <button
              style={styles.cancel}
              type="button"
              onClick={() => setFazerLogin(true)}
            >
              Mudar Login
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AssinaturaVencida;
