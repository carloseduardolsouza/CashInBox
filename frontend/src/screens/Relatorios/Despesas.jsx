import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiCreditCard, FiTrendingUp, FiAlertTriangle, FiPercent, FiCalendar, FiDollarSign } from 'react-icons/fi';

const RelatorioDespesas = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');

  const dadosDespesasMensal = [
    { mes: 'Jan', total: 18500, fixas: 12000, variaveis: 6500 },
    { mes: 'Fev', total: 19200, fixas: 12000, variaveis: 7200 },
    { mes: 'Mar', total: 21800, fixas: 12000, variaveis: 9800 },
    { mes: 'Abr', total: 20100, fixas: 12000, variaveis: 8100 },
    { mes: 'Mai', total: 22400, fixas: 12000, variaveis: 10400 },
    { mes: 'Jun', total: 24600, fixas: 12000, variaveis: 12600 }
  ];

  const despesasPorCategoria = [
    { categoria: 'Salários', valor: 18700, percentual: 38, cor: 'var(--chart-blue)' },
    { categoria: 'Fornecedores', valor: 12500, percentual: 25, cor: 'var(--chart-green)' },
    { categoria: 'Aluguel', valor: 3500, percentual: 7, cor: 'var(--chart-orange)' },
    { categoria: 'Marketing', valor: 4200, percentual: 9, cor: 'var(--chart-purple)' },
    { categoria: 'Impostos', valor: 6800, percentual: 14, cor: 'var(--chart-red)' },
    { categoria: 'Outros', valor: 3400, percentual: 7, cor: 'var(--neutral-500)' }
  ];

  const maioresDespesas = [
    { descricao: 'Folha de Pagamento', categoria: 'Salários', valor: 18700, data: '05/12/2024' },
    { descricao: 'Fornecedor ABC Ltda', categoria: 'Fornecedores', valor: 12500, data: '10/12/2024' },
    { descricao: 'INSS/FGTS', categoria: 'Impostos', valor: 4200, data: '20/12/2024' },
    { descricao: 'Campanha Google Ads', categoria: 'Marketing', valor: 3800, data: '15/12/2024' },
    { descricao: 'Aluguel Galpão', categoria: 'Aluguel', valor: 3500, data: '10/12/2024' }
  ];

  const comparativoDespesas = [
    { categoria: 'Salários', mesAtual: 18700, mesAnterior: 17800 },
    { categoria: 'Fornecedores', mesAtual: 12500, mesAnterior: 11200 },
    { categoria: 'Marketing', mesAtual: 4200, mesAnterior: 3100 },
    { categoria: 'Aluguel', mesAtual: 3500, mesAnterior: 3500 },
    { categoria: 'Impostos', mesAtual: 6800, mesAnterior: 5900 }
  ];

  const despesasRecorrentes = [
    { descricao: 'Aluguel', valor: 3500, periodicidade: 'Mensal', proximoVencimento: '10/01/2025' },
    { descricao: 'Internet/Telefone', valor: 450, periodicidade: 'Mensal', proximoVencimento: '15/01/2025' },
    { descricao: 'Energia Elétrica', valor: 890, periodicidade: 'Mensal', proximoVencimento: '20/01/2025' },
    { descricao: 'Contador', valor: 1200, periodicidade: 'Mensal', proximoVencimento: '05/01/2025' },
    { descricao: 'Seguro', valor: 2800, periodicidade: 'Anual', proximoVencimento: '15/03/2025' }
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
    categoryBadge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '600',
      backgroundColor: 'var(--surface)',
      color: 'var(--text-secondary)'
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
            <h1 style={styles.pageTitle}>Relatório de Despesas</h1>
            <p style={styles.pageSubtitle}>Análise e controle de gastos operacionais</p>
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
            icon={<FiCreditCard />}
            label="Total de Despesas"
            value={formatarMoeda(49100)}
            subvalue="no período selecionado"
            iconBg="var(--error-100)"
            iconColor="var(--error-700)"
          />
          <KPICard
            icon={<FiDollarSign />}
            label="Despesas Fixas"
            value={formatarMoeda(12000)}
            subvalue="24.4% do total"
            iconBg="var(--chart-blue)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiTrendingUp />}
            label="Despesas Variáveis"
            value={formatarMoeda(37100)}
            subvalue="75.6% do total"
            iconBg="var(--chart-orange)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiPercent />}
            label="% sobre Faturamento"
            value="73.3%"
            subvalue="margem operacional 26.7%"
            iconBg="var(--chart-purple)"
            iconColor="var(--text-inverse)"
          />
        </div>

        <div style={styles.chartsGrid}>
          {/* Evolução de Despesas */}
          <div style={{ ...styles.chartCard, ...styles.chartCardFull }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Evolução de Despesas</h3>
              <p style={styles.chartSubtitle}>Despesas fixas vs variáveis por mês</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosDespesasMensal}>
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
                    if (value === 'total') return 'Total';
                    if (value === 'fixas') return 'Fixas';
                    return 'Variáveis';
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="var(--chart-red)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--chart-red)', r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fixas" 
                  stroke="var(--chart-blue)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'var(--chart-blue)', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="variaveis" 
                  stroke="var(--chart-orange)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--chart-orange)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Despesas por Categoria */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Despesas por Categoria</h3>
              <p style={styles.chartSubtitle}>Distribuição percentual</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={despesasPorCategoria}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percentual }) => `${categoria} ${percentual}%`}
                  outerRadius={90}
                  fill="var(--chart-blue)"
                  dataKey="percentual"
                >
                  {despesasPorCategoria.map((entry, index) => (
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
                  formatter={(value, name, props) => [
                    `${value}% (${formatarMoeda(props.payload.valor)})`,
                    props.payload.categoria
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Comparativo Mensal */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Comparativo Mês Atual vs Anterior</h3>
              <p style={styles.chartSubtitle}>Variação por categoria</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={comparativoDespesas}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  dataKey="categoria" 
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                  angle={-15}
                  textAnchor="end"
                  height={70}
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
                  formatter={(value) => value === 'mesAtual' ? 'Mês Atual' : 'Mês Anterior'}
                />
                <Bar dataKey="mesAnterior" fill="var(--neutral-500)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mesAtual" fill="var(--chart-red)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Maiores Despesas */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Maiores Despesas do Período</h3>
              <p style={styles.chartSubtitle}>Top 5 gastos</p>
            </div>
            <table style={styles.table}>
              <tbody>
                {maioresDespesas.map((despesa, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={{ ...styles.tableCell, ...styles.tableCellFirst }}>
                      <strong>{despesa.descricao}</strong>
                      <br />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {despesa.data}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.categoryBadge}>
                        {despesa.categoria}
                      </span>
                    </td>
                    <td style={{ ...styles.tableCell, ...styles.tableCellLast, fontWeight: '600', color: 'var(--error-700)' }}>
                      {formatarMoeda(despesa.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Despesas Recorrentes */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Despesas Recorrentes</h3>
              <p style={styles.chartSubtitle}>Próximos vencimentos programados</p>
            </div>
            <table style={styles.table}>
              <tbody>
                {despesasRecorrentes.map((despesa, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={{ ...styles.tableCell, ...styles.tableCellFirst }}>
                      <strong>{despesa.descricao}</strong>
                      <br />
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {despesa.periodicidade} • Próximo: {despesa.proximoVencimento}
                      </span>
                    </td>
                    <td style={{ ...styles.tableCell, ...styles.tableCellLast, fontWeight: '600' }}>
                      {formatarMoeda(despesa.valor)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatorioDespesas;