import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiPackage, FiAlertTriangle, FiTrendingDown, FiDollarSign, FiShoppingBag, FiActivity } from 'react-icons/fi';

const RelatorioEstoque = () => {
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');

  const dadosEstoquePorCategoria = [
    { categoria: 'Eletrônicos', quantidade: 842, valor: 126300 },
    { categoria: 'Roupas', quantidade: 1205, valor: 48200 },
    { categoria: 'Alimentos', quantidade: 1456, valor: 29120 },
    { categoria: 'Cosméticos', quantidade: 339, valor: 16950 }
  ];

  const dadosGiroEstoque = [
    { mes: 'Jan', giro: 3.2 },
    { mes: 'Fev', giro: 3.5 },
    { mes: 'Mar', giro: 2.8 },
    { mes: 'Abr', giro: 4.1 },
    { mes: 'Mai', giro: 3.9 },
    { mes: 'Jun', giro: 4.4 }
  ];

  const produtosEstoqueBaixo = [
    { produto: 'Produto XYZ-001', estoque: 5, minimo: 20, categoria: 'Eletrônicos' },
    { produto: 'Produto ABC-045', estoque: 8, minimo: 15, categoria: 'Roupas' },
    { produto: 'Produto DEF-122', estoque: 3, minimo: 25, categoria: 'Alimentos' },
    { produto: 'Produto GHI-089', estoque: 12, minimo: 30, categoria: 'Cosméticos' },
    { produto: 'Produto JKL-234', estoque: 7, minimo: 18, categoria: 'Eletrônicos' }
  ];

  const produtosParados = [
    { produto: 'Produto OLD-101', dias: 145, quantidade: 45, valor: 6750 },
    { produto: 'Produto OLD-205', dias: 120, quantidade: 32, valor: 4800 },
    { produto: 'Produto OLD-318', dias: 98, quantidade: 28, valor: 3360 }
  ];

  const statusEstoque = [
    { nome: 'Normal', valor: 72, cor: 'var(--chart-green)' },
    { nome: 'Alerta', valor: 18, cor: 'var(--chart-yellow)' },
    { nome: 'Crítico', valor: 10, cor: 'var(--chart-red)' }
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
    alertList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    alertItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: 'var(--background)',
      borderRadius: '8px',
      border: '1px solid var(--surface-border)'
    },
    alertItemCritical: {
      backgroundColor: 'var(--error-100)',
      borderColor: 'var(--error-500)'
    },
    alertInfo: {
      flex: 1
    },
    alertName: {
      fontSize: '14px',
      fontWeight: '500',
      color: 'var(--text-primary)',
      marginBottom: '4px'
    },
    alertDetails: {
      fontSize: '12px',
      color: 'var(--text-muted)'
    },
    alertBadge: {
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      marginLeft: '12px'
    },
    alertBadgeCritical: {
      backgroundColor: 'var(--error-500)',
      color: 'var(--text-inverse)'
    },
    alertBadgeWarning: {
      backgroundColor: 'var(--warning-500)',
      color: 'var(--text-inverse)'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 8px'
    },
    tableRow: {
      backgroundColor: 'var(--background)',
      borderRadius: '8px'
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
            <h1 style={styles.pageTitle}>Relatório de Estoque</h1>
            <p style={styles.pageSubtitle}>Controle e análise do inventário</p>
          </div>
          <div style={styles.filterGroup}>
            {['todas', 'eletronicos', 'roupas', 'alimentos', 'cosmeticos'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                style={{
                  ...styles.filterButton,
                  ...(categoriaFiltro === cat ? styles.filterButtonActive : {})
                }}
              >
                {cat === 'todas' && 'Todas Categorias'}
                {cat === 'eletronicos' && 'Eletrônicos'}
                {cat === 'roupas' && 'Roupas'}
                {cat === 'alimentos' && 'Alimentos'}
                {cat === 'cosmeticos' && 'Cosméticos'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.contentWrapper}>
        {/* KPIs */}
        <div style={styles.kpiGrid}>
          <KPICard
            icon={<FiPackage />}
            label="Total em Estoque"
            value="3.842"
            subvalue="unidades disponíveis"
            iconBg="var(--chart-blue)"
            iconColor="var(--text-inverse)"
          />
          <KPICard
            icon={<FiDollarSign />}
            label="Valor do Estoque"
            value={formatarMoeda(220570)}
            subvalue="custo total de aquisição"
            iconBg="var(--success-100)"
            iconColor="var(--success-700)"
          />
          <KPICard
            icon={<FiAlertTriangle />}
            label="Produtos em Alerta"
            value="23"
            subvalue="abaixo do estoque mínimo"
            iconBg="var(--warning-100)"
            iconColor="var(--warning-700)"
          />
          <KPICard
            icon={<FiActivity />}
            label="Giro Médio"
            value="3.8x"
            subvalue="rotações no período"
            iconBg="var(--chart-purple)"
            iconColor="var(--text-inverse)"
          />
        </div>

        <div style={styles.chartsGrid}>
          {/* Estoque por Categoria */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Estoque por Categoria</h3>
              <p style={styles.chartSubtitle}>Quantidade e valor por categoria</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dadosEstoquePorCategoria}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
                <XAxis 
                  dataKey="categoria" 
                  stroke="var(--text-muted)"
                  style={{ fontSize: '12px' }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
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
                    name === 'valor' ? 'Valor' : 'Quantidade'
                  ]}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                  formatter={(value) => value === 'valor' ? 'Valor' : 'Quantidade'}
                />
                <Bar dataKey="quantidade" fill="var(--chart-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status do Estoque */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Status do Estoque</h3>
              <p style={styles.chartSubtitle}>Distribuição por nível de estoque</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusEstoque}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ nome, valor }) => `${nome} ${valor}%`}
                  outerRadius={90}
                  fill="var(--chart-blue)"
                  dataKey="valor"
                >
                  {statusEstoque.map((entry, index) => (
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

          {/* Giro de Estoque */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Giro de Estoque</h3>
              <p style={styles.chartSubtitle}>Rotatividade mensal do inventário</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dadosGiroEstoque}>
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
                  formatter={(value) => [`${value}x`, 'Giro']}
                />
                <Bar dataKey="giro" fill="var(--chart-green)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Produtos com Estoque Baixo */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Alertas de Estoque Baixo</h3>
              <p style={styles.chartSubtitle}>Produtos que precisam de reposição</p>
            </div>
            <div style={styles.alertList}>
              {produtosEstoqueBaixo.map((produto, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.alertItem,
                    ...(produto.estoque < produto.minimo / 2 ? styles.alertItemCritical : {})
                  }}
                >
                  <div style={styles.alertInfo}>
                    <p style={styles.alertName}>{produto.produto}</p>
                    <p style={styles.alertDetails}>
                      Estoque: {produto.estoque} un. | Mínimo: {produto.minimo} un. | {produto.categoria}
                    </p>
                  </div>
                  <span style={{
                    ...styles.alertBadge,
                    ...(produto.estoque < produto.minimo / 2 ? styles.alertBadgeCritical : styles.alertBadgeWarning)
                  }}>
                    {produto.estoque < produto.minimo / 2 ? 'CRÍTICO' : 'ALERTA'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Produtos Parados */}
          <div style={{ ...styles.chartCard, ...styles.chartCardFull }}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>Produtos com Baixa Rotatividade</h3>
              <p style={styles.chartSubtitle}>Itens parados há mais de 90 dias</p>
            </div>
            <table style={styles.table}>
              <tbody>
                {produtosParados.map((produto, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={{ ...styles.tableCell, ...styles.tableCellFirst }}>
                      <strong>{produto.produto}</strong>
                    </td>
                    <td style={styles.tableCell}>
                      {produto.dias} dias parado
                    </td>
                    <td style={styles.tableCell}>
                      {produto.quantidade} unidades
                    </td>
                    <td style={{ ...styles.tableCell, ...styles.tableCellLast, fontWeight: '600' }}>
                      {formatarMoeda(produto.valor)}
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

export default RelatorioEstoque;