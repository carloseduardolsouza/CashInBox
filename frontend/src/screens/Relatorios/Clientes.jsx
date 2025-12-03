import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUsers, FiUserPlus, FiUserCheck, FiTrendingUp, FiHeart, FiShoppingBag } from 'react-icons/fi';

const RelatorioClientes = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');

  const dadosNovosClientes = [
    { mes: 'Jan', novos: 45, ativos: 238 },
    { mes: 'Fev', novos: 52, ativos: 271 },
    { mes: 'Mar', novos: 48, ativos: 302 },
    { mes: 'Abr', novos: 61, ativos: 345 },
    { mes: 'Mai', novos: 55, ativos: 383 },
    { mes: 'Jun', novos: 67, ativos: 429 }
  ];

  const segmentacaoClientes = [
    { nome: 'VIP', valor: 15, cor: 'var(--chart-purple)' },
    { nome: 'Recorrentes', valor: 35, cor: 'var(--chart-blue)' },
    { nome: 'Ocasionais', valor: 30, cor: 'var(--chart-green)' },
    { nome: 'Inativos', valor: 20, cor: 'var(--neutral-500)' }
  ];

  const ticketMedioPorSegmento = [
    { segmento: 'VIP', ticket: 850 },
    { segmento: 'Recorrente', ticket: 420 },
    { segmento: 'Ocasional', ticket: 280 },
    { segmento: 'Novo', ticket: 195 }
  ];

  const topClientes = [
    { nome: 'Maria Silva', compras: 45, valor: 38250, ultimaCompra: '2 dias' },
    { nome: 'João Santos', compras: 38, valor: 32100, ultimaCompra: '1 semana' },
    { nome: 'Ana Costa', compras: 32, valor: 27200, ultimaCompra: '3 dias' },
    { nome: 'Pedro Oliveira', compras: 28, valor: 23800, ultimaCompra: '5 dias' },
    { nome: 'Carla Souza', compras: 24, valor: 20400, ultimaCompra: '1 dia' }
  ];

  const cidadesTop = [
    { cidade: 'São Paulo - SP', clientes: 342 },
    { cidade: 'Rio de Janeiro - RJ', clientes: 218 },
    { cidade: 'Belo Horizonte - MG', clientes: 156 },
    { cidade: 'Curitiba - PR', clientes: 128 },
    { cidade: 'Porto Alegre - RS', clientes: 95 }
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
      padding: '14px 16px',
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
      flexShrink: 0,
      backgroundColor: 'var(--primary-color)',
      color: 'var(--text-inverse)'
    },
    rankingInfo: {
      flex: 1
    },
    rankingName: {
      fontSize: '15px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '4px'
    },
    rankingStats: {
      fontSize: '12px',
      color: 'var(--text-muted)'
    },
    rankingValue: {
      textAlign: 'right'
    },
    rankingValueMain: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '2px'
    },
    rankingValueSub: {
      fontSize: '12px',
      color: 'var(--text-muted)'
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
            <h1 style={styles.pageTitle}>Relatório de Clientes</h1>
            <p style={styles.pageSubtitle}>Análise da base de clientes e comportamento</p>
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
            icon={<FiUsers />}
            label="Total de Clientes"
            value="1.247"
            subvalue="cadastrados no sistema"
            iconBg="var(--chart-blue)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiUserPlus />}
            label="Novos Clientes"
            value="67"
            subvalue="+15.3% vs mês anterior"
            iconBg="var(--chart-green)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiUserCheck />}
            label="Clientes Ativos"
            value="429"
            subvalue="compraram no período"
            iconBg="var(--chart-purple)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiHeart />}
            label="Taxa de Retenção"
            value="68.5%"
            subvalue="clientes recorrentes"
            iconBg="var(--chart-red)"
            iconColor="var(--text-inverse)"
          />
        </div>

        <div style={styles.chartsGrid}>
          {/* Evolução de Clientes */}
          <div style={{ ...styles.chartCard, ...styles.chartCardFull }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Evolução da Base de Clientes</h3>
              <p style={styles.chartSubtitle}>Novos cadastros e clientes ativos por mês</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosNovosClientes}>
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
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => value === 'novos' ? 'Novos Clientes' : 'Clientes Ativos'}
                />
                <Line 
                  type="monotone" 
                  dataKey="novos" 
                  stroke="var(--chart-green)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-green)', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ativos" 
                  stroke="var(--chart-blue)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-blue)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Segmentação de Clientes */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Segmentação de Clientes</h3>
              <p style={styles.chartSubtitle}>Distribuição por perfil de compra</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={segmentacaoClientes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nome, valor }) => `${nome} ${valor}%`}
                  outerRadius={90}
                  fill="var(--chart-blue)"
                  dataKey="valor"
                >
                  {segmentacaoClientes.map((entry, index) => (
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

          {/* Ticket Médio por Segmento */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Ticket Médio por Segmento</h3>
              <p style={styles.chartSubtitle}>Valor médio de compra</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ticketMedioPorSegmento}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  dataKey="segmento" 
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
                <Bar dataKey="ticket" fill="var(--chart-purple)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Clientes */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Top 5 Melhores Clientes</h3>
              <p style={styles.chartSubtitle}>Ranking por faturamento</p>
            </div>
            <div style={styles.rankingList}>
              {topClientes.map((cliente, index) => (
                <div key={index} style={styles.rankingItem}>
                  <div style={styles.rankingPosition}>
                    {index + 1}
                  </div>
                  <div style={styles.rankingInfo}>
                    <p style={styles.rankingName}>{cliente.nome}</p>
                    <p style={styles.rankingStats}>
                      {cliente.compras} compras • Última: {cliente.ultimaCompra}
                    </p>
                  </div>
                  <div style={styles.rankingValue}>
                    <p style={styles.rankingValueMain}>{formatarMoeda(cliente.valor)}</p>
                    <p style={styles.rankingValueSub}>total gasto</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cidades com Mais Clientes */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Distribuição Geográfica</h3>
              <p style={styles.chartSubtitle}>Top 5 cidades</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={cidadesTop} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  type="number"
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  dataKey="cidade" 
                  type="category"
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                  width={150}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--surface-strong)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                  formatter={(value) => [value, 'Clientes']}
                />
                <Bar dataKey="clientes" fill="var(--chart-orange)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioClientes;   