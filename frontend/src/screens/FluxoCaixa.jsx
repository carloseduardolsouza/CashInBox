import { useState, useEffect } from "react";

//icones
import { FaEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";

import Table from "../components/ui/tabelas/Table";

const columns = [
  { header: "Data", key: "data" },
  { header: "Tipo", key: "tipo" },
  { header: "Categoria", key: "categoria" },
  { header: "Descrição", key: "descricao" },
  { header: "Valor", key: "valor" },
];

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
      navigate(`/clientes/detalhes/${row.id}`);
    },
  },
];

// Simulação de dados da API
const mockMovimentacoes = [
  {
    id: 1,
    data: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "entrada",
    categoria: "Vendas",
    descricao: "Venda de produtos",
    valor: 2500.0,
  },
  {
    id: 2,
    data: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "saida",
    categoria: "Fornecedores",
    descricao: "Compra de materiais",
    valor: 850.0,
  },
  {
    id: 3,
    data: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "entrada",
    categoria: "Serviços",
    descricao: "Prestação de serviço",
    valor: 1200.0,
  },
  {
    id: 4,
    data: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "saida",
    categoria: "Despesas",
    descricao: "Aluguel",
    valor: 1500.0,
  },
  {
    id: 5,
    data: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "entrada",
    categoria: "Vendas",
    descricao: "Venda online",
    valor: 3200.0,
  },
  {
    id: 6,
    data: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "saida",
    categoria: "Salários",
    descricao: "Folha de pagamento",
    valor: 4500.0,
  },
  {
    id: 7,
    data: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    tipo: "entrada",
    categoria: "Vendas",
    descricao: "Venda de consultorias",
    valor: 5000.0,
  },
];

