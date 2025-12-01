import { useState, useEffect, useCallback, useMemo } from "react";
//icones
import { FaSun } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

import {
  TrendingUp,
  DollarSign,
  Target,
  AlertTriangle,
  Activity,
  ShoppingBasket,
  Users,
  Package,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dados simulados
const MOCK_CHART_DATA = [
  { name: "Jan", Receitas: 45000, Despesas: 28000, Vendas: 52000 },
  { name: "Fev", Receitas: 52000, Despesas: 32000, Vendas: 58000 },
  { name: "Mar", Receitas: 48000, Despesas: 30000, Vendas: 55000 },
  { name: "Abr", Receitas: 61000, Despesas: 35000, Vendas: 67000 },
  { name: "Mai", Receitas: 55000, Despesas: 33000, Vendas: 61000 },
  { name: "Jun", Receitas: 67000, Despesas: 38000, Vendas: 72000 },
];

const MOCK_METRICS = {
  faturamentoAtual: 348000,
  variacao: 15.8,
  faturamentoDia: 12500,
  vendasHoje: 24,
  ticketMedio: 520.83,
  totalVendasPeriodo: 365,
  dividasAtivas: 8500,
  crediariosAtrasados: 3,
  produtosEstoqueMinimo: 12,
  clientesNovosMes: 18,
  valorEmEstoque: 125000,
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

function Dashboard({theme , setTheme}) {
  const [mostrarInfo, setMostrarInfo] = useState(true);
  const [periodFilter, setPeriodFilter] = useState("semestre");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const now = html.getAttribute("data-theme");
    const next = now === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    setTheme(next);
  };

  const metricas = useMemo(() => {
    const variacao = MOCK_METRICS.variacao;
    const isPositive = variacao >= 0;

    return {
      faturamento: {
        atual: MOCK_METRICS.faturamentoAtual,
        variacao,
        isPositive,
      },
      vendas: {
        hoje: MOCK_METRICS.vendasHoje,
        ticket: MOCK_METRICS.ticketMedio,
        totalPeriodo: MOCK_METRICS.totalVendasPeriodo,
      },
    };
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Dashboard Empresarial</h1>
          <span style={styles.subtitle}>
            Visão geral • {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>

        <div style={styles.headerControls}>
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            style={styles.select}
          >
            <option value="mes">Mês</option>
            <option value="trimestre">Trimestre</option>
            <option value="semestre">Semestre</option>
            <option value="anual">Anual</option>
          </select>

          <button
            onClick={() => setMostrarInfo(!mostrarInfo)}
            style={styles.controlBtn}
            title={mostrarInfo ? "Ocultar valores" : "Mostrar valores"}
          >
            {mostrarInfo ? (
              <FaEye style={{ color: "var(--text-primary)" }} />
            ) : (
              <FaEyeSlash style={{ color: "var(--text-primary)" }} />
            )}
          </button>

          <button
            onClick={toggleTheme}
            style={styles.controlBtn}
            title={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {theme === "dark" ? (
              <FaSun style={{ color: "var(--text-primary)" }} />
            ) : (
              <FaMoon style={{ color: "var(--text-primary)" }} />
            )}
          </button>
        </div>
      </header>

      {/* Grid Principal */}
      <div style={styles.grid}>
        {/* Navegação */}
        <div style={styles.gridLeft}>
          <NavButton icon={<Users size={24} />} label="Funcionários" />
          <NavButton icon={<Package size={24} />} label="Planos" />
          <NavButton icon={<DollarSign size={24} />} label="Fluxo" />
          <NavButton icon={<ShoppingBasket size={24} />} label="PDV" />
        </div>

        {/* Gráfico */}
        <div style={styles.gridCenter}>
          <div style={styles.chartPanel}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Tendência Financeira</h3>
              <div style={styles.chartLegend}>
                <LegendItem color="var(--chart-green)" label="Receitas" />
                <LegendItem color="var(--chart-red)" label="Despesas" />
                <LegendItem color="var(--chart-orange)" label="Vendas" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={MOCK_CHART_DATA}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--surface-border)"
                />
                <XAxis
                  dataKey="name"
                  stroke="var(--text-muted)"
                  fontSize={11}
                />
                <YAxis stroke="var(--text-muted)" fontSize={11} width={40} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--surface-border)",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="Receitas"
                  stroke="var(--chart-green)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Despesas"
                  stroke="var(--chart-red)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="Vendas"
                  stroke="var(--chart-orange)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Panels */}
        <div style={styles.gridRight}>
          <InfoPanel
            icon={<AlertTriangle size={16} />}
            title="Alertas"
            items={[
              {
                count: MOCK_METRICS.crediariosAtrasados,
                text: "Pagamentos vencidos",
                color: "var(--error-500)",
              },
              {
                count: MOCK_METRICS.produtosEstoqueMinimo,
                text: "Estoque baixo",
                color: "var(--warning-500)",
              },
              {
                count: MOCK_METRICS.clientesNovosMes,
                text: "Clientes novos",
                color: "var(--info-500)",
              },
            ]}
          />
          <InfoPanel
            icon={<Activity size={16} />}
            title="Performance"
            items={[
              {
                label: "Produtos Vendidos",
                value: MOCK_METRICS.vendasHoje * 2,
              },
              {
                label: "Valor em Estoque",
                value: mostrarInfo
                  ? formatCurrency(MOCK_METRICS.valorEmEstoque)
                  : "••••••",
              },
            ]}
          />
        </div>
      </div>

      {/* Métricas */}
      <div style={styles.metricsGrid}>
        <MetricCard
          icon={<TrendingUp size={20} />}
          value={
            mostrarInfo ? formatCurrency(metricas.faturamento.atual) : "••••••"
          }
          label={`Faturamento ${periodFilter}`}
          change={`${metricas.faturamento.isPositive ? "↑" : "↓"} ${
            metricas.faturamento.variacao
          }% vs Período Ant.`}
          changeColor={
            metricas.faturamento.isPositive
              ? "var(--success-500)"
              : "var(--error-500)"
          }
          accentColor="var(--primary-color)"
        />
        <MetricCard
          icon={<DollarSign size={20} />}
          value={
            mostrarInfo ? formatCurrency(MOCK_METRICS.faturamentoDia) : "••••••"
          }
          label="Vendas Hoje"
          change={`${metricas.vendas.hoje} vendas realizadas`}
          accentColor="var(--chart-green)"
        />
        <MetricCard
          icon={<Target size={20} />}
          value={mostrarInfo ? formatCurrency(metricas.vendas.ticket) : "••••"}
          label={`Ticket Médio ${periodFilter}`}
          change={`${metricas.vendas.totalPeriodo} vendas no total`}
          accentColor="var(--chart-orange)"
        />
        <MetricCard
          icon={<AlertTriangle size={20} />}
          value={
            mostrarInfo ? formatCurrency(MOCK_METRICS.dividasAtivas) : "••••"
          }
          label="Dívidas Ativas"
          change="Valor de dívidas"
          accentColor="var(--error-500)"
        />
      </div>
    </div>
  );
}

// Componentes auxiliares
function NavButton({ icon, label }) {
  return (
    <button style={styles.navBtn}>
      {icon}
      <span style={styles.navBtnLabel}>{label}</span>
    </button>
  );
}

function LegendItem({ color, label }) {
  return (
    <span style={styles.legendItem}>
      <div style={{ ...styles.legendColor, backgroundColor: color }}></div>
      {label}
    </span>
  );
}

function InfoPanel({ icon, title, items }) {
  return (
    <div style={styles.infoPanel}>
      <h4 style={styles.infoPanelTitle}>
        {icon}
        {title}
      </h4>
      <div style={styles.infoPanelContent}>
        {items.map((item, i) => (
          <div key={i} style={styles.infoItem}>
            {item.count !== undefined ? (
              <>
                <span
                  style={{ ...styles.infoCount, backgroundColor: item.color }}
                >
                  {item.count}
                </span>
                <span style={styles.infoText}>{item.text}</span>
              </>
            ) : (
              <>
                <span style={styles.infoLabel}>{item.label}</span>
                <span style={styles.infoValue}>{item.value}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ icon, value, label, change, changeColor, accentColor }) {
  return (
    <div
      style={{ ...styles.metricCard, borderLeft: `3px solid ${accentColor}` }}
    >
      <div
        style={{
          ...styles.metricIcon,
          backgroundColor: `${accentColor}20`,
          color: accentColor,
        }}
      >
        {icon}
      </div>
      <div style={styles.metricContent}>
        <div style={styles.metricValue}>{value}</div>
        <div style={styles.metricLabel}>{label}</div>
        <div
          style={{
            ...styles.metricChange,
            color: changeColor || "var(--text-muted)",
          }}
        >
          {change}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div style={styles.dashboard}>
      <div style={styles.skeleton}>
        <div
          style={{ ...styles.skeletonBar, width: "200px", height: "32px" }}
        ></div>
        <div
          style={{
            ...styles.skeletonBar,
            width: "100%",
            height: "300px",
            marginTop: "20px",
          }}
        ></div>
        <div style={styles.skeletonMetrics}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{ ...styles.skeletonBar, width: "100%", height: "100px" }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Estilos
const styles = {
  dashboard: {
    marginLeft: "40px",
    padding: "0 16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--background-color)",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--surface-border)",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "var(--text-muted)",
  },
  headerControls: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background-color)",
    color: "var(--text-primary)",
    fontSize: "14px",
    cursor: "pointer",
  },
  controlBtn: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background-color)",
    cursor: "pointer",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "240px 1fr 280px",
    gap: "16px",
  },
  gridLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  navBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "var(--background-color)",
    border: "1px solid var(--surface-border)",
    borderRadius: "10px",
    cursor: "pointer",
    gap: "6px",
    color: "var(--text-secondary)",
    transition: "all 0.2s",
  },
  navBtnLabel: {
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  gridCenter: {
    display: "flex",
  },
  chartPanel: {
    backgroundColor: "var(--background-color)",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid var(--surface-border)",
    width: "100%",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--surface-border)",
  },
  chartTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: 0,
  },
  chartLegend: {
    display: "flex",
    gap: "16px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "var(--text-muted)",
    fontWeight: "500",
  },
  legendColor: {
    width: "12px",
    height: "3px",
    borderRadius: "2px",
  },
  gridRight: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  infoPanel: {
    backgroundColor: "var(--background-color)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid var(--surface-border)",
  },
  infoPanelTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-secondary)",
    margin: "0 0 12px 0",
    paddingBottom: "8px",
    borderBottom: "1px solid var(--surface-border)",
  },
  infoPanelContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    backgroundColor: "var(--surface-soft)",
    borderRadius: "8px",
  },
  infoCount: {
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "700",
    color: "white",
    flexShrink: 0,
  },
  infoText: {
    fontSize: "12px",
    color: "var(--text-muted)",
    fontWeight: "500",
    flex: 1,
    marginLeft: "8px",
  },
  infoLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: "13px",
    color: "var(--text-primary)",
    fontWeight: "600",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  metricCard: {
    backgroundColor: "var(--background-color)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid var(--surface-border)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  metricIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  metricContent: {
    flex: 1,
  },
  metricValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "2px",
  },
  metricLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "2px",
  },
  metricChange: {
    fontSize: "11px",
    fontWeight: "600",
  },
  skeleton: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  skeletonBar: {
    backgroundColor: "var(--surface)",
    borderRadius: "8px",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  skeletonMetrics: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
};

export default Dashboard;
