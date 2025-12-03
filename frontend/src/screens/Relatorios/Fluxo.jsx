import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiActivity, FiCalendar, FiAlertCircle } from 'react-icons/fi';

const RelatorioFluxoCaixa = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');

  const dadosFluxoDiario = [
    { dia: '01', entradas: 8500, saidas: 4200, saldo: 4300 },
    { dia: '05', entradas: 9200, saidas: 3800, saldo: 5400 },
    { dia: '10', entradas: 7800, saidas: 5100, saldo: 2700 },
    { dia: '15', entradas: 10500, saidas: 4500, saldo: 6000 },
    { dia: '20', entradas: 12000, saidas: 3900, saldo: 8100 },
    { dia: '25', entradas: 15000, saidas: 2500, saldo: 12500 },
    { dia: '30', entradas: 11200, saidas: 6800, saldo: 4400 }
  ];

  const dadosReceitas = [
    { mes: 'Jan', vendas: 45000, servicos: 8500, outros: 2300 },
    { mes: 'Fev', vendas: 52000, servicos: 9200, outros: 1800 },
    { mes: 'Mar', vendas: 48000, servicos: 10100, outros: 2600 },
    { mes: 'Abr', vendas: 61000, servicos: 11200, outros: 3100 },
    { mes: 'Mai', vendas: 55000, servicos: 9800, outros: 2400 },
    { mes: 'Jun', vendas: 67000, servicos: 12500, outros: 2900 }
  ];

  const contasAPagar = [
    { descricao: 'Fornecedor ABC', valor: 12500, vencimento: '05/12/2024', status: 'pendente' },
    { descricao: 'Aluguel', valor: 3500, vencimento: '10/12/2024', status: 'pendente' },
    { descricao: 'Salários', valor: 18700, vencimento: '05/12/2024', status: 'vencido' },
    { descricao: 'Energia', valor: 890, vencimento: '15/12/2024', status: 'pendente' },
    { descricao: 'Internet', valor: 299, vencimento: '20/12/2024', status: 'pendente' }
  ];

  const contasAReceber = [
    { descricao: 'Cliente XYZ Ltda', valor: 8500, vencimento: '08/12/2024', status: 'pendente' },
    { descricao: 'Vendas parceladas', valor: 15200, vencimento: '10/12/2024', status: 'pendente' },
    { descricao: 'Cliente ABC Corp', valor: 6700, vencimento: '15/12/2024', status: 'pendente' },
    { descricao: 'Projeto DEF', valor: 12000, vencimento: '03/12/2024', status: 'vencido' }
  ];

  const projecaoSemanal = [
    { dia: 'Seg', projecao: 8500, realizado: 8200 },
    { dia: 'Ter', projecao: 9000, realizado: 9500 },
    { dia: 'Qua', projecao: 8800, realizado: 8100 },
    { dia: 'Qui', projecao: 10500, realizado: 11200 },
    { dia: 'Sex', projecao: 12000, realizado: 0 },
    { dia: 'Sab', projecao: 15000, realizado: 0 },
    { dia: 'Dom', projecao: 6000, realizado: 0 }
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
    tableContainer: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 8px'
    },
    tableRow: {
      backgroundColor: 'var(--background)'
    },
    tableCell: {
      padding: '12px 16px',
      fontSize: '14px',
      color: 'var(--text-primary)'
    },
    tableCellFirst: {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px'
    },
    tableCellLast: {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      textAlign: 'right'
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    statusPendente: {
      backgroundColor: 'var(--warning-100)',
      color: 'var(--warning-700)'
    },
    statusVencido: {
      backgroundColor: 'var(--error-100)',
      color: 'var(--error-700)'
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
            <h1 style={styles.pageTitle}>Fluxo de Caixa</h1>
            <p style={styles.pageSubtitle}>Acompanhamento de entradas e saídas financeiras</p>
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
            icon={<FiTrendingUp />}
            label="Total de Entradas"
            value={formatarMoeda(74200)}
            subvalue="no período selecionado"
            iconBg="var(--success-100)"
            iconColor="var(--success-700)"
          />
          <KPICard
            icon={<FiTrendingDown />}
            label="Total de Saídas"
            value={formatarMoeda(30800)}
            subvalue="no período selecionado"
            iconBg="var(--error-100)"
            iconColor="var(--error-700)"
          />
          <KPICard
            icon={<FiActivity />}
            label="Saldo do Período"
            value={formatarMoeda(43400)}
            subvalue="+58.5% saldo positivo"
            iconBg="var(--chart-blue)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiDollarSign />}
            label="Saldo Atual"
            value={formatarMoeda(87650)}
            subvalue="em todas as contas"
            iconBg="var(--chart-purple)"
            iconColor="var(--text-inverse)"
          />
        </div>

        <div style={styles.chartsGrid}>
          {/* Fluxo de Caixa Diário */}
          <div style={{ ...styles.chartCard, ...styles.chartCardFull }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Fluxo de Caixa Diário</h3>
              <p style={styles.chartSubtitle}>Entradas, saídas e saldo</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosFluxoDiario}>
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
                  formatter={(value) => {
                    if (value === 'entradas') return 'Entradas';
                    if (value === 'saidas') return 'Saídas';
                    return 'Saldo';
                  }}
                />
                <Bar dataKey="entradas" fill="var(--chart-green)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saidas" fill="var(--chart-red)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saldo" fill="var(--chart-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Receitas por Origem */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Receitas por Origem</h3>
              <p style={styles.chartSubtitle}>Evolução das fontes de receita</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dadosReceitas}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-blue)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-blue)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorServicos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-green)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-green)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutros" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-orange)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--chart-orange)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  formatter={(value) => formatarMoeda(value)}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => {
                    if (value === 'vendas') return 'Vendas';
                    if (value === 'servicos') return 'Serviços';
                    return 'Outros';
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="vendas" 
                  stroke="var(--chart-blue)" 
                  fillOpacity={1} 
                  fill="url(#colorVendas)" 
                  stackId="1"
                />
                <Area 
                  type="monotone" 
                  dataKey="servicos" 
                  stroke="var(--chart-green)" 
                  fillOpacity={1} 
                  fill="url(#colorServicos)" 
                  stackId="1"
                />
                <Area 
                  type="monotone" 
                  dataKey="outros" 
                  stroke="var(--chart-orange)" 
                  fillOpacity={1} 
                  fill="url(#colorOutros)" 
                  stackId="1"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Projeção Semanal */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Projeção vs Realizado</h3>
              <p style={styles.chartSubtitle}>Comparativo semanal</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={projecaoSemanal}>
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
                    value > 0 ? formatarMoeda(value) : 'Não realizado',
                    name === 'projecao' ? 'Projeção' : 'Realizado'
                  ]}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => value === 'projecao' ? 'Projeção' : 'Realizado'}
                />
                <Line 
                  type="monotone" 
                  dataKey="projecao" 
                  stroke="var(--neutral-500)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'var(--neutral-500)', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="realizado" 
                  stroke="var(--chart-green)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-green)', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Contas a Pagar */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Contas a Pagar</h3>
              <p style={styles.chartSubtitle}>Próximos vencimentos</p>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <tbody>
                  {contasAPagar.map((conta, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={{ ...styles.tableCell, ...styles.tableCellFirst }}>
                        <strong>{conta.descricao}</strong>
                        <br />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Venc: {conta.vencimento}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          ...(conta.status === 'vencido' ? styles.statusVencido : styles.statusPendente)
                        }}>
                          {conta.status}
                        </span>
                      </td>
                      <td style={{ ...styles.tableCell, ...styles.tableCellLast, fontWeight: '600' }}>
                        {formatarMoeda(conta.valor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contas a Receber */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Contas a Receber</h3>
              <p style={styles.chartSubtitle}>Próximos recebimentos</p>
            </div>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <tbody>
                  {contasAReceber.map((conta, index) => (
                    <tr key={index} style={styles.tableRow}>
                      <td style={{ ...styles.tableCell, ...styles.tableCellFirst }}>
                        <strong>{conta.descricao}</strong>
                        <br />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Venc: {conta.vencimento}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          ...(conta.status === 'vencido' ? styles.statusVencido : styles.statusPendente)
                        }}>
                          {conta.status}
                        </span>
                      </td>
                      <td style={{ ...styles.tableCell, ...styles.tableCellLast, fontWeight: '600' }}>
                        {formatarMoeda(conta.valor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioFluxoCaixa;