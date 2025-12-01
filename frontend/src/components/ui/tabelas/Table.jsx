import { useState } from "react";

function Table({ columns, data, actions }) {
  const styles = {
    tableContainer: {
      width: "100%",
      overflowX: "auto",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "center",
      backgroundColor: "var(--background-soft)",
    },
    thead: {
      backgroundColor: "var(--background-soft)",
    },
    th: {
      padding: "12px 16px",
      textAlign: "center",
      fontWeight: "600",
      color: "var(--text-secondary)",
      borderBottom: "2px solid var(--surface-border)",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    tbody: {
      backgroundColor: "var(--background-color)",
    },
    tr: {
      borderBottom: "1px solid var(--background-soft)",
      transition: "background-color 0.2s",
    },
    trHover: {
      backgroundColor: "var(--background-soft)",
    },
    td: {
      padding: "12px 16px",
      color: "var(--text-muted)",
      fontSize: "14px",
    },
    actionsCell: {
      padding: "12px 16px",
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      alignItems: "center",
    },
    actionButton: {
      padding: "6px 25px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500",
      transition: "all 0.2s",
      outline: "none",
      fontWeight: "bold"
    },
    detailsButton: {
      backgroundColor: "var(--primary-color)",
      color: "#ffffff",
    },
    detailsButtonHover: {
      backgroundColor: "var(--primary-hover)",
    },
    editButton: {
      backgroundColor: "var(--warning-500)",
      color: "#000000",
    },
    editButtonHover: {
      backgroundColor: "var(--warning-700)",
    },
    deleteButton: {
      backgroundColor: "var(--error-500)",
      color: "#ffffff",
    },
    deleteButtonHover: {
      backgroundColor: "var(--error-700)",
    },
    faturarButton : {
      backgroundColor: "var(--success-500)",
      color: "#ffffff",
    },
    faturarButtonHover : {
      backgroundColor: "var(--success-700)",
    },
    emptyState: {
      padding: "40px",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "14px",
    },
  };

  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const getButtonStyle = (type, isHovered) => {
    const baseStyle = styles.actionButton;
    let typeStyle = {};
    let hoverStyle = {};

    switch (type) {
      case "details":
        typeStyle = styles.detailsButton;
        hoverStyle = styles.detailsButtonHover;
        break;
      case "edit":
        typeStyle = styles.editButton;
        hoverStyle = styles.editButtonHover;
        break;
      case "delete":
        typeStyle = styles.deleteButton;
        hoverStyle = styles.deleteButtonHover;
        break;
      case "faturar":
        typeStyle = styles.faturarButton;
        hoverStyle = styles.faturarButtonHover;
        break;
    }

    return {
      ...baseStyle,
      ...typeStyle,
      ...(isHovered ? hoverStyle : {}),
    };
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={styles.th}>
                {column.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th style={styles.th}>Ações</th>
            )}
          </tr>
        </thead>
        <tbody style={styles.tbody}>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  ...styles.tr,
                  ...(hoveredRow === rowIndex ? styles.trHover : {}),
                }}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={styles.td}>
                    {row[column.key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td>
                    <div style={styles.actionsCell}>
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          style={getButtonStyle(
                            action.type,
                            hoveredButton === `${rowIndex}-${actionIndex}`
                          )}
                          onClick={() => action.onClick(row, rowIndex)}
                          onMouseEnter={() =>
                            setHoveredButton(`${rowIndex}-${actionIndex}`)
                          }
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  columns.length + (actions && actions.length > 0 ? 1 : 0)
                }
                style={styles.emptyState}
              >
                Nenhum dado disponível
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;