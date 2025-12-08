import { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaShoppingCart } from "react-icons/fa";
import format from "../../utils/formatters";
import estoqueFetch from "../../services/api/estoqueFetch";
import Select from "react-select";
import FaturarVenda from "./components/FaturarVenda";

const styles = {
  container: {
    marginLeft: "40px",
    minHeight: "95vh",
    padding: "15px",
  },
  header: {
    backgroundColor: "var(--surface)",
    padding: "10px 20px",
    borderRadius: "12px",
    marginBottom: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "600",
    color: "var(--text-secondary)",
  },
  headerDate: {
    margin: 0,
    fontSize: "16px",
    color: "var(--text-secondary)",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "580px 1fr",
    gap: "10px",
    height: "calc(100vh - 180px)",
  },
  leftPanel: {
    backgroundColor: "var(--surface)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },
  searchWrapper: {
    position: "relative",
    marginBottom: "15px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
    fontSize: "18px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "10px",
    padding: "15px",
    backgroundColor: "var(--surface-strong)",
    borderRadius: "8px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-muted)",
    marginBottom: "5px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "16px",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  formGroup: {
    marginBottom: "10px",
  },
  input: {
    width: "80%",
    padding: "12px",
    fontSize: "15px",
    border: "2px solid var(--surface-border)",
    backgroundColor: "var(--surface)",
    color: "var(--text-secondary)",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: "8px",
    transition: "border-color 0.2s",
    outline: "none",
  },
  addButton: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "var(--primary-color)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px",
  },
  totalSection: {
    marginTop: "auto",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  },
  totalLabel: {
    fontSize: "14px",
    color: "var(--text-muted)",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "var(--success-700)",
    margin: 0,
  },
  rightPanel: {
    backgroundColor: "var(--surface)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  tableWrapper: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "20px",
    maxHeight: "380px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px 8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-muted)",
    borderBottom: "2px solid var(--surface-border)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "15px 8px",
    fontSize: "15px",
    color: "var(--text-secondary)",
    borderBottom: "1px solid var(--surface-border)",
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "var(--error-700)",
    cursor: "pointer",
    fontSize: "18px",
    padding: "5px 10px",
    transition: "color 0.2s",
  },
  faturarButton: {
    width: "100%",
    padding: "16px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "var(--success-700)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "var(--text-secondary)",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px",
    opacity: 0.3,
  },
  emptyText: {
    fontSize: "18px",
    fontWeight: "500",
  },

  variacoesContainer: {
    marginBottom: "24px",
    background: "var(--surface-strong)",
    padding: "16px",
    borderRadius: "12px",
  },
  variacoesTitle: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: "12px",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  variacoesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "8px",
  },
  variacaoButton: {
    padding: "12px",
    background: "var(--surface-border)",
    borderRadius: "8px",
    color: "var(--text-primary)",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
  },
  variacaoButtonActive: {
    background: "var(--primary-hover)",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#16162a",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  modalTitle: {
    fontSize: "24px",
    marginBottom: "24px",
    color: "#ffffff",
  },
  modalSection: {
    marginBottom: "24px",
  },
  modalLabel: {
    display: "block",
    fontSize: "14px",
    color: "#8e8ea0",
    marginBottom: "8px",
    fontWeight: "600",
  },
  modalInput: {
    width: "100%",
    padding: "12px",
    background: "#1a1a2e",
    border: "1px solid #2d2d44",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    outline: "none",
  },
  modalButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  modalButton: {
    flex: 1,
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  tipoToggle: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
  },
  tipoButton: {
    flex: 1,
    padding: "8px",
    background: "#1a1a2e",
    border: "1px solid #2d2d44",
    borderRadius: "8px",
    color: "#ffffff",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  tipoButtonActive: {
    background: "#6c5ce7",
    borderColor: "#6c5ce7",
  },
};

