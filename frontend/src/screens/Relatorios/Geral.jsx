import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiShoppingCart, FiUsers, FiPackage, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const RelatorioGeral = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');

  // Dados simulados
  const dadosVendasMensal = [
    { mes: 'Jan', valor: 45000, pedidos: 120 },
    { mes: 'Fev', valor: 52000, pedidos: 145 },
    { mes: 'Mar', valor: 48000, pedidos: 135 },
    { mes: 'Abr', valor: 61000, pedidos: 168 },
    { mes: 'Mai', valor: 55000, pedidos: 152 },
    { mes: 'Jun', valor: 67000, pedidos: 189 }
  ];

  const dadosCategoriasVenda = [
    { nome: 'Eletrônicos', valor: 35, cor: 'var(--chart-blue)' },
    { nome: 'Roupas', valor: 28, cor: 'var(--chart-green)' },
    { nome: 'Alimentos', valor: 22, cor: 'var(--chart-orange)' },
    { nome: 'Outros', valor: 15, cor: 'var(--chart-purple)' }
  ];

  const dadosFluxoCaixa = [
    { dia: 'Seg', entrada: 8500, saida: 4200 },
    { dia: 'Ter', entrada: 9200, saida: 3800 },
    { dia: 'Qua', entrada: 7800, saida: 5100 },
    { dia: 'Qui', entrada: 10500, saida: 4500 },
    { dia: 'Sex', entrada: 12000, saida: 3900 },
    { dia: 'Sab', entrada: 15000, saida: 2500 }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      marginLeft: "44px",
      backgroundColor: 'var(--background)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      marginBottom: '32px',
      maxWidth: '1400px',
      margin: '0 auto 32px'
    },
    headerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '8px'
    },
    pageSubtitle: {
      fontSize: '15px',
      color: 'var(--text-muted)'
    },
    filterGroup: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    filterButton: {
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '6px',
      border: '1px solid var(--surface-border)',
      backgroundColor: 'var(--surface)',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    filterButtonActive: {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--primary-color)'
    },
    contentWrapper: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    kpiGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    kpiCard: {
      backgroundColor: 'var(--surface-strong)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid var(--surface-border)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)'
    },
    kpiHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    kpiIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px'
    },
    kpiLabel: {
      fontSize: '14px',
      color: 'var(--text-muted)',
      marginBottom: '8px'
    },
    kpiValue: {
      fontSize: '28px',
      fontWeight: '700',
      color: 'var(--text-primary)',
      marginBottom: '8px'
    },
    kpiChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '13px',
      fontWeight: '500'
    },
    kpiChangePositive: {
      color: 'var(--success-500)'
    },
    kpiChangeNegative: {
      color: 'var(--error-500)'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    chartCard: {
      backgroundColor: 'var(--surface-strong)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--surface-border)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)'
    },
    chartCardFull: {
      gridColumn: '1 / -1'
    },
    chartHeader: {
      marginBottom: '20px'
    },
    chartTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '4px'
    },
    chartSubtitle: {
      fontSize: '13px',
      color: 'var(--text-muted)'
    },
    legendContainer: {
      display: 'flex',
      gap: '20px',
      marginTop: '16px',
      flexWrap: 'wrap'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: 'var(--text-secondary)'
    },
    legendDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%'
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const KPICard = ({ icon, label, value, change, changeType, iconBg, iconColor }) => (
    <div style={styles.kpiCard}>
      <div style={styles.kpiHeader}>
        <div style={{ ...styles.kpiIcon, backgroundColor: iconBg, color: iconColor }}>
          {icon}
        </div>
      </div>
      <p style={styles.kpiLabel}>{label}</p>
      <p style={styles.kpiValue}>{value}</p>
      <div style={{
        ...styles.kpiChange,
        ...(changeType === 'positive' ? styles.kpiChangePositive : styles.kpiChangeNegative)
      }}>
        {changeType === 'positive' ? <FiArrowUp /> : <FiArrowDown />}
        {change}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <style>
        {`
          button:hover {
            opacity: 0.9;
          }
          @media (max-width: 768px) {
            .recharts-responsive-container {
              min-height: 300px !important;
            }
          }
        `}
      </style>

      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.pageTitle}>Relatório Geral</h1>
            <p style={styles.pageSubtitle}>Visão geral do desempenho do negócio</p>
          </div>
          <div style={styles.filterGroup}>
            {['7dias', '30dias', '90dias', 'ano'].map(periodo => (
              <button
                key={periodo}
                onClick={() => setPeriodoSelecionado(periodo)}
                style={{
                  ...styles.filterButton,
                  ...(periodoSelecionado === periodo ? styles.filterButtonActive : {})
                }}
              >
                {periodo === '7dias' && 'Últimos 7 dias'}
                {periodo === '30dias' && 'Últimos 30 dias'}
                {periodo === '90dias' && 'Últimos 90 dias'}
                {periodo === 'ano' && 'Último ano'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.contentWrapper}>
        {/* KPIs Principais */}
        <div style={styles.kpiGrid}>
          <KPICard
            icon={<FiDollarSign />}
            label="Receita Total"
            value={formatarMoeda(328000)}
            change="+12.5% vs mês anterior"
            changeType="positive"
            iconBg="var(--success-100)"
            iconColor="var(--success-700)"
          />
          <KPICard
            icon={<FiShoppingCart />}
            label="Total de Vendas"
            value="909"
            change="+8.2% vs mês anterior"
            changeType="positive"
            iconBg="var(--chart-blue)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiUsers />}
            label="Clientes Ativos"
            value="1.247"
            change="+15.3% vs mês anterior"
            changeType="positive"
            iconBg="var(--chart-purple)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiPackage />}
            label="Produtos em Estoque"
            value="3.842"
            change="-3.2% vs mês anterior"
            changeType="negative"
            iconBg="var(--warning-100)"
            iconColor="var(--warning-700)"
          />
        </div>

        {/* Gráficos */}
        <div style={styles.chartsGrid}>
          {/* Evolução de Vendas */}
          <div style={{ ...styles.chartCard, ...styles.chartCardFull }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Evolução de Vendas</h3>
              <p style={styles.chartSubtitle}>Faturamento e quantidade de pedidos por mês</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosVendasMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  dataKey="mes" 
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--surface-strong)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  formatter={(value, name) => [
                    name === 'valor' ? formatarMoeda(value) : value,
                    name === 'valor' ? 'Faturamento' : 'Pedidos'
                  ]}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => value === 'valor' ? 'Faturamento' : 'Pedidos'}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="var(--chart-blue)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-blue)', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pedidos" 
                  stroke="var(--chart-green)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-green)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Vendas por Categoria */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Vendas por Categoria</h3>
              <p style={styles.chartSubtitle}>Distribuição do faturamento</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={dadosCategoriasVenda}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nome, valor }) => `${nome} ${valor}%`}
                  outerRadius={90}
                  fill="var(--chart-blue)"
                  dataKey="valor"
                >
                  {dadosCategoriasVenda.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--surface-strong)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Fluxo de Caixa */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Fluxo de Caixa Semanal</h3>
              <p style={styles.chartSubtitle}>Entradas vs Saídas</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dadosFluxoCaixa}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  dataKey="dia" 
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--surface-strong)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  formatter={(value) => formatarMoeda(value)}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => value === 'entrada' ? 'Entradas' : 'Saídas'}
                />
                <Bar dataKey="entrada" fill="var(--chart-green)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saida" fill="var(--chart-red)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioGeral;