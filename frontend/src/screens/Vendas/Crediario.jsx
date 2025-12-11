import { useState, useEffect } from "react";
import vendaFetch from "../../services/api/vendaFetch";
import format from "../../utils/formatters";

//components
import Table from "../../components/ui/tabelas/Table";

const styles = {
  Crediarios: {
    marginLeft: "40px",
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--background-color)",
    minHeight: "100vh",
  },
  titleHeader: {
    color: "var(--text-primary)",
  },
  buttonNovaVenda: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    padding: "10px 35px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "15px",
    width: "130px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "var(--background)",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid var(--surface-border)",
    paddingBottom: "12px",
  },
  modalTitle: {
    color: "var(--text-primary)",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "28px",
    color: "var(--text-secondary)",
    cursor: "pointer",
    padding: "0",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoSection: {
    marginBottom: "24px",
  },
  sectionTitle: {
    color: "var(--text-primary)",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "12px",
    borderBottom: "1px solid var(--surface-border)",
    paddingBottom: "8px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "8px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
  },
  infoLabel: {
    color: "var(--text-muted)",
    fontSize: "12px",
    marginBottom: "4px",
  },
  infoValue: {
    color: "var(--text-primary)",
    fontSize: "14px",
    fontWeight: "500",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  statusPendente: {
    backgroundColor: "var(--warning-100)",
    color: "var(--warning-700)",
  },
  statusPago: {
    backgroundColor: "var(--success-100)",
    color: "var(--success-700)",
  },
  parcelasTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "12px",
  },
  tableHeader: {
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    fontWeight: "600",
    fontSize: "14px",
  },
  tableHeaderCell: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid var(--surface-border)",
  },
  tableRow: {
    borderBottom: "1px solid var(--surface-border)",
  },
  tableCell: {
    padding: "12px",
    color: "var(--text-primary)",
    fontSize: "14px",
  },
  buttonDarBaixa: {
    backgroundColor: "var(--primary-color)",
    color: "#fff",
    border: "none",
    padding: "6px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
  },
  buttonDarBaixaDisabled: {
    backgroundColor: "#ccc",
    color: "#666",
    cursor: "not-allowed",
    opacity: 0.6,
  },
};

