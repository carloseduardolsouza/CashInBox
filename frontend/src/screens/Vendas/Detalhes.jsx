import { useState, useCallback, useMemo, useEffect } from "react";
import vendaFetch from "../../services/api/vendaFetch";
import { useParams } from "react-router-dom";
import format from "../../utils/formatters";
import Loading from "../../components/layout/Loading";
import {
  FaRegUser,
  FaFilePdf,
  FaEdit,
  FaWhatsapp,
  FaTrash,
  FaReceipt,
  FaMoneyBillWave,
} from "react-icons/fa";

// Estilos
const styles = {
  container: {
    marginLeft: "40px",
    padding: "15px",
    minHeight: "100vh",
    backgroundColor: "var(--background-color)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    backgroundColor: "var(--surface)",
    padding: "13px 24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: 0,
  },
  btnEnviar: {
    backgroundColor: "#25D366",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "20px",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightPanel: {
    backgroundColor: "var(--surface)",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    position: "sticky",
    top: "20px",
  },
  clientCard: {
    backgroundColor: "var(--surface)",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  clientAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "var(--background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    color: "var(--primary-color)",
    flexShrink: 0,
  },
  clientInfo: {
    flex: 1,
  },
  clientInfoItem: {
    margin: "5px 0",
    fontSize: "14px",
    color: "var(--text-muted)",
  },
  clientInfoLabel: {
    fontWeight: "600",
    color: "var(--text-secondary)",
  },
  tableCard: {
    backgroundColor: "var(--surface)",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  tableHeader: {
    backgroundColor: "var(--background-soft)",
    textAlign: "left",
  },
  th: {
    padding: "12px",
    fontWeight: "600",
    fontSize: "14px",
    color: "var(--text-muted)",
    borderBottom: "2px solid var(--surface-border)",
  },
  td: {
    padding: "12px",
    fontSize: "14px",
    color: "var(--text-secondary)",
    borderBottom: "1px solid var(--surface-border)",
  },
  totalSection: {
    borderBottom: "2px solid var(--surface-border)",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  totalValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "var(--primary-color)",
    margin: "0 0 8px 0",
  },
  vendaInfo: {
    fontSize: "13px",
    color: "var(--text-muted)",
    margin: 0,
  },
  detailsSection: {
    borderBottom: "2px solid var(--surface-border)",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  detailItem: {
    margin: "12px 0",
    fontSize: "14px",
    color: "var(--text-secondary)",
    display: "flex",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontWeight: "600",
    color: "var(--text-muted)",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "var(--background-soft)",
    color: "var(--success-700)",
  },
  actionsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  btnAction: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s",
    position: "relative",
  },
  btnPrimary: {
    backgroundColor: "#1976d2",
    color: "white",
  },
  btnWarning: {
    backgroundColor: "#ff9800",
    color: "white",
  },
  btnDanger: {
    backgroundColor: "transparent",
    color: "#d32f2f",
    border: "1px solid #d32f2f",
  },
  dropdown: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    marginBottom: "8px",
    overflow: "hidden",
    zIndex: 10,
  },
  dropdownItem: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#333",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    maxWidth: "500px",
    width: "90%",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    fontSize: "16px",
    color: "#777",
  },
};

// Dados simulados
const dadosSimulados = {
  venda: {
    id: "001234",
    status: "concluída",
    data_venda: "2024-12-02T14:30:00",
    valor_total: 2850.0,
    total_bruto: 3000.0,
    descontos: 150.0,
    acrescimos: 0,
    nome_funcionario: "João Silva",
  },
  cliente: {
    nome: "Maria Santos",
    telefone: "16998887777",
    cpf_cnpj: "123.456.789-00",
    endereco: "Rua das Flores, 123 - Centro",
  },
  produtos: [
    {
      id: 1,
      produto_nome: "Notebook Dell Inspiron 15",
      preco_unitario: 2500.0,
      quantidade: 1,
      valor_total: 2500.0,
    },
    {
      id: 2,
      produto_nome: "Mouse Wireless Logitech",
      preco_unitario: 150.0,
      quantidade: 2,
      valor_total: 300.0,
    },
    {
      id: 3,
      produto_nome: "Teclado Mecânico RGB",
      preco_unitario: 200.0,
      quantidade: 1,
      valor_total: 200.0,
    },
  ],
  pagamentos: [
    { id: 1, valor: 1000.0, tipo_pagamento: "PIX" },
    { id: 2, valor: 1850.0, tipo_pagamento: "Cartão de Crédito" },
  ],
};

