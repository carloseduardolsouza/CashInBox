import { useState, useCallback, useMemo, useEffect, useContext, useRef } from "react";
import vendaFetch from "../../services/api/vendaFetch";
import { useParams, useNavigate } from "react-router-dom";
import format from "../../utils/formatters";
import Loading from "../../components/layout/Loading";
import CardConfirmacao from "../../components/ui/modal/CardConfirmacao";
import ModalCrediario from "../../components/shared/InfoCrediario";
import { pdf } from "@react-pdf/renderer";
import NotaGrande from "./components/NotaGrande";
import CarnePagamento from "./components/CarneCrediario";
import AppContext from "../../context/AppContext";
import { useClickOutside } from "../../hooks/useClickOutside";
import {
  FaRegUser,
  FaFilePdf,
  FaEdit,
  FaWhatsapp,
  FaTrash,
  FaReceipt,
  FaMoneyBillWave,
  FaTimes,
  FaDownload,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";

// Modal de Visualização de PDF
const PdfViewerModal = ({ isOpen, onClose, pdfUrl, fileName }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalPdfContainer}>
        {/* Header do Modal */}
        <div style={styles.modalPdfHeader}>
          <h2 style={styles.modalPdfTitle}>{fileName}</h2>
          <div style={styles.modalPdfActions}>
            <button
              style={styles.modalPdfButton}
              onClick={handleDownload}
              title="Baixar PDF"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FaDownload size={18} />
            </button>
            <button
              style={styles.modalPdfButton}
              onClick={onClose}
              title="Fechar"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f5f5f5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Visualizador de PDF */}
        <div style={styles.modalPdfContent}>
          <iframe
            src={pdfUrl}
            style={styles.modalPdfIframe}
            title="Visualizador de PDF"
          />
        </div>
      </div>
    </div>
  );
};

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
  backButton: {
    width: "40px",
    marginRight: "10px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    background: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
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
    gridTemplateColumns: "1fr 0.5fr",
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
  statusBadgeFinalizada: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "var(--background-soft)",
    color: "var(--success-700)",
  },
  statusBadgeOrcamento: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "var(--background-soft)",
    color: "var(--warning-700)",
  },
  actionsSection: {
    display: "flex",
    justifyContent: "space-around",
  },
  btnAction: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    padding: "10px",
    cursor: "pointer",
    fontSize: "13px",
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
  // Estilos do Modal PDF
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
  },
  modalPdfContainer: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "1400px",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  modalPdfHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f8f9fa",
  },
  modalPdfTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginRight: "20px",
  },
  modalPdfActions: {
    display: "flex",
    gap: "8px",
  },
  modalPdfButton: {
    padding: "8px 12px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    transition: "all 0.2s",
  },
  modalPdfContent: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#525659",
  },
  modalPdfIframe: {
    width: "100%",
    height: "100%",
    border: "none",
  },
};