function CrediariosVendas() {
  const [crediariosData, setCrediariosData] = useState([]);
  const [crediariosRaw, setCrediariosRaw] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [crediarioSelecionado, setCrediarioSelecionado] = useState(null);

  const buscarCrediarios = async () => {
    const res = await vendaFetch.listaCrediarios();

    setCrediariosRaw(res);

    const resFormated = res.map((dados) => {
      const parcelasPagas = dados.parcelas.filter((e) => e.status === "Pago");
      return {
        cliente: dados.cliente.nome,
        status: dados.status,
        entrada: format.formatarCurrency(dados.entrada),
        numero_parcelas: dados.numero_parcelas,
        parcelas_pagas: parcelasPagas.length,
        valor_venda: format.formatarCurrency(dados.valor_total),
      };
    });

    setCrediariosData(resFormated.reverse());
  };

  useEffect(() => {
    buscarCrediarios();
  }, []);

  const abrirModal = (row, index) => {
    setCrediarioSelecionado(crediariosRaw[index]);
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
    setCrediarioSelecionado(null);
  };

  const pagarParcela = async (id) => {
    await vendaFetch.darBaixaParcela(id);

    // Atualiza apenas a parcela no modal imediatamente
    setCrediarioSelecionado((prev) => ({
      ...prev,
      parcelas: prev.parcelas.map((p) =>
        p.id_parcela === id
          ? { ...p, status: "Pago", data_pagamento: new Date().toISOString() }
          : p
      ),
    }));

    // Recarrega a lista principal, mas sem travar a UI
    buscarCrediarios();
  };

  const formatarData = (data) => {
    if (!data) return "-";
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR");
  };

  const columns = [
    { header: "Cliente", key: "cliente" },
    { header: "Valor total da venda", key: "valor_venda" },
    { header: "Valor de entrada", key: "entrada" },
    { header: "Numero de parcelas", key: "numero_parcelas" },
    { header: "Parcelas pagas", key: "parcelas_pagas" },
    { header: "Status", key: "status" },
  ];

  const actions = [
    {
      label: "Info",
      type: "details",
      onClick: abrirModal,
    },
  ];

  return (
    <div style={styles.Crediarios}>
      <h2 style={styles.titleHeader}>Resumo de crediários pendentes</h2>

      <Table columns={columns} data={crediariosData} actions={actions} />

      {modalAberta && crediarioSelecionado && (
        <div style={styles.modalOverlay} onClick={fecharModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Informações do Cliente</h3>
              <button style={styles.closeButton} onClick={fecharModal}>
                ×
              </button>
            </div>

            <div style={styles.infoSection}>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Nome</span>
                  <span style={styles.infoValue}>
                    {crediarioSelecionado.cliente.nome}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>CPF/CNPJ</span>
                  <span style={styles.infoValue}>
                    {format.formatCPF(crediarioSelecionado.cliente.cpfCNPJ)}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Telefone</span>
                  <span style={styles.infoValue}>
                    {format.formatarTelefone(
                      crediarioSelecionado.cliente.telefone
                    )}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Email</span>
                  <span style={styles.infoValue}>
                    {crediarioSelecionado.cliente.email}
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.infoSection}>
              <h3 style={styles.sectionTitle}>Informações da Venda</h3>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Valor Total</span>
                  <span style={styles.infoValue}>
                    {format.formatarCurrency(crediarioSelecionado.valor_total)}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Entrada</span>
                  <span style={styles.infoValue}>
                    {format.formatarCurrency(crediarioSelecionado.entrada)}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Número de Parcelas</span>
                  <span style={styles.infoValue}>
                    {crediarioSelecionado.numero_parcelas}
                  </span>
                </div>
                <div style={styles.infoItem}>
                  <span style={styles.infoLabel}>Status</span>
                  <span
                    style={{
                      ...styles.statusBadge,
                      ...(crediarioSelecionado.status === "Pago"
                        ? styles.statusPago
                        : styles.statusPendente),
                    }}
                  >
                    {crediarioSelecionado.status}
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.infoSection}>
              <h3 style={styles.sectionTitle}>Parcelas</h3>
              <table style={styles.parcelasTable}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Nº</th>
                    <th style={styles.tableHeaderCell}>Valor</th>
                    <th style={styles.tableHeaderCell}>Vencimento</th>
                    <th style={styles.tableHeaderCell}>Pagamento</th>
                    <th style={styles.tableHeaderCell}>Status</th>
                    <th style={styles.tableHeaderCell}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {crediarioSelecionado.parcelas.map((parcela) => (
                    <tr key={parcela.id_parcela} style={styles.tableRow}>
                      <td style={styles.tableCell}>{parcela.numero_parcela}</td>
                      <td style={styles.tableCell}>
                        {format.formatarCurrency(parcela.valor)}
                      </td>
                      <td style={styles.tableCell}>
                        {formatarData(parcela.data_vencimento)}
                      </td>
                      <td style={styles.tableCell}>
                        {formatarData(parcela.data_pagamento)}
                      </td>
                      <td style={styles.tableCell}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            ...(parcela.status === "Pago"
                              ? styles.statusPago
                              : styles.statusPendente),
                          }}
                        >
                          {parcela.status}
                        </span>
                      </td>
                      <td>
                        <button
                          style={{
                            ...styles.buttonDarBaixa,
                            ...(parcela.status === "Pago" &&
                              styles.buttonDarBaixaDisabled),
                          }}
                          onClick={() => pagarParcela(parcela.id_parcela)}
                          disabled={parcela.status === "Pago"}
                        >
                          Dar Baixa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrediariosVendas;
