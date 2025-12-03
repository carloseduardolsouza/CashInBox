import { useState, useEffect } from "react";
import format from "../../utils/formatters";

//icones
import { FaSearch,FaPlus,FaEdit} from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { MdAttachMoney } from "react-icons/md";

import Table from "../../components/ui/tabelas/Table";

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
  {
    label: <MdAttachMoney size={16} />,
    type: "faturar",
    onClick: (row, index) => {
      navigate(`/clientes/detalhes/${row.id}`);
    },
  },
];

const columns = [
  { header: "Status", key: "status" },
  { header: "Vencimento", key: "data_vencimento" },
  { header: "Valor", key: "valor_total" },
  { header: "Categoria", key: "categoria" },
  { header: "Fornecedor", key: "fornecedor" },
];

// Dados simulados
const dadosSimulados = [
  {
    id: 1,
    status: "pendente",
    data_vencimento: "2025-12-15",
    valor_total: 1500.00,
    categoria: "Fornecedores",
    fornecedor: "Tech Supplies LTDA"
  },
  {
    id: 2,
    status: "vencida",
    data_vencimento: "2025-11-28",
    valor_total: 850.50,
    categoria: "Aluguel",
    fornecedor: "Imobiliária Central"
  },
  {
    id: 3,
    status: "pendente",
    data_vencimento: "2025-12-20",
    valor_total: 2300.00,
    categoria: "Serviços",
    fornecedor: "Consultoria XYZ"
  },
  {
    id: 4,
    status: "vencida",
    data_vencimento: "2025-11-25",
    valor_total: 450.00,
    categoria: "Utilities",
    fornecedor: "Energia S.A."
  },
  {
    id: 5,
    status: "pendente",
    data_vencimento: "2025-12-10",
    valor_total: 3200.00,
    categoria: "Fornecedores",
    fornecedor: "Distribuidora ABC"
  }
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
    marginBottom: "10px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0
  },
  statsContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px"
  },
  statCard: {
    flex: 1,
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: "var(--surface-strong)",
    border: "1px solid var(--surface-border)"
  },
  statLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: "4px",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--text-primary)"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "16px"
  },
  searchContainer: {
    display: "flex",
    gap: "8px",
    flex: 1,
    maxWidth: "500px"
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
    transition: "all 0.2s ease"
  },
  input: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    fontSize: "14px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    outline: "none"
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
    transition: "all 0.2s ease"
  },
};

function ContasAPagar() {
  const [contasPagar, setContasPagar] = useState([]);
  const [busca, setBusca] = useState("");

  const calcularEstatisticas = () => {
    const total = contasPagar.reduce((acc, conta) => acc + conta.valor_total, 0);
    const vencidas = contasPagar.filter(c => c.status === 'vencida').length;
    const pendentes = contasPagar.filter(c => c.status === 'pendente').length;
    
    return { total, vencidas, pendentes };
  };

  const buscarContas = () => {
    setContasPagar(dadosSimulados);
  };

  const filtrarContas = () => {
    if (!busca) return contasPagar;
    
    return contasPagar.filter(conta => 
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
          <div style={styles.statValue}>{format.formatarCurrency(stats.total)}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Vencidas</div>
          <div style={{...styles.statValue, color: "var(--error-500)"}}>{stats.vencidas}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Pendentes</div>
          <div style={{...styles.statValue, color: "var(--warning-500)"}}>{stats.pendentes}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <button
            style={styles.addButton}
            onClick={() => abrirModal("NovaConta")}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--primary-hover)"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--primary-color)"}
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
        <Table
            columns={columns}
            actions={actions}
            data={dadosSimulados}
        />
    </div>
  );
}

export default ContasAPagar;