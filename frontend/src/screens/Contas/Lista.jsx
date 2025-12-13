import { useState, useEffect } from "react";
import format from "../../utils/formatters";
import contaFetch from "../../services/api/contaFetch";

//icones
import { FaSearch, FaPlus, FaEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { MdAttachMoney } from "react-icons/md";

import Table from "../../components/ui/tabelas/Table";
import CardConfirmacao from "../../components/ui/modal/CardConfirmacao";
import Select from "react-select";
import Modal from "../../components/ui/modal/Modal";

const columns = [
  { header: "Status", key: "status" },
  { header: "Vencimento", key: "data_vencimento" },
  { header: "Valor", key: "valor" },
  { header: "Categoria", key: "categoria" },
  { header: "Fornecedor", key: "fornecedor" },
];

const styles = {
  container: {
    marginLeft: "44px",
    padding: "10px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  statsContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    flex: 1,
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: "var(--surface-strong)",
    border: "1px solid var(--surface-border)",
  },
  statLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: "4px",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--text-primary)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "16px",
  },
  searchContainer: {
    display: "flex",
    gap: "8px",
    flex: 1,
    maxWidth: "500px",
  },
  addButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease",
  },
  input: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    fontSize: "14px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    outline: "none",
  },
  searchButton: {
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    border: "1px solid var(--surface-border)",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
};

function CadastrarConta({ onClose, onNovaConta }) {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const [formNovaConta, setFormNovaConta] = useState({
    id_categoria_movimentacao: null,
    id_subcategoria_movimentacao: null,
    fornecedor: "",
    valor: 0,
    data_vencimento: null,
    observacoes: "",
  });

  const buscarCategorias = async () => {
    const responsse = await contaFetch.listaCategoria();
    setCategorias(responsse);
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  const styles = {
    title: {
      margin: "0 0 24px 0",
      fontSize: "24px",
      fontWeight: "600",
      color: "var(--text-primary)",
    },
    categoriesContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "20px",
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "var(--text-secondary)",
    },
    input: {
      padding: "10px 12px",
      fontSize: "14px",
      border: "1px solid var(--surface-border)",
      borderRadius: "6px",
      outline: "none",
      transition: "all 0.2s ease",
      backgroundColor: "var(--background)",
      color: "var(--text-primary)",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      marginTop: "24px",
      justifyContent: "flex-end",
    },
    buttonCancel: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      border: "1px solid var(--surface-border)",
      borderRadius: "6px",
      backgroundColor: "var(--background)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    buttonSave: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "var(--primary-color)",
      color: "var(--text-inverse)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  const changeCategoria = (valor) => {
    setFormNovaConta({
      ...formNovaConta,
      id_subcategoria_movimentacao: null,
      id_categoria_movimentacao: valor,
    });
    const categoriasFiltradas = categorias.find(
      (e) => e.id_categoria_movimentacao === valor
    );
    setSubcategorias(categoriasFiltradas.subcategorias);
  };

  const optionsCategorias = categorias.map((dados) => {
    return {
      label: dados.nome,
      value: dados.id_categoria_movimentacao,
    };
  });

  const optionsSubcategorias = subcategorias.map((dados) => {
    return {
      label: dados.nome,
      value: dados.id_subcategoria_movimentacao,
    };
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--background-color)",
      borderColor: "var(--surface-border)",
      padding: "6px",
      width: "100%",
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
    <Modal onClose={onClose} style={{ width: "500px" }}>
      <h2 style={styles.title}>Nova Conta</h2>

      <div style={styles.categoriesContainer}>
        <div style={styles.fieldGroup}>
          <span style={styles.label}>Categoria:</span>
          <Select
            styles={customStyles}
            options={optionsCategorias}
            onChange={(e) => changeCategoria(e.value)}
          />
        </div>
        <div style={styles.fieldGroup}>
          <span style={styles.label}>Subcategoria:</span>
          <Select
            styles={customStyles}
            options={optionsSubcategorias}
            onChange={(e) =>
              setFormNovaConta({
                ...formNovaConta,
                id_subcategoria_movimentacao: e.value,
              })
            }
          />
        </div>
      </div>

      <div style={styles.categoriesContainer}>
        <div style={styles.fieldGroup}>
          <span style={styles.label}>Valor:</span>
          <input
            type="number"
            min={1}
            onChange={(e) =>
              setFormNovaConta({ ...formNovaConta, valor: e.target.value })
            }
            placeholder="R$ 150,00"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--primary-color)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--surface-border)")
            }
          />
        </div>

        <div style={styles.fieldGroup}>
          <span style={styles.label}>Data vencimento:</span>
          <input
            onChange={(e) =>
              setFormNovaConta({
                ...formNovaConta,
                data_vencimento: e.target.value,
              })
            }
            type="date"
            style={styles.input}
            onFocus={(e) =>
              (e.target.style.borderColor = "var(--primary-color)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--surface-border)")
            }
          />
        </div>
      </div>

      <div style={{ ...styles.fieldGroup, marginBottom: "20px" }}>
        <span style={styles.label}>Fornecedor:</span>
        <input
          type="text"
          onChange={(e) =>
            setFormNovaConta({ ...formNovaConta, fornecedor: e.target.value })
          }
          placeholder="Provedor de internet..."
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary-color)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--surface-border)")}
        />
      </div>

      <div style={styles.fieldGroup}>
        <span style={styles.label}>Obaservaçoes:</span>
        <input
          onChange={(e) =>
            setFormNovaConta({ ...formNovaConta, observacoes: e.target.value })
          }
          placeholder="Juros de 1% ao dia..."
          type="text"
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary-color)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--surface-border)")}
        />
      </div>

      <div style={styles.buttonContainer}>
        <button
          style={styles.buttonCancel}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--surface)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--background)";
          }}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          onClick={() => onNovaConta(formNovaConta)}
          style={styles.buttonSave}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--primary-color)";
          }}
        >
          Salvar nova conta
        </button>
      </div>
    </Modal>
  );
}

