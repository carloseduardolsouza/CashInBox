import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiShoppingCart, FiTrendingUp, FiDollarSign, FiPercent, FiAward, FiClock } from 'react-icons/fi';

const RelatorioVendas = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');

  const dadosVendasDiarias = [
    { dia: '01', vendas: 12, valor: 3400 },
    { dia: '05', vendas: 15, valor: 4200 },
    { dia: '10', vendas: 10, valor: 2800 },
    { dia: '15', vendas: 18, valor: 5100 },
    { dia: '20', vendas: 22, valor: 6300 },
    { dia: '25', vendas: 19, valor: 5500 },
    { dia: '30', vendas: 25, valor: 7200 }
  ];

  const dadosTopProdutos = [
    { produto: 'Produto A', vendas: 145, valor: 21750 },
    { produto: 'Produto B', vendas: 128, valor: 19200 },
    { produto: 'Produto C', vendas: 112, valor: 16800 },
    { produto: 'Produto D', vendas: 98, valor: 14700 },
    { produto: 'Produto E', vendas: 87, valor: 13050 }
  ];

  const dadosVendasHora = [
    { hora: '08h', vendas: 5 },
    { hora: '10h', vendas: 12 },
    { hora: '12h', vendas: 25 },
    { hora: '14h', vendas: 18 },
    { hora: '16h', vendas: 22 },
    { hora: '18h', vendas: 30 },
    { hora: '20h', vendas: 15 }
  ];

  const topVendedores = [
    { nome: 'João Silva', vendas: 89, valor: 45200 },
    { nome: 'Maria Santos', vendas: 76, valor: 38900 },
    { nome: 'Pedro Costa', vendas: 64, valor: 32100 }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      padding: '24px',
      marginLeft: "44px",
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
      marginBottom: '4px'
    },
    kpiSubvalue: {
      fontSize: '13px',
      color: 'var(--text-muted)'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '20px'
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
    rankingList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    rankingItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      backgroundColor: 'var(--background)',
      borderRadius: '8px',
      border: '1px solid var(--surface-border)'
    },
    rankingPosition: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: '14px',
      flexShrink: 0
    },
    rankingInfo: {
      flex: 1
    },
    rankingName: {
      fontSize: '14px',
      fontWeight: '500',
      color: 'var(--text-primary)',
      marginBottom: '2px'
    },
    rankingStats: {
      fontSize: '12px',
      color: 'var(--text-muted)'
    },
    rankingValue: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      textAlign: 'right'
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const KPICard = ({ icon, label, value, subvalue, iconBg, iconColor }) => (
    <div style={styles.kpiCard}>
      <div style={styles.kpiHeader}>
        <div style={{ ...styles.kpiIcon, backgroundColor: iconBg, color: iconColor }}>
          {icon}
        </div>
      </div>
      <p style={styles.kpiLabel}>{label}</p>
      <p style={styles.kpiValue}>{value}</p>
      {subvalue && <p style={styles.kpiSubvalue}>{subvalue}</p>}
    </div>
  );

  return (
    <div style={styles.container}>
      <style>
        {`
          button:hover {
            opacity: 0.9;
          }
        `}
      </style>

      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <h1 style={styles.pageTitle}>Relatório de Vendas</h1>
            <p style={styles.pageSubtitle}>Análise detalhada do desempenho comercial</p>
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
        {/* KPIs */}
        <div style={styles.kpiGrid}>
          <KPICard
            icon={<FiDollarSign />}
            label="Faturamento Total"
            value={formatarMoeda(67000)}
            subvalue="Meta: R$ 75.000"
            iconBg="var(--success-100)"
            iconColor="var(--success-700)"
          />
          <KPICard
            icon={<FiShoppingCart />}
            label="Total de Pedidos"
            value="189"
            subvalue="Avg: 6,3 pedidos/dia"
            iconBg="var(--chart-blue)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiPercent />}
            label="Ticket Médio"
            value={formatarMoeda(354.50)}
            subvalue="+5.2% vs mês anterior"
            iconBg="var(--chart-purple)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiTrendingUp />}
            label="Taxa de Conversão"
            value="12.4%"
            subvalue="342 de 2.758 visitantes"
            iconBg="var(--chart-orange)"
            iconColor="var(--text-inverse)"
          />
        </div>

        <div style={styles.chartsGrid}>
          {/* Evolução de Vendas */}
          <div style={{ ...styles.chartCard, ...styles.chartCardFull }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Evolução de Vendas</h3>
              <p style={styles.chartSubtitle}>Quantidade e valor das vendas ao longo do período</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosVendasDiarias}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-blue)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-green)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-green)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  formatter={(value, name) => [
                    name === 'valor' ? formatarMoeda(value) : value,
                    name === 'valor' ? 'Faturamento' : 'Quantidade'
                  ]}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => value === 'valor' ? 'Faturamento' : 'Quantidade'}
                />
                <Area 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="var(--chart-blue)" 
                  fillOpacity={1} 
                  fill="url(#colorVendas)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="var(--chart-green)" 
                  fillOpacity={1} 
                  fill="url(#colorValor)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top Produtos */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Top 5 Produtos Mais Vendidos</h3>
              <p style={styles.chartSubtitle}>Ranking por quantidade e faturamento</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dadosTopProdutos} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  type="number"
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  dataKey="produto" 
                  type="category"
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                  width={80}
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
                    name === 'valor' ? 'Faturamento' : 'Vendas'
                  ]}
                />
                <Bar dataKey="vendas" fill="var(--chart-blue)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Vendas por Horário */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Vendas por Horário</h3>
              <p style={styles.chartSubtitle}>Picos de vendas durante o dia</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={dadosVendasHora}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  dataKey="hora" 
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
                />
                <Line 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="var(--chart-orange)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-orange)', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Vendedores */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Top Vendedores</h3>
              <p style={styles.chartSubtitle}>Melhores desempenhos do período</p>
            </div>
            <div style={styles.rankingList}>
              {topVendedores.map((vendedor, index) => (
                <div key={index} style={styles.rankingItem}>
                  <div style={{
                    ...styles.rankingPosition,
                    backgroundColor: index === 0 ? 'var(--chart-yellow)' : 
                                   index === 1 ? 'var(--neutral-400)' : 
                                   'var(--chart-orange)',
                    color: 'var(--text-inverse)'
                  }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  <div style={styles.rankingInfo}>
                    <p style={styles.rankingName}>{vendedor.nome}</p>
                    <p style={styles.rankingStats}>{vendedor.vendas} vendas realizadas</p>
                  </div>
                  <div style={styles.rankingValue}>
                    {formatarMoeda(vendedor.valor)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioVendas;