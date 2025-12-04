import { useState } from "react";

function Table({ columns, data, actions, rowsPerPage = 25 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Calcular paginação
  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data?.slice(startIndex, endIndex) || [];

  const styles = {
    tableContainer: {
      width: "100%",
      overflowX: "auto",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      border: "1px solid var(--surface-border)"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "center",
      backgroundColor: "var(--background-soft)",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
    faturarButton: {
      backgroundColor: "var(--success-500)",
      color: "#ffffff",
    },
    faturarButtonHover: {
      backgroundColor: "var(--success-700)",
    },
    emptyState: {
      padding: "40px",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "14px",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "var(--background-soft)",
      borderTop: "1px solid var(--surface-border)",
      borderRadius: "0 0 8px 8px",
    },
    paginationInfo: {
      color: "var(--text-muted)",
      fontSize: "14px",
    },
    paginationButtons: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    paginationButton: {
      padding: "8px 16px",
      border: "1px solid var(--surface-border)",
      borderRadius: "4px",
      backgroundColor: "var(--background-color)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s",
      fontWeight: "500",
    },
    paginationButtonHover: {
      backgroundColor: "var(--primary-color)",
      color: "#ffffff",
      borderColor: "var(--primary-color)",
    },
    paginationButtonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    pageNumber: {
      padding: "8px 12px",
      border: "1px solid var(--surface-border)",
      borderRadius: "4px",
      backgroundColor: "var(--background-color)",
      color: "var(--text-secondary)",
      fontSize: "14px",
      minWidth: "40px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    pageNumberActive: {
      backgroundColor: "var(--primary-color)",
      color: "#ffffff",
      borderColor: "var(--primary-color)",
      fontWeight: "600",
    },
  };

  const [hoveredPaginationBtn, setHoveredPaginationBtn] = useState(null);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          style={{
            ...styles.pageNumber,
            ...(currentPage === i ? styles.pageNumberActive : {}),
            ...(hoveredPaginationBtn === `page-${i}` && currentPage !== i
              ? styles.paginationButtonHover
              : {}),
          }}
          onClick={() => handlePageChange(i)}
          onMouseEnter={() => setHoveredPaginationBtn(`page-${i}`)}
          onMouseLeave={() => setHoveredPaginationBtn(null)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
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
            {currentData && currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
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
                            onClick={() => action.onClick(row, startIndex + rowIndex)}
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

      {totalPages > 1 && (
        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            Mostrando {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} registros
          </div>
          
          <div style={styles.paginationButtons}>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
                ...(hoveredPaginationBtn === "prev" && currentPage !== 1
                  ? styles.paginationButtonHover
                  : {}),
              }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              onMouseEnter={() => setHoveredPaginationBtn("prev")}
              onMouseLeave={() => setHoveredPaginationBtn(null)}
            >
              Anterior
            </button>

            {renderPageNumbers()}

            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages
                  ? styles.paginationButtonDisabled
                  : {}),
                ...(hoveredPaginationBtn === "next" && currentPage !== totalPages
                  ? styles.paginationButtonHover
                  : {}),
              }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              onMouseEnter={() => setHoveredPaginationBtn("next")}
              onMouseLeave={() => setHoveredPaginationBtn(null)}
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table;