function PagarConta({ onClose, dadosConta , onPagarConta }) {
  const [formPagamento, setFormPagamento] = useState({
    valor_pago: Number(
      dadosConta.valor
        .replace("R$", "")
        .replace(/\s/g, "")
        .replace(".", "")
        .replace(",", ".")
    ),
    data_pagamento: new Date().toISOString().split("T")[0],
  });

  const styles = {
    title: {
      margin: "0 0 24px 0",
      fontSize: "24px",
      fontWeight: "600",
      color: "var(--text-primary)",
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "20px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "var(--text-secondary)",
    },
    input: {
      padding: "10px 12px",
      fontSize: "14px",
      border: "1px solid var(--surface-border)",
      borderRadius: "6px",
      outline: "none",
      transition: "all 0.2s ease",
      backgroundColor: "var(--background)",
      color: "var(--text-primary)",
    },
    infoCard: {
      padding: "16px",
      backgroundColor: "var(--surface-strong)",
      border: "1px solid var(--surface-border)",
      borderRadius: "8px",
      marginBottom: "24px",
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    infoLabel: {
      fontSize: "13px",
      color: "var(--text-muted)",
      fontWeight: "500",
    },
    infoValue: {
      fontSize: "14px",
      color: "var(--text-primary)",
      fontWeight: "600",
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      marginTop: "24px",
      justifyContent: "flex-end",
    },
    buttonCancel: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      border: "1px solid var(--surface-border)",
      borderRadius: "6px",
      backgroundColor: "var(--background)",
      color: "var(--text-secondary)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    buttonConfirm: {
      padding: "10px 20px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "var(--primary-color)",
      color: "var(--text-inverse)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <Modal onClose={onClose} style={{ width: "500px" }}>
      <h2 style={styles.title}>Confirmar Pagamento</h2>

      {/* Informações da Conta */}
      <div style={styles.infoCard}>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Fornecedor:</span>
          <span style={styles.infoValue}>{dadosConta?.fornecedor || "-"}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Valor Original:</span>
          <span style={styles.infoValue}>{dadosConta?.valor || "-"}</span>
        </div>
        <div style={{ ...styles.infoRow, marginBottom: 0 }}>
          <span style={styles.infoLabel}>Vencimento:</span>
          <span style={styles.infoValue}>
            {dadosConta?.data_vencimento || "-"}
          </span>
        </div>
      </div>

      {/* Formulário de Pagamento */}
      <div style={styles.fieldGroup}>
        <span style={styles.label}>Valor Pago:</span>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="R$ 0,00"
          value={formPagamento.valor_pago}
          onChange={(e) =>
            setFormPagamento({ ...formPagamento, valor_pago: e.target.value })
          }
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary-color)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--surface-border)")}
        />
      </div>

      <div style={styles.fieldGroup}>
        <span style={styles.label}>Data do Pagamento:</span>
        <input
          type="date"
          value={formPagamento.data_pagamento}
          onChange={(e) =>
            setFormPagamento({
              ...formPagamento,
              data_pagamento: e.target.value,
            })
          }
          style={styles.input}
          onFocus={(e) => (e.target.style.borderColor = "var(--primary-color)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--surface-border)")}
        />
      </div>

      {/* Botões de Ação */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.buttonCancel}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--surface)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--background)";
          }}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          style={styles.buttonConfirm}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "var(--primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "var(--primary-color)";
          }}
          onClick={() => {
            onPagarConta(dadosConta.id_conta ,formPagamento)
          }}
        >
          Confirmar Pagamento
        </button>
      </div>
    </Modal>
  );
}