function Pdv() {
  const Data = new Date();
  const log = `${String(Data.getDate()).padStart(2, "0")}/${String(
    Data.getMonth() + 1
  ).padStart(2, "0")}/${Data.getFullYear()}`;

  const [resultadoProdutos, setResultadoProdutos] = useState([]);
  const [produto, setProduto] = useState("Selecione um produto");
  const [precovenda, setPreçovenda] = useState(0);
  const [emestoque, setEmestoque] = useState(0);
  const [quantidadeProduto, setQuantidadeProduto] = useState(1);
  const [id_produto, setId_produto] = useState("");
  const [arrayVenda, setArrayVenda] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  // Novos estados para variações
  const [variacoesProduto, setVariacoesProduto] = useState([]);
  const [variacaoSelecionada, setVariacaoSelecionada] = useState(null);
  const [mostrarVariacoes, setMostrarVariacoes] = useState(false);

  // Estados para finalização
  const [mostrarModalFinalizar, setMostrarModalFinalizar] = useState(false);
  const [desconto, setDesconto] = useState({ tipo: "real", valor: 0 });
  const [acrescimo, setAcrescimo] = useState({ tipo: "real", valor: 0 });
  const [formaPagamento, setFormaPagamento] = useState("dinheiro");
  const [valorPagamento, setValorPagamento] = useState(0);

  const listaProdutos = async () => {
    const produtos = await estoqueFetch.lista();
    setResultadoProdutos(produtos);
  };

  useEffect(() => {
    listaProdutos();
  }, []);

  const renderInfoProduto = (e) => {
    const selectedId = parseInt(e.value);
    const produtoSelecionado = resultadoProdutos.find(
      (p) => p.id_produto === selectedId
    );

    if (produtoSelecionado) {
      setProduto(produtoSelecionado.nome);
      setId_produto(produtoSelecionado.id_produto);
      setPreçovenda(produtoSelecionado.preco_venda);

      // Verificar se o produto tem variações
      if (
        produtoSelecionado.variacao &&
        produtoSelecionado.variacao.length > 0
      ) {
        setVariacoesProduto(produtoSelecionado.variacao);
        setMostrarVariacoes(true);
        setVariacaoSelecionada(null);
        setEmestoque(0); // Estoque será definido ao selecionar variação
      } else {
        setVariacoesProduto([]);
        setMostrarVariacoes(false);
        setVariacaoSelecionada(null);
        // Para produtos sem variação, usar o estoque do produto principal
        setEmestoque(produtoSelecionado.estoque || 0);
      }
    }
  };

  const selecionarVariacao = (variacao) => {
    setVariacaoSelecionada(variacao);
    setEmestoque(variacao.estoque);
  };

  const adidiconarArrayDeVenda = (e) => {
    e.preventDefault();

    if (
      !id_produto ||
      isNaN(precovenda) ||
      isNaN(quantidadeProduto) ||
      quantidadeProduto <= 0
    ) {
      alert("Por favor, selecione um produto e informe uma quantidade válida.");
      return;
    }

    // Verificar se precisa de variação
    if (mostrarVariacoes && !variacaoSelecionada) {
      alert("Por favor, selecione uma variação do produto.");
      return;
    }

    const chaveItem = variacaoSelecionada
      ? `${id_produto}-${variacaoSelecionada.id_variacao}`
      : `${id_produto}`;

    const index = arrayVenda.findIndex((item) => item.chave === chaveItem);

    if (index !== -1) {
      const novaArrayVenda = [...arrayVenda];
      novaArrayVenda[index].quantidade += Number(quantidadeProduto);
      novaArrayVenda[index].subtotal =
        novaArrayVenda[index].quantidade * novaArrayVenda[index].preco_unitario;
      setArrayVenda(novaArrayVenda);
    } else {
      const descricaoVariacao = variacaoSelecionada
        ? ` - ${variacaoSelecionada.nome} (${variacaoSelecionada.tipo})`
        : "";

      const objetoDaVenda = {
        chave: chaveItem,
        id_produto: id_produto,
        id_variacao: variacaoSelecionada
          ? variacaoSelecionada.id_variacao
          : null,
        produto_nome: produto + descricaoVariacao,
        quantidade: quantidadeProduto,
        preco_unitario: precovenda,
        subtotal: precovenda * quantidadeProduto,
      };
      setArrayVenda([...arrayVenda, objetoDaVenda]);
    }

    setValorTotal(
      (prevValorTotal) => prevValorTotal + precovenda * quantidadeProduto
    );
    setQuantidadeProduto(1);
    setVariacaoSelecionada(null);
  };

  const deleteItem = (idIndex, valorMenos) => {
    const novaVenda = [...arrayVenda];
    novaVenda.splice(idIndex, 1);
    setArrayVenda(novaVenda);
    setValorTotal((prevValorTotal) => prevValorTotal - valorMenos);
  };

  const resetarTudo = () => {
    setArrayVenda([]);
    setValorTotal(0);
    setMostrarModalFinalizar(false);
    setProduto("Selecione um produto");
    setId_produto("");
    setPreçovenda(0);
    setEmestoque(0);
    setDesconto({ tipo: "real", valor: 0 });
    setAcrescimo({ tipo: "real", valor: 0 });
    setFormaPagamento("dinheiro");
    setValorPagamento(0);
    setMostrarVariacoes(false);
    setVariacoesProduto([]);
    setVariacaoSelecionada(null);
  };

  const optionsProdutos = resultadoProdutos.map((resultProdutos) => ({
    value: resultProdutos.id_produto,
    label: resultProdutos.nome,
  }));

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--surface-strong)",
      borderColor: "var(--surface-border)",
      padding: "6px",
      borderRadius: "12px",
      boxShadow: "none",
      ":hover": {
        borderColor: "var(--surface-border)",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "var(--surface-strong)",
      borderRadius: "10px",
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "var(--text-primary)",
      fontWeight: 600,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "var(--surface-strong)"
        : "transparent",
      color: "var(--text-primary)",
      cursor: "pointer",
    }),
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.headerTitle}>Nova Venda</h2>
        <p style={styles.headerDate}>{log}</p>
      </header>

      <div style={styles.mainContent}>
        <div style={styles.leftPanel}>
          <div style={styles.searchWrapper}>
            <FaSearch style={styles.searchIcon} />
            <Select
              styles={customStyles}
              placeholder="Produto"
              options={optionsProdutos}
              onChange={(e) => renderInfoProduto(e)}
            />
          </div>

          {mostrarVariacoes && (
            <div style={styles.variacoesContainer}>
              <div style={styles.variacoesTitle}>Selecione a Variação</div>
              <div style={styles.variacoesGrid}>
                {variacoesProduto.map((variacao) => (
                  <button
                    key={variacao.id_variacao}
                    style={{
                      ...styles.variacaoButton,
                      ...(variacaoSelecionada?.id_variacao ===
                      variacao.id_variacao
                        ? styles.variacaoButtonActive
                        : {}),
                    }}
                    onClick={() => selecionarVariacao(variacao)}
                  >
                    <div>{variacao.nome}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        marginTop: "4px",
                        color: "var(--text-muted, #666)",
                      }}
                    >
                      {variacao.tipo}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--text-muted, #666)",
                        marginTop: "4px",
                      }}
                    >
                      Estoque: {variacao.estoque}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Produto</span>
              <span style={styles.infoValue}>{produto}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Preço</span>
              <span style={styles.infoValue}>
                {format.formatarCurrency(precovenda)}
              </span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Em Estoque</span>
              <span style={styles.infoValue}>{emestoque} un.</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Quantidade</span>
              <input
                type="number"
                min={1}
                step="1"
                value={quantidadeProduto}
                onChange={(e) => setQuantidadeProduto(Number(e.target.value))}
                style={styles.input}
              />
            </div>
          </div>

          <button style={styles.addButton} onClick={adidiconarArrayDeVenda}>
            Adicionar Item
          </button>

          <div style={styles.totalSection}>
            <div style={styles.totalLabel}>TOTAL DA VENDA</div>
            <h1 style={styles.totalValue}>
              {format.formatarCurrency(valorTotal)}
            </h1>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.tableWrapper}>
            {arrayVenda.length === 0 ? (
              <div style={styles.emptyState}>
                <FaShoppingCart style={styles.emptyIcon} />
                <p style={styles.emptyText}>Nenhum item adicionado à venda</p>
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Produto</th>
                    <th style={styles.th}>Preço Unit.</th>
                    <th style={styles.th}>Qtd.</th>
                    <th style={styles.th}>Total</th>
                    <th style={styles.th}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {arrayVenda.map((venda, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{venda.produto_nome}</td>
                      <td style={styles.td}>
                        {format.formatarCurrency(venda.preco_unitario)}
                      </td>
                      <td style={styles.td}>{venda.quantidade}</td>
                      <td style={styles.td}>
                        {format.formatarCurrency(venda.subtotal)}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.deleteButton}
                          onClick={() => deleteItem(index, venda.subtotal)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <button
            style={{
              ...styles.faturarButton,
              opacity: arrayVenda.length === 0 ? 0.5 : 1,
              cursor: arrayVenda.length === 0 ? "not-allowed" : "pointer",
            }}
            onClick={() => setMostrarModalFinalizar(true)}
            disabled={arrayVenda.length === 0}
          >
            <FaShoppingCart />
            <span>Faturar Venda (F2)</span>
          </button>
        </div>
      </div>
      {mostrarModalFinalizar && <FaturarVenda onClose={() => setMostrarModalFinalizar(false)} reset={resetarTudo}/>}
    </div>
  );
}

export default Pdv;
