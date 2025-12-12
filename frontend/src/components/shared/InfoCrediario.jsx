import { useState } from "react";
import { FaUndo } from "react-icons/fa";
import { TbCircleArrowDownRightFilled } from "react-icons/tb";
import Modal from "../ui/modal/Modal";
import format from "../../utils/formatters";
import vendaFetch from "../../services/api/vendaFetch";

const styles = {
  modalContent: {
    borderRadius: "8px",
    maxWidth: "800px",
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    padding: "24px",
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
    color: "var(--text-inverse)",
    border: "none",
    padding: "6px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },
  buttonReverterPagamento: {
    backgroundColor: "var(--warning-700)",
    color: "var(--text-inverse)",
    border: "none",
    padding: "6px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  formPagamento: {
    backgroundColor: "var(--background)",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    minWidth: "400px",
  },
  formGroup: {
    marginBottom: "16px",
  },
  formLabel: {
    display: "block",
    color: "var(--text-primary)",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "500",
  },
  formInput: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid var(--surface-border)",
    fontSize: "14px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    boxSizing: "border-box",
  },
  formButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  buttonPagar: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    border: "none",
    padding: "10px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  buttonCancelar: {
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    border: "1px solid var(--surface-border)",
    padding: "10px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  buttonAmortizar: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  buttonAmortizarDisabled: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "not-allowed",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "6px",

    opacity: 0.5,
    transition: "0.2s ease",
  },

  amortizarContainer: {
    backgroundColor: "var(--background)",
    padding: "24px",
    borderRadius: "8px",
    minWidth: "500px",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflow: "auto",
  },
  amortizarHeader: {
    marginBottom: "24px",
    paddingBottom: "12px",
    borderBottom: "2px solid var(--surface-border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amortizarTitle: {
    color: "var(--text-primary)",
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  infoCard: {
    backgroundColor: "var(--surface)",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid var(--surface-border)",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid var(--surface-border)",
  },
  infoRowLast: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  },
  infoRowLabel: {
    color: "var(--text-muted)",
    fontSize: "14px",
  },
  infoRowValue: {
    color: "var(--text-primary)",
    fontSize: "16px",
    fontWeight: "600",
  },
  amortizarFormGroup: {
    marginBottom: "20px",
  },
  amortizarLabel: {
    display: "block",
    color: "var(--text-primary)",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "600",
  },
  amortizarInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "4px",
    border: "1px solid var(--surface-border)",
    fontSize: "16px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    boxSizing: "border-box",
  },
  parcelasPreview: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "var(--background-soft)",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
  },
  parcelasPreviewTitle: {
    color: "var(--text-primary)",
    fontSize: "15px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  parcelaItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid var(--surface-border)",
  },
  parcelaItemLast: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
  },
  parcelaLabel: {
    color: "var(--text-secondary)",
    fontSize: "13px",
  },
  parcelaValor: {
    color: "var(--text-primary)",
    fontSize: "14px",
    fontWeight: "500",
  },
  parcelaDestaque: {
    color: "var(--success-700)",
    fontSize: "14px",
    fontWeight: "600",
  },
  resultadoCard: {
    backgroundColor: "var(--success-100)",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "20px",
    border: "1px solid var(--success-700)",
  },
  resultadoTitle: {
    color: "var(--success-700)",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  resultadoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    color: "var(--text-primary)",
  },
  resultadoLabel: {
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
  resultadoValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--success-700)",
  },
  amortizarButtons: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "24px",
  },
  buttonConfirmarAmortizar: {
    backgroundColor: "var(--success-700)",
    color: "var(--text-inverse)",
    border: "none",
    padding: "10px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  buttonConfirmarAmortizarDisabled: {
    backgroundColor: "var(--success-300)",
    color: "var(--text-inverse)",
    border: "none",
    padding: "10px 24px",
    borderRadius: "4px",
    cursor: "not-allowed",
    opacity: 0.6,
    fontSize: "14px",
    fontWeight: "bold",
    transition: "0.2s ease",
  },
};