function ContasAPagar() {
  const [contasPagar, setContasPagar] = useState([]);
  const [contasPagarData, setContasPagarData] = useState([]);
  const [contaSelecionada, setContaSelecionada] = useState({});
  const [busca, setBusca] = useState("");

  const [showModal, setShowModal] = useState(null);

  const HandlePagarConta = (row) => {
    setContaSelecionada(row);
    setShowModal("FaturarConta");
  };

  const HandleExcluirConta = (row) => {
    setContaSelecionada(row);
    setShowModal("ExcluirConta");
  };

  const confirmaExcluir = async () => {
    await contaFetch.deletar(contaSelecionada.id_conta);
    buscarContas();
    setShowModal(null);
  };

  const actions = [
    {
      label: <FaEdit size={16} />,
      type: "edit",
      onClick: (row, index) => {
        navigate(`/clientes/detalhes/${row.id}`);
      },
    },
    {
      label: <Trash2 size={16} />,
      type: "delete",
      onClick: (row, index) => {
        HandleExcluirConta(row);
      },
    },
    {
      label: <MdAttachMoney size={16} />,
      type: "faturar",
      onClick: (row, index) => {
        HandlePagarConta(row);
      },
    },
  ];

  const renderModal = () => {
    switch (showModal) {
      case "NovaConta":
        return (
          <CadastrarConta
            onClose={() => setShowModal(null)}
            onNovaConta={onNovaConta}
          />
        );
        break;
      case "ExcluirConta":
        return (
          <CardConfirmacao
            onClose={() => setShowModal(null)}
            text={`Deseja confirmar a exclusão desta conta ?`}
            subText={"Esses dados não poderão ser recuperados posteriormente."}
            action={confirmaExcluir}
          />
        );
        break;
      case "EditarConta":
        return;
        break;
      case "FaturarConta":
        return (
          <PagarConta
            onClose={() => setShowModal(null)}
            dadosConta={contaSelecionada}
            onPagarConta={onPagarConta}
          />
        );
        break;
      case null:
        return null;
        break;
    }
  };

  const onNovaConta = async (dados) => {
    await contaFetch.cadastro(dados);
    buscarContas();
    setShowModal(null);
  };

  const onPagarConta = async (id ,dados) => {
    await contaFetch.pagarConta(id ,dados)
    buscarContas()
    setShowModal(null)
  }

  const calcularEstatisticas = () => {
    const total = contasPagar.reduce((acc, conta) => acc + conta.valor, 0);
    const vencidas = contasPagar.filter((c) => c.status === "Vencida").length;
    const pendentes = contasPagar.filter((c) => c.status === "Pendente").length;

    return { total, vencidas, pendentes };
  };

  const buscarContas = async () => {
    const response = await contaFetch.lista();
    setContasPagar(response);

    const resFormated = response.map((dados) => {
      return {
        id_conta: dados.id_conta,
        status: dados.status,
        categoria: dados?.categoria?.nome || "Categoria não selecionada",
        data_vencimento: format.formatDate(dados.data_vencimento),
        valor: format.formatarCurrency(dados.valor),
        fornecedor: dados.fornecedor,
      };
    });

    setContasPagarData(resFormated);
  };

  const filtrarContas = () => {
    if (!busca) return contasPagar;

    return contasPagar.filter(
      (conta) =>
        conta.fornecedor?.toLowerCase().includes(busca.toLowerCase()) ||
        conta.categoria?.toLowerCase().includes(busca.toLowerCase())
    );
  };

  const abrirModal = (tipo, dados = {}) => {
    setDadosConta(dados);
    setAbaSobreposta(tipo);
  };

  useEffect(() => {
    buscarContas();
  }, []);

  const stats = calcularEstatisticas();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Contas a Pagar</h2>
      </div>

      {/* Estatísticas */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total a Pagar</div>
          <div style={styles.statValue}>
            {format.formatarCurrency(stats.total)}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Vencidas</div>
          <div style={{ ...styles.statValue, color: "var(--error-500)" }}>
            {stats.vencidas}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Pendentes</div>
          <div style={{ ...styles.statValue, color: "var(--warning-500)" }}>
            {stats.pendentes}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <button
            style={styles.addButton}
            onClick={() => setShowModal("NovaConta")}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--primary-color)")
            }
          >
            <FaPlus /> Nova Conta
          </button>
          <input
            type="text"
            style={styles.input}
            placeholder="Buscar por fornecedor ou categoria..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button style={styles.searchButton}>
            <FaSearch />
          </button>
        </div>
      </div>
      <Table columns={columns} actions={actions} data={contasPagarData} />

      {renderModal()}
    </div>
  );
}

export default ContasAPagar;