// Modais
function NovaEntrada({ fechar }) {
  const [formData, setFormData] = useState({
    valor: "",
    categoria: "Vendas",
    descricao: "",
  });

  const handleSubmit = () => {
    if (formData.valor && formData.descricao) {
      console.log("Nova entrada:", formData);
      fechar(null);
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={() => fechar(null)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Nova Entrada</h3>
          <button style={styles.closeButton} onClick={() => fechar(null)}>
            ×
          </button>
        </div>
        <div style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) =>
                setFormData({ ...formData, valor: e.target.value })
              }
              style={styles.input}
              placeholder="0,00"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              style={styles.select}
            >
              <option>Vendas</option>
              <option>Serviços</option>
              <option>Investimentos</option>
              <option>Outros</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              style={styles.textarea}
              placeholder="Descreva a entrada..."
              rows="3"
            />
          </div>
          <div style={styles.modalButtons}>
            <button style={styles.btnCancel} onClick={() => fechar(null)}>
              Cancelar
            </button>
            <button
              style={{
                ...styles.btnSubmit,
                backgroundColor: "var(--success-500)",
              }}
              onClick={handleSubmit}
            >
              Adicionar Entrada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NovaSaida({ fechar }) {
  const [formData, setFormData] = useState({
    valor: "",
    categoria: "Despesas",
    descricao: "",
  });

  const handleSubmit = () => {
    if (formData.valor && formData.descricao) {
      console.log("Nova saída:", formData);
      fechar(null);
    }
  };

  return (
    <div style={styles.modalOverlay} onClick={() => fechar(null)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Nova Saída</h3>
          <button style={styles.closeButton} onClick={() => fechar(null)}>
            ×
          </button>
        </div>
        <div style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) =>
                setFormData({ ...formData, valor: e.target.value })
              }
              style={styles.input}
              placeholder="0,00"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
              style={styles.select}
            >
              <option>Despesas</option>
              <option>Fornecedores</option>
              <option>Salários</option>
              <option>Impostos</option>
              <option>Outros</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              style={styles.textarea}
              placeholder="Descreva a saída..."
              rows="3"
            />
          </div>
          <div style={styles.modalButtons}>
            <button style={styles.btnCancel} onClick={() => fechar(null)}>
              Cancelar
            </button>
            <button
              style={{
                ...styles.btnSubmit,
                backgroundColor: "var(--error-500)",
              }}
              onClick={handleSubmit}
            >
              Adicionar Saída
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Principal
function FluxoDeCaixa() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [movimentacoesFiltradas, setMovimentacoesFiltradas] = useState([]);
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [modalAtiva, setModalAtiva] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [filtroPeriodo, setFiltroPeriodo] = useState(30);

  const formatarCurrency = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const filtrarPorPeriodo = (movs, dias) => {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - dias);
    return movs.filter((mov) => new Date(mov.data) >= dataLimite);
  };

  const filtrarPorTipo = (movs, tipo) => {
    if (tipo === "Todos") return movs;
    return movs.filter((mov) => mov.tipo === tipo.toLowerCase());
  };

  useEffect(() => {
    setMovimentacoes(mockMovimentacoes);
  }, []);

  useEffect(() => {
    const totalEntradas = movimentacoes.reduce(
      (acc, mov) => (mov.tipo === "entrada" ? acc + mov.valor : acc),
      0
    );
    const totalSaidas = movimentacoes.reduce(
      (acc, mov) => (mov.tipo === "saida" ? acc + mov.valor : acc),
      0
    );
    setSaldoAtual(totalEntradas - totalSaidas);
  }, [movimentacoes]);

  useEffect(() => {
    let movsFiltradas = filtrarPorPeriodo([...movimentacoes], filtroPeriodo);
    movsFiltradas = filtrarPorTipo(movsFiltradas, filtroTipo);
    setMovimentacoesFiltradas(movsFiltradas);
  }, [movimentacoes, filtroTipo, filtroPeriodo]);

  useEffect(() => {
    const totalEntradas = movimentacoesFiltradas.reduce(
      (acc, mov) => (mov.tipo === "entrada" ? acc + mov.valor : acc),
      0
    );
    const totalSaidas = movimentacoesFiltradas.reduce(
      (acc, mov) => (mov.tipo === "saida" ? acc + mov.valor : acc),
      0
    );
    setEntradas(totalEntradas);
    setSaidas(totalSaidas);
  }, [movimentacoesFiltradas]);

  return (
    <div style={styles.container}>
      {modalAtiva === "Entrada" && <NovaEntrada fechar={setModalAtiva} />}
      {modalAtiva === "Saida" && <NovaSaida fechar={setModalAtiva} />}

      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Fluxo de Caixa</h2>
          <p style={styles.subtitle}>Controle financeiro completo</p>
        </div>
        <div style={styles.headerButtons}>
          <button
            style={{
              ...styles.btnPrimary,
              backgroundColor: "var(--success-500)",
            }}
            onClick={() => setModalAtiva("Entrada")}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            + Nova Entrada
          </button>
          <button
            style={styles.btnSecondary}
            onClick={() => setModalAtiva("Saida")}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--background-soft)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--background)")
            }
          >
            + Nova Saída
          </button>
        </div>
      </div>

      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Saldo Atual</span>
            <div
              style={{ ...styles.cardIcon, backgroundColor: "var(--info-500)" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <div
            style={{
              ...styles.cardValue,
              color:
                saldoAtual >= 0 ? "var(--success-500)" : "var(--error-500)",
            }}
          >
            {formatarCurrency(saldoAtual)}
          </div>
          <p style={styles.cardSubtext}>Saldo total acumulado</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Entradas</span>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "var(--success-500)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
          </div>
          <div style={{ ...styles.cardValue, color: "var(--success-500)" }}>
            {formatarCurrency(entradas)}
          </div>
          <p style={styles.cardSubtext}>Últimos {filtroPeriodo} dias</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Saídas</span>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "var(--error-500)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                <polyline points="17 18 23 18 23 12" />
              </svg>
            </div>
          </div>
          <div style={{ ...styles.cardValue, color: "var(--error-500)" }}>
            {formatarCurrency(saidas)}
          </div>
          <p style={styles.cardSubtext}>Últimos {filtroPeriodo} dias</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Resultado</span>
            <div
              style={{
                ...styles.cardIcon,
                backgroundColor: "var(--chart-purple)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </div>
          <div
            style={{
              ...styles.cardValue,
              color:
                entradas - saidas >= 0
                  ? "var(--success-500)"
                  : "var(--error-500)",
            }}
          >
            {formatarCurrency(entradas - saidas)}
          </div>
          <p style={styles.cardSubtext}>Últimos {filtroPeriodo} dias</p>
        </div>
      </div>

      <div style={styles.tableSection}>
        <div style={styles.tableHeader}>
          <h2 style={styles.tableTitle}>Movimentações financeiras</h2>
          <div style={styles.filters}>
            <select
              style={styles.selectFilter}
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option>Todos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
            <select
              style={styles.selectFilter}
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(Number(e.target.value))}
            >
              <option value={30}>30 dias</option>
              <option value={60}>60 dias</option>
              <option value={90}>90 dias</option>
            </select>
          </div>
        </div>

        <Table columns={columns} data={mockMovimentacoes} actions={actions} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginLeft: "44px",
    padding: "1.5rem",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "0.95rem",
    margin: "0.25rem 0 0 0",
  },
  headerButtons: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  btnPrimary: {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "opacity 0.2s",
    color: "var(--text-inverse)",
  },
  btnSecondary: {
    padding: "0.75rem 1.5rem",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "background-color 0.2s",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "var(--background)",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--surface-border)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  cardTitle: {
    color: "var(--text-muted)",
    fontSize: "0.875rem",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  cardIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-inverse)",
  },
  cardValue: {
    fontSize: "1.875rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    lineHeight: "1",
  },
  cardSubtext: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    margin: 0,
  },
  tableSection: {
    backgroundColor: "var(--background)",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid var(--surface-border)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  tableTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  filters: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  selectFilter: {
    padding: "0.5rem 1rem",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    cursor: "pointer",
    outline: "none",
  },
  badge: {
    display: "inline-block",
    padding: "0.375rem 0.875rem",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "var(--background)",
    borderRadius: "12px",
    padding: "1.5rem",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "var(--text-muted)",
    lineHeight: "1",
    padding: 0,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "var(--text-secondary)",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    backgroundColor: "var(--background)",
    outline: "none",
  },
  select: {
    padding: "0.75rem",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    backgroundColor: "var(--background)",
    outline: "none",
    cursor: "pointer",
  },
  textarea: {
    padding: "0.75rem",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    backgroundColor: "var(--background)",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  modalButtons: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.5rem",
  },
  btnCancel: {
    flex: 1,
    padding: "0.75rem",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "0.95rem",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
  },
  btnSubmit: {
    flex: 1,
    padding: "0.75rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    fontSize: "0.95rem",
    color: "var(--text-inverse)",
  },
};

export default FluxoDeCaixa;