const DetalhesVenda = () => {
  const [escolherNotas, setEscolherNotas] = useState(false);
  const [escolherEditar, setEscolherEditar] = useState(false);
  const [loading, setLoading] = useState(true);

  const [dataVenda, setDataVenda] = useState({});

  const { id } = useParams();

  const buscarVenda = async () => {
    const res = await vendaFetch.vendaID(id);
    setDataVenda(res);
    setLoading(false);
  };

  useEffect(() => {
    buscarVenda();
  }, [id]);

  const handleEnviarWhatsApp = useCallback(() => {
    return;
  }, []);

  const handleDownloadNota = useCallback((tipo) => {
    setEscolherNotas(false);
  }, []);

  const handleAmortizar = useCallback(() => {
    setEscolherEditar(false);
  }, []);

  const handleEditarVenda = useCallback(() => {
    setEscolherEditar(false);
  }, []);

  const handleCancelarVenda = useCallback(() => {
    return;
  }, []);

  const TabelaProdutos = () => (
    <table style={styles.table}>
      <thead style={styles.tableHeader}>
        <tr>
          <th style={styles.th}>Produto</th>
          <th style={styles.th}>Valor Unitário</th>
          <th style={styles.th}>Quantidade</th>
          <th style={styles.th}>Total</th>
        </tr>
      </thead>
      <tbody>
        {dataVenda.itens.map((produto) => {
          return (
            <tr key={produto.id_item}>
              <td style={styles.td}>{produto.nome_produto}</td>
              <td style={styles.td}>
                {format.formatarCurrency(produto.preco_unitario)}
              </td>
              <td style={styles.td}>{produto.quantidade}</td>
              <td style={styles.td}>
                {format.formatarCurrency(produto.subtotal)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Detalhes da Venda</h1>
        <button
          style={styles.btnEnviar}
          onClick={handleEnviarWhatsApp}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#20BA5A")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#25D366")
          }
        >
          <FaWhatsapp size={18} />
          Enviar Detalhes
        </button>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftPanel}>
          {/* Card do Cliente */}
          <div style={styles.clientCard}>
            <div style={styles.clientAvatar}>
              <FaRegUser />
            </div>
            <div style={styles.clientInfo}>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>Nome: </span>
                {dataVenda.cliente.nome}
              </p>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>Telefone: </span>
                {format.formatarTelefone(dataVenda.cliente.telefone)}
              </p>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>CPF: </span>
                {format.formatCPF(dataVenda.cliente.cpfCNPJ)}
              </p>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>Endereço: </span>
                {dataVenda.cliente.endereco[0].bairro +
                  " - " +
                  dataVenda.cliente.endereco[0].rua +
                  " - " +
                  dataVenda.cliente.endereco[0].complemento}
              </p>
            </div>
          </div>

          {/* Tabela de Produtos */}
          <div style={styles.tableCard}>
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--primary-color)",
              }}
            >
              Produtos
            </h3>
            {<TabelaProdutos />}
          </div>
        </div>

        {/* Painel Direito */}
        <div style={styles.rightPanel}>
          {/* Valor Total */}
          <div style={styles.totalSection}>
            <h2 style={styles.totalValue}>
              {format.formatarCurrency(dataVenda.valor_liquido)}
            </h2>
            <p style={styles.vendaInfo}>
              Venda #{dataVenda.id_venda} • {format.formatDate(dataVenda.data)}{" "}
              • {format.formatarHora(dataVenda.data)}
            </p>
          </div>

          {/* Detalhes */}
          <div style={styles.detailsSection}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Total Bruto:</span>
              <span>{format.formatarCurrency(dataVenda.valor_bruto)}</span>
            </div>

            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Descontos:</span>
              <span>
                {`${format.formatarCurrency(dataVenda.desconto_real)} / ${
                  dataVenda.desconto_porcentagem
                } %`}
              </span>
            </div>

            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Acréscimos:</span>
              <span>
                {`${format.formatarCurrency(dataVenda.acrescimo_real)} / ${
                  dataVenda.acrescimo_porcentagem
                } %`}
              </span>
            </div>

            <div style={{ ...styles.detailItem, marginTop: "16px" }}>
              <span style={styles.detailLabel}>Status:</span>
              <span style={styles.statusBadge}>
                {dataVenda.status}
              </span>
            </div>

            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Vendedor:</span>
              <span>{dataVenda.vendedor.nome}</span>
            </div>

            <div
              style={{
                ...styles.detailItem,
                marginTop: "16px",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={styles.detailLabel}>Pagamentos:</span>
              {dataVenda.pagamentos.map((pag) => (
                <div
                  key={pag.id}
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    paddingLeft: "8px",
                  }}
                >
                  • {format.formatarCurrency(pag.valor)} - {pag.forma}
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div style={styles.actionsSection}>
            <div style={{ position: "relative" }}>
              {escolherNotas && (
                <div style={styles.dropdown}>
                  <div
                    style={styles.dropdownItem}
                    onClick={() => handleDownloadNota("Nota Fiscal")}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    <FaReceipt size={14} />
                    Nota Grande
                  </div>
                  <div
                    style={styles.dropdownItem}
                    onClick={() => handleDownloadNota("Carnê")}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    <FaMoneyBillWave size={14} />
                    Carnê Crediário
                  </div>
                </div>
              )}
              <button
                style={{ ...styles.btnAction, ...styles.btnPrimary }}
                onClick={() => setEscolherNotas(!escolherNotas)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1565c0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1976d2")
                }
              >
                <FaFilePdf size={16} />
                Gerar Documentos
              </button>
            </div>

            <div style={{ position: "relative" }}>
              {escolherEditar && (
                <div style={styles.dropdown}>
                  <div
                    style={styles.dropdownItem}
                    onClick={handleAmortizar}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    <FaMoneyBillWave size={14} />
                    Amortizar Crediário
                  </div>

                  <div style={styles.dropdownItem} onClick={handleEditarVenda}>
                    <FaEdit size={14} />
                    Editar Venda
                  </div>
                </div>
              )}
              <button
                style={{ ...styles.btnAction, ...styles.btnWarning }}
                onClick={() => setEscolherEditar(!escolherEditar)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f57c00")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ff9800")
                }
              >
                <FaEdit size={16} />
                Editar Venda
              </button>
            </div>

            <button
              style={{ ...styles.btnAction, ...styles.btnDanger }}
              onClick={handleCancelarVenda}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--surface-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FaTrash size={16} />
              Cancelar Venda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesVenda;
