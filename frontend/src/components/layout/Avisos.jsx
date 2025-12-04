import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

function Avisos() {
  const { avisos, deletarAviso } = useContext(AppContext);
  const [temporizadores, setTemporizadores] = useState({});

  useEffect(() => {
    avisos.forEach((aviso) => {
      if (!temporizadores[aviso.id]) {
        // Inicia o temporizador para cada aviso
        setTemporizadores((prev) => ({
          ...prev,
          [aviso.id]: setTimeout(() => {
            deletarAviso(aviso.id);
          }, 10000),
        }));
      }
    });

    // Limpa temporizadores de avisos que não existem mais
    Object.keys(temporizadores).forEach((id) => {
      if (!avisos.find((aviso) => aviso.id === id)) {
        clearTimeout(temporizadores[id]);
        setTemporizadores((prev) => {
          const novo = { ...prev };
          delete novo[id];
          return novo;
        });
      }
    });

    // Cleanup ao desmontar
    return () => {
      Object.values(temporizadores).forEach((timer) => clearTimeout(timer));
    };
  }, [avisos]);

  const styles = {
    layoutAvisos: {
      position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 9999,
    },
    error: {
      minWidth: "370px",
      padding: "12px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: "5px",
      borderRadius: "8px",
      boxShadow: "0px 0px 5px -3px #111",
      animation: "entrada .5s linear",
      position: "relative",
      overflow: "hidden",
    },
    errorIcon: {
      width: "20px",
      height: "20px",
      transform: "translateY(-2px)",
      marginRight: "8px",
    },
    errorTitle: {
      fontWeight: 500,
      fontSize: "14px",
      color: "#fff",
    },
    errorClose: {
      width: "20px",
      height: "20px",
      cursor: "pointer",
      marginLeft: "auto",
      zIndex: 2,
    },
    progressBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "4px",
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      animation: "diminuir 5s linear forwards",
    },
  };

  // Adiciona a animação CSS dinamicamente
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes entrada {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes diminuir {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }
    `;
    
    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
      // Animação já existe
    }
  }, []);

  return (
    <div style={styles.layoutAvisos}>
      {avisos.map((dados, index) => {
        return (
          <div
            key={dados.id || index}
            style={{
              backgroundColor: `${
                dados.tipo === "aviso"
                  ? "var(--primary-color)"
                  : dados.tipo === "atenção"
                  ? "var(--warning-700)"
                  : dados.tipo === "sucesso"
                  ? "var(--success-700)"
                  : dados.tipo === "erro"
                  ? "#C90000"
                  : "#333"
              }`,
              ...styles.error,
            }}
          >
            <div style={styles.errorIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                height="24"
                fill="none"
              >
                <path
                  fill="#fff"
                  d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                ></path>
              </svg>
            </div>

            <div style={styles.errorTitle}>{dados.texto}</div>

            <div
              style={styles.errorClose}
              onClick={() => {
                if (temporizadores[dados.id]) {
                  clearTimeout(temporizadores[dados.id]);
                }
                deletarAviso(dados.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                viewBox="0 0 20 20"
                height="20"
              >
                <path
                  fill="#fff"
                  d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                ></path>
              </svg>
            </div>

            {/* Barra de progresso */}
            <div style={styles.progressBar}></div>
          </div>
        );
      })}
    </div>
  );
}

export default Avisos;