const DetalhesVenda = () => {
  const [escolherNotas, setEscolherNotas] = useState(false);
  const [escolherEditar, setEscolherEditar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletarModal, setDeletarModal] = useState(false);

  const [modalAberta, setModalAberta] = useState(false);

  // Hooks fechar DropDown
  const ref = useRef(null)
  useClickOutside(ref , () => {setEscolherNotas(false); setEscolherEditar(false)})

  // Estados para o modal de PDF
  const [modalPdfAberto, setModalPdfAberto] = useState(false);
  const [pdfParaVisualizar, setPdfParaVisualizar] = useState(null);

  const { adicionarAviso } = useContext(AppContext);

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

  const handlePagarParcela = async (id, valor_pago, data_pagamento) => {
    const dados = {
      valor_pago: valor_pago,
      data_pagamento: data_pagamento,
    };
    await vendaFetch.darBaixaParcela(id, dados);

    buscarVenda();
  };

  const handleCancelarParcela = async (id) => {
      await vendaFetch.cancelarParela(id);
  
      // Recarrega a lista principal
      buscarVenda();
    }

  const fecharModal = () => {
    setModalAberta(false);
  };

  const handleEnviarWhatsApp = useCallback(() => {
    return;
  }, []);

  const handleVisualizarNota = async (tipo) => {
    let doc = null;

    switch (tipo) {
      case "notaGrande":
        doc = <NotaGrande venda={dataVenda} />;
        break;

      case "carneCrediario":
        doc = <CarnePagamento dados={dataVenda} />;
        break;

      default:
        console.error("Tipo de nota inválido:", tipo);
        return;
    }

    // Evita erro caso o DOC não exista
    if (!doc) {
      console.error("Nenhum documento React-PDF foi gerado.");
      return;
    }

    try {
      const asPdf = pdf();
      asPdf.updateContainer(doc);

      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);

      const nomeArquivo = `venda#${id} - ${tipo
        .replace(" ", "_")
        .toUpperCase()}.pdf`;

      setPdfParaVisualizar({ url, fileName: nomeArquivo });
      setModalPdfAberto(true);
      setEscolherNotas(false);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      adicionarAviso("erro", "Erro ao gerar o PDF. Tente novamente.");
    }
  };

  const fecharModalPdf = () => {
    if (pdfParaVisualizar?.url) {
      URL.revokeObjectURL(pdfParaVisualizar.url);
    }
    setModalPdfAberto(false);
    setPdfParaVisualizar(null);
  };

  const handleAmortizar = useCallback(() => {
    setEscolherEditar(false);
  }, []);

  const navigate = useNavigate();

  const handleCancelarVenda = useCallback(async () => {
    await vendaFetch.deletar(id);
    setDeletarModal(false);
    adicionarAviso("sucesso", "A venda foi deletada com sucesso !");
    navigate("/vendas/historico");
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
              <td style={styles.td}>
                {produto.nome_produto}{" "}
                {produto.nome_variacao ? `* ${produto.nome_variacao}` : ""}
              </td>
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
        <div style={{ display: "flex" }}>
          <button
            style={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} color="var(--text-primary)" />
          </button>
          <h1 style={styles.headerTitle}>Detalhes da Venda</h1>
        </div>
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
                {dataVenda?.cliente?.nome || "Nome Desconhecido"}
              </p>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>Telefone: </span>
                {format.formatarTelefone(
                  dataVenda?.cliente?.telefone || "Telefone Desconhecido"
                )}
              </p>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>CPF: </span>
                {format.formatCPF(
                  dataVenda?.cliente?.cpfCNPJ || "CPF / CNPJ Desconhecido"
                )}
              </p>
              <p style={styles.clientInfoItem}>
                <span style={styles.clientInfoLabel}>Endereço: </span>
                {dataVenda?.cliente?.endereco[0]?.bairro ||
                  "Bairro Desconhecido" +
                    " - " +
                    dataVenda?.cliente?.endereco[0]?.rua ||
                  "Rua Desconhecida" +
                    " - " +
                    dataVenda?.cliente?.endereco[0]?.complemento ||
                  "Complemento Desconhecido"}
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

            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Total Liquido:</span>
              <span>{format.formatarCurrency(dataVenda.valor_liquido)}</span>
            </div>

            <div style={{ ...styles.detailItem, marginTop: "16px" }}>
              <span style={styles.detailLabel}>Status:</span>
              <span
                style={
                  dataVenda.status === "Finalizada" ||
                  dataVenda.status === "Crediário pago"
                    ? styles.statusBadgeFinalizada
                    : styles.statusBadgeOrcamento
                }
              >
                {dataVenda.status}
              </span>
            </div>

            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>Vendedor:</span>
              <span>
                {dataVenda?.vendedor?.nome || "Vendedor Desconhecido"}
              </span>
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
                  key={pag.id_pagamento}
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    paddingLeft: "8px",
                  }}
                >
                  • {format.formatarCurrency(pag.valor)} - {pag.forma} -{" "}
                  {format.formatDate(pag.data_pagamento)}
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div style={styles.actionsSection} ref={ref}>
            <div style={{ position: "relative" }}>
              {escolherNotas && (
                <div style={styles.dropdown}>
                  <div
                    style={styles.dropdownItem}
                    onClick={() => handleVisualizarNota("notaGrande")}
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
                  {dataVenda.crediario && (
                    <div
                      style={styles.dropdownItem}
                      onClick={() => handleVisualizarNota("carneCrediario")}
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
                  )}
                </div>
              )}
              <button
                style={{ ...styles.btnAction, ...styles.btnPrimary }}
                onClick={() => {
                  setEscolherNotas(!escolherNotas);
                  setEscolherEditar(false);
                }}
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
            {dataVenda.crediario && (
              <div style={{ position: "relative" }}>
                {escolherEditar && (
                  <div style={styles.dropdown}>

                    <div
                      style={styles.dropdownItem}
                      onClick={() => setModalAberta(true)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "white")
                      }
                    >
                      <FaCircleInfo size={14} />
                      Detalhes Crediário
                    </div>
                  </div>
                )}

                <button
                  style={{ ...styles.btnAction, ...styles.btnWarning }}
                  onClick={() => {
                    setEscolherEditar(!escolherEditar), setEscolherNotas(false);
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f57c00")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff9800")
                  }
                >
                  <FaEdit size={16} />
                  Opções da Venda
                </button>
              </div>
            )}
          </div>
          <button
            style={{
              ...styles.btnAction,
              ...styles.btnDanger,
              marginTop: "10px",
            }}
            onClick={() => setDeletarModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <FaTrash size={16} />
            Deletar Venda
          </button>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {deletarModal && (
        <CardConfirmacao
          action={handleCancelarVenda}
          onClose={() => setDeletarModal(false)}
          text={`Deseja confirma a exclusão da venda de id: ${dataVenda.id_venda} ?`}
          subText={`esses dados não poderam ser recuperados posteriormente`}
        />
      )}

      {/* Modal de Visualização de PDF */}
      {pdfParaVisualizar && (
        <PdfViewerModal
          isOpen={modalPdfAberto}
          onClose={fecharModalPdf}
          pdfUrl={pdfParaVisualizar.url}
          fileName={pdfParaVisualizar.fileName}
        />
      )}

      <ModalCrediario
        onPagarParcela={handlePagarParcela}
        onClose={fecharModal}
        isOpen={modalAberta}
        crediario={dataVenda.crediario}
        onCancelarParcela={handleCancelarParcela}
      />
    </div>
  );
};

export default DetalhesVenda;