function ModalCrediario({
  crediario,
  isOpen,
  onClose,
  onPagarParcela,
  onCancelarParcela,
}) {
  const [showFormPagamento, setShowFormPagamento] = useState(false);
  const [parcelaSelecionada, setParcelaSelecionada] = useState(null);
  const [valorPago, setValorPago] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const [showAmortizar, setShowAmortizar] = useState(false);
  const [valorAmortizar, setValorAmortizar] = useState("");

  // Calcular parcelas restantes
  const parcelasRestantes =
    crediario?.parcelas?.filter((p) => p.status === "Pendente") || [];

  const valorParcelaAtual =
    parcelasRestantes.length > 0 ? parcelasRestantes[0].valor : 0;

  const proximoVencimento =
    parcelasRestantes.length > 0 ? parcelasRestantes[0].data_vencimento : null;

  // Calcular novo valor da parcela após amortização
  const calcularNovoValor = () => {
    if (!valorAmortizar || parcelasRestantes.length === 0) return null;

    const valorAmort = parseFloat(valorAmortizar);
    const reducaoPorParcela = valorAmort / parcelasRestantes.length;
    const novoValorParcela = valorParcelaAtual - reducaoPorParcela;

    return {
      reducaoPorParcela,
      novoValorParcela,
      totalAmortizado: valorAmort,
    };
  };

  const resultado = calcularNovoValor();

  if (!isOpen || !crediario) return null;

  const handleDarBaixa = (parcela) => {
    setParcelaSelecionada(parcela);
    setValorPago(parcela.valor.toString());
    setDataPagamento(new Date().toISOString().split("T")[0]);
    setShowFormPagamento(true);
  };

  const handleCancelar = (parcela) => {
    if (parcela.id_parcela) {
      onCancelarParcela(parcela.id_parcela);
    }
  };

  const handleConfirmarPagamento = () => {
    if (parcelaSelecionada && valorPago && dataPagamento) {
      onPagarParcela(parcelaSelecionada.id_parcela, valorPago, dataPagamento);
      setShowFormPagamento(false);
      setParcelaSelecionada(null);
      setValorPago("");
      setDataPagamento("");
    }
  };

  const handleCancelarPagamento = () => {
    setShowFormPagamento(false);
    setParcelaSelecionada(null);
    setValorPago("");
    setDataPagamento("");
  };

  const handleCancelarAmortizacao = () => {
    setShowAmortizar(false);
    setValorAmortizar("");
  };

  const handleAmortizarParcelas = async () => {
    const dadosFormatedAmortizar = {
      valor_amortizado: valorAmortizar,
      novo_valor: resultado.novoValorParcela
    }
    const res = await vendaFetch.amortizarParcela(crediario.id_crediario , dadosFormatedAmortizar)
    // Reseta valores
    setShowAmortizar(false);
    setValorAmortizar("");
  };

  return (
    <>
      <Modal onClose={onClose} style={styles.modalContent}>
        <div>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>Informações do Cliente</h3>
            <button style={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>

          <div style={styles.infoSection}>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Nome</span>
                <span style={styles.infoValue}>{crediario.cliente.nome}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>CPF/CNPJ</span>
                <span style={styles.infoValue}>
                  {format.formatCPF(crediario.cliente.cpfCNPJ)}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Telefone</span>
                <span style={styles.infoValue}>
                  {format.formatarTelefone(crediario.cliente.telefone)}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Email</span>
                <span style={styles.infoValue}>{crediario.cliente.email}</span>
              </div>
            </div>
          </div>

          <div style={styles.infoSection}>
            <h3 style={styles.sectionTitle}>Informações da Venda</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Valor Total</span>
                <span style={styles.infoValue}>
                  {format.formatarCurrency(crediario.valor_total)}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Entrada</span>
                <span style={styles.infoValue}>
                  {format.formatarCurrency(crediario.entrada)}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Número de Parcelas</span>
                <span style={styles.infoValue}>
                  {crediario.numero_parcelas}
                </span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Status</span>
                <span
                  style={{
                    ...styles.statusBadge,
                    ...(crediario.status === "Pago"
                      ? styles.statusPago
                      : styles.statusPendente),
                  }}
                >
                  {crediario.status}
                </span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>
                  Amortizar próximas parcelas
                </span>

                <button
                  style={
                    crediario.status === "Pago"
                      ? styles.buttonAmortizarDisabled
                      : styles.buttonAmortizar
                  }
                  onClick={() => setShowAmortizar(true)}
                  disabled={crediario.status === "Pago"}
                >
                  <TbCircleArrowDownRightFilled size={14} /> Amortizar
                </button>
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
                {crediario.parcelas.map((parcela) => (
                  <tr key={parcela.id_parcela} style={styles.tableRow}>
                    <td style={styles.tableCell}>{parcela.numero_parcela}</td>
                    <td style={styles.tableCell}>
                      {format.formatarCurrency(parcela.valor)}
                    </td>
                    <td style={styles.tableCell}>
                      {format.formatDate(parcela.data_vencimento)}
                    </td>
                    <td style={styles.tableCell}>
                      {format.formatDate(parcela.data_pagamento)}
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
                      {parcela.status === "Pago" ? (
                        <button
                          style={styles.buttonReverterPagamento}
                          disabled={parcela.status !== "Pago"}
                          onClick={() => handleCancelar(parcela)}
                        >
                          <FaUndo />
                        </button>
                      ) : (
                        <button
                          style={styles.buttonDarBaixa}
                          onClick={() => handleDarBaixa(parcela)}
                        >
                          Dar Baixa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {showAmortizar && (
        <Modal onClose={handleCancelarAmortizacao}>
          <div style={styles.amortizarContainer}>
            <div style={styles.amortizarHeader}>
              <h2 style={styles.amortizarTitle}>Amortizar Próximas Parcelas</h2>
              <button
                style={styles.closeButton}
                onClick={handleCancelarAmortizacao}
              >
                ×
              </button>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoRow}>
                <span style={styles.infoRowLabel}>Parcelas restantes</span>
                <span style={styles.infoRowValue}>
                  {parcelasRestantes.length}
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoRowLabel}>Valor atual da parcela</span>
                <span style={styles.infoRowValue}>
                  {format.formatarCurrency(valorParcelaAtual)}
                </span>
              </div>

              <div style={styles.infoRowLast}>
                <span style={styles.infoRowLabel}>Próximo vencimento</span>
                <span style={styles.infoRowValue}>
                  {proximoVencimento
                    ? format.formatDate(proximoVencimento)
                    : "-"}
                </span>
              </div>
            </div>

            <div style={styles.amortizarFormGroup}>
              <label style={styles.amortizarLabel}>
                Valor a ser amortizado
              </label>
              <input
                type="number"
                style={styles.amortizarInput}
                value={valorAmortizar}
                onChange={(e) => setValorAmortizar(e.target.value)}
                placeholder="R$ 0,00"
                step="0.01"
                min="0"
              />
            </div>

            {resultado && valorAmortizar > 0 && (
              <>
                <div style={styles.resultadoCard}>
                  <div style={styles.resultadoTitle}>
                    Simulação da Amortização
                  </div>
                  <div style={styles.resultadoRow}>
                    <span style={styles.resultadoLabel}>
                      Redução por parcela
                    </span>
                    <span style={styles.resultadoValue}>
                      {format.formatarCurrency(resultado.reducaoPorParcela)}
                    </span>
                  </div>
                  <div style={styles.resultadoRow}>
                    <span style={styles.resultadoLabel}>
                      Novo valor da parcela
                    </span>
                    <span style={styles.resultadoValue}>
                      {format.formatarCurrency(resultado.novoValorParcela)}
                    </span>
                  </div>
                  <div style={styles.resultadoRow}>
                    <span style={styles.resultadoLabel}>Total amortizado</span>
                    <span style={styles.resultadoValue}>
                      {format.formatarCurrency(resultado.totalAmortizado)}
                    </span>
                  </div>
                </div>

                <div style={styles.parcelasPreview}>
                  <div style={styles.parcelasPreviewTitle}>
                    Preview das parcelas após amortização
                  </div>
                  {parcelasRestantes.slice(0, 3).map((parcela, index) => (
                    <div
                      key={parcela.id_parcela}
                      style={
                        index === parcelasRestantes.length - 1 || index === 2
                          ? styles.parcelaItemLast
                          : styles.parcelaItem
                      }
                    >
                      <span style={styles.parcelaLabel}>
                        Parcela {parcela.numero_parcela} -{" "}
                        {format.formatDate(parcela.data_vencimento)}
                      </span>
                      <span style={styles.parcelaDestaque}>
                        {format.formatarCurrency(resultado.novoValorParcela)}
                      </span>
                    </div>
                  ))}
                  {parcelasRestantes.length > 3 && (
                    <div
                      style={{
                        ...styles.parcelaItemLast,
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{ ...styles.parcelaLabel, fontStyle: "italic" }}
                      >
                        +{parcelasRestantes.length - 3} parcelas restantes
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            <div style={styles.amortizarButtons}>
              <button
                style={styles.buttonCancelar}
                onClick={handleCancelarAmortizacao}
              >
                Cancelar
              </button>
              <button
                style={styles.buttonConfirmarAmortizar}
                onClick={handleAmortizarParcelas}
                disabled={!resultado || resultado.novoValorParcela <= 0}
              >
                Confirmar Amortização
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showFormPagamento && (
        <Modal onClose={handleCancelarPagamento}>
          <div style={styles.formPagamento}>
            <h3 style={styles.modalTitle}>Confirmar Pagamento</h3>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Valor Pago:</label>
              <input
                type="number"
                style={styles.formInput}
                value={valorPago}
                onChange={(e) => setValorPago(e.target.value)}
                step="0.01"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Data do Pagamento:</label>
              <input
                type="date"
                style={styles.formInput}
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
              />
            </div>
            <div style={styles.formButtons}>
              <button
                style={styles.buttonCancelar}
                onClick={handleCancelarPagamento}
              >
                Cancelar
              </button>
              <button
                style={styles.buttonPagar}
                onClick={handleConfirmarPagamento}
              >
                Confirmar Pagamento
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ModalCrediario;
