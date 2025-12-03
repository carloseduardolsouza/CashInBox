import { useState, useEffect } from "react";
import { FaSearch, FaChevronDown, FaChevronRight, FaUndo } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";

// Dados simulados
const categoriasCadastradas = [
  {
    id: 1,
    nome: "Fornecedores",
    subcategorias: ["Matéria Prima", "Equipamentos", "Insumos"],
    total: 8450.00,
    quantidade: 12
  },
  {
    id: 2,
    nome: "Aluguel",
    subcategorias: ["Imóveis", "Equipamentos", "Veículos"],
    total: 5200.00,
    quantidade: 5
  },
  {
    id: 3,
    nome: "Serviços",
    subcategorias: ["Consultoria", "Manutenção", "TI"],
    total: 12300.00,
    quantidade: 18
  },
  {
    id: 4,
    nome: "Utilities",
    subcategorias: ["Energia", "Água", "Internet", "Telefone"],
    total: 3100.00,
    quantidade: 8
  },
  {
    id: 5,
    nome: "Folha de Pagamento",
    subcategorias: ["Salários", "Encargos", "Benefícios"],
    total: 45600.00,
    quantidade: 32
  }
];

const contasPorCategoria = {
  "Fornecedores": {
    "Matéria Prima": [
      { id: 1, fornecedor: "Tech Supplies LTDA", valor: 1500.00, data_pagamento: "2025-11-15", forma_pagamento: "PIX" },
      { id: 2, fornecedor: "Distribuidora ABC", valor: 3200.00, data_pagamento: "2025-11-20", forma_pagamento: "Boleto" }
    ],
    "Equipamentos": [
      { id: 3, fornecedor: "Tech Solutions", valor: 2100.00, data_pagamento: "2025-11-10", forma_pagamento: "Cartão" }
    ],
    "Insumos": [
      { id: 4, fornecedor: "Papelaria Express", valor: 650.00, data_pagamento: "2025-11-25", forma_pagamento: "PIX" }
    ]
  },
  "Aluguel": {
    "Imóveis": [
      { id: 5, fornecedor: "Imobiliária Central", valor: 4000.00, data_pagamento: "2025-11-05", forma_pagamento: "TED" }
    ],
    "Equipamentos": [
      { id: 6, fornecedor: "Rental Tech", valor: 800.00, data_pagamento: "2025-11-12", forma_pagamento: "Boleto" }
    ],
    "Veículos": [
      { id: 7, fornecedor: "Locadora Premium", valor: 400.00, data_pagamento: "2025-11-18", forma_pagamento: "PIX" }
    ]
  },
  "Serviços": {
    "Consultoria": [
      { id: 8, fornecedor: "Consultoria XYZ", valor: 8000.00, data_pagamento: "2025-11-08", forma_pagamento: "TED" }
    ],
    "Manutenção": [
      { id: 9, fornecedor: "Manutenção Geral", valor: 1200.00, data_pagamento: "2025-11-22", forma_pagamento: "PIX" }
    ],
    "TI": [
      { id: 10, fornecedor: "Cloud Services", valor: 3100.00, data_pagamento: "2025-11-30", forma_pagamento: "Cartão" }
    ]
  },
  "Utilities": {
    "Energia": [
      { id: 11, fornecedor: "Energia S.A.", valor: 1200.00, data_pagamento: "2025-11-10", forma_pagamento: "Débito Automático" }
    ],
    "Água": [
      { id: 12, fornecedor: "SABESP", valor: 450.00, data_pagamento: "2025-11-15", forma_pagamento: "Débito Automático" }
    ],
    "Internet": [
      { id: 13, fornecedor: "Telecom Plus", valor: 350.00, data_pagamento: "2025-11-20", forma_pagamento: "Boleto" }
    ],
    "Telefone": [
      { id: 14, fornecedor: "Telecom Plus", valor: 1100.00, data_pagamento: "2025-11-20", forma_pagamento: "Boleto" }
    ]
  },
  "Folha de Pagamento": {
    "Salários": [
      { id: 15, fornecedor: "Funcionários", valor: 35000.00, data_pagamento: "2025-11-05", forma_pagamento: "TED" }
    ],
    "Encargos": [
      { id: 16, fornecedor: "INSS", valor: 7000.00, data_pagamento: "2025-11-15", forma_pagamento: "DARF" }
    ],
    "Benefícios": [
      { id: 17, fornecedor: "Vale Alimentação", valor: 3600.00, data_pagamento: "2025-11-01", forma_pagamento: "TED" }
    ]
  }
};

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
  viewToggle: {
    display: "flex",
    gap: "8px",
    backgroundColor: "var(--surface-strong)",
    padding: "4px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)"
  },
  toggleButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    backgroundColor: "transparent",
    color: "var(--text-secondary)"
  },
  toggleButtonActive: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)"
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
    alignItems: "center"
  },
  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
    marginTop: "20px"
  },
  categoryCard: {
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    cursor: "pointer"
  },
  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  categoryName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px"
  },
  categoryQuantity: {
    fontSize: "12px",
    color: "var(--text-muted)"
  },
  categoryValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--success-500)",
    marginBottom: "12px"
  },
  subcategoriesList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "12px"
  },
  subcategoryTag: {
    padding: "4px 10px",
    borderRadius: "6px",
    backgroundColor: "var(--surface-strong)",
    fontSize: "12px",
    color: "var(--text-secondary)",
    border: "1px solid var(--surface-border)"
  },
  detailView: {
    marginTop: "20px"
  },
  backButton: {
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    border: "1px solid var(--surface-border)",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "20px"
  },
  subcategorySection: {
    marginBottom: "24px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)"
  },
  subcategoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px"
  },
  subcategoryTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  subcategoryTotal: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--success-500)"
  },
  contasTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "8px"
  },
  tableHeader: {
    backgroundColor: "var(--surface-strong)",
    textAlign: "left",
    padding: "12px",
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    borderBottom: "1px solid var(--surface-border)"
  },
  tableCell: {
    padding: "12px",
    borderBottom: "1px solid var(--surface-border)",
    fontSize: "14px",
    color: "var(--text-primary)"
  },
  tableRow: {
    backgroundColor: "var(--background)"
  },
  actionButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px"
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
    zIndex: 1000
  },
  modal: {
    backgroundColor: "var(--background)",
    borderRadius: "12px",
    padding: "24px",
    maxWidth: "400px",
    width: "90%",
    border: "1px solid var(--surface-border)"
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "12px"
  },
  modalText: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    marginBottom: "24px",
    lineHeight: "1.5"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end"
  },
  modalButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500"
  },
  modalButtonCancel: {
    backgroundColor: "var(--surface)",
    color: "var(--text-primary)",
    border: "1px solid var(--surface-border)"
  },
  modalButtonConfirm: {
    backgroundColor: "var(--warning-500)",
    color: "var(--text-inverse)"
  }
};

function ContasPagas() {
  const [visualizacao, setVisualizacao] = useState("categorias");
  const [busca, setBusca] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [subcategoriasExpandidas, setSubcategoriasExpandidas] = useState({});
  const [modalDesmarcar, setModalDesmarcar] = useState(null);

  const formatarCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const calcularEstatisticas = () => {
    const total = categorias.reduce((acc, cat) => acc + cat.total, 0);
    const quantidade = categorias.reduce((acc, cat) => acc + cat.quantidade, 0);
    const categoriaCount = categorias.length;
    
    return { total, quantidade, categoriaCount };
  };

  const filtrarCategorias = () => {
    if (!busca) return categorias;
    
    return categorias.filter(cat => 
      cat.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cat.subcategorias.some(sub => sub.toLowerCase().includes(busca.toLowerCase()))
    );
  };

  const toggleSubcategoria = (subcategoria) => {
    setSubcategoriasExpandidas(prev => ({
      ...prev,
      [subcategoria]: !prev[subcategoria]
    }));
  };

  const abrirModalDesmarcar = (conta, categoria, subcategoria) => {
    setModalDesmarcar({ conta, categoria, subcategoria });
  };

  const confirmarDesmarcar = () => {
    if (!modalDesmarcar) return;
    
    // Aqui você faria a chamada para a API para desmarcar a conta como paga
    console.log("Desmarcando conta:", modalDesmarcar.conta.id);
    
    // Simulação de sucesso
    alert(`Conta "${modalDesmarcar.conta.fornecedor}" foi desmarcada como paga e retornará para "Contas a Pagar"`);
    
    setModalDesmarcar(null);
    
    // Aqui você recarregaria os dados após desmarcar
    // buscarContas();
  };

  useEffect(() => {
    setCategorias(categoriasCadastradas);
  }, []);

  const stats = calcularEstatisticas();
  const categoriasFiltradas = filtrarCategorias();

  const renderVisualizacaoCategorias = () => (
    <div style={styles.categoriesGrid}>
      {categoriasFiltradas.map(categoria => (
        <div 
          key={categoria.id} 
          style={styles.categoryCard}
          onClick={() => setCategoriaSelecionada(categoria)}
        >
          <div style={styles.categoryHeader}>
            <div>
              <div style={styles.categoryName}>{categoria.nome}</div>
              <div style={styles.categoryQuantity}>{categoria.quantidade} contas pagas</div>
            </div>
            <MdAttachMoney size={24} color="var(--success-500)" />
          </div>
          <div style={styles.categoryValue}>{formatarCurrency(categoria.total)}</div>
          <div style={styles.subcategoriesList}>
            {categoria.subcategorias.map((sub, idx) => (
              <span key={idx} style={styles.subcategoryTag}>{sub}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderVisualizacaoSubcategorias = () => (
    <div>
      {categoriasFiltradas.map(categoria => (
        <div key={categoria.id} style={{ marginBottom: "32px" }}>
          <h3 style={{ 
            fontSize: "20px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            marginBottom: "16px"
          }}>
            {categoria.nome} - {formatarCurrency(categoria.total)}
          </h3>
          {categoria.subcategorias.map(subcategoria => {
            const contas = contasPorCategoria[categoria.nome]?.[subcategoria] || [];
            const totalSubcategoria = contas.reduce((acc, c) => acc + c.valor, 0);
            const isExpanded = subcategoriasExpandidas[`${categoria.nome}-${subcategoria}`];
            
            return (
              <div key={subcategoria} style={styles.subcategorySection}>
                <div 
                  style={styles.subcategoryHeader}
                  onClick={() => toggleSubcategoria(`${categoria.nome}-${subcategoria}`)}
                >
                  <div style={styles.subcategoryTitle}>
                    {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                    {subcategoria}
                    <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "400" }}>
                      ({contas.length} contas)
                    </span>
                  </div>
                  <div style={styles.subcategoryTotal}>{formatarCurrency(totalSubcategoria)}</div>
                </div>
                
                {isExpanded && contas.length > 0 && (
                  <table style={styles.contasTable}>
                    <thead>
                      <tr>
                        <th style={styles.tableHeader}>Fornecedor</th>
                        <th style={styles.tableHeader}>Data Pagamento</th>
                        <th style={styles.tableHeader}>Forma Pagamento</th>
                        <th style={styles.tableHeader}>Valor</th>
                        <th style={styles.tableHeader}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contas.map(conta => (
                        <tr key={conta.id} style={styles.tableRow}>
                          <td style={styles.tableCell}>{conta.fornecedor}</td>
                          <td style={styles.tableCell}>{formatarData(conta.data_pagamento)}</td>
                          <td style={styles.tableCell}>{conta.forma_pagamento}</td>
                          <td style={styles.tableCell}>{formatarCurrency(conta.valor)}</td>
                          <td style={styles.tableCell}>
                            <button 
                              style={styles.actionButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                abrirModalDesmarcar(conta, categoria.nome, subcategoria);
                              }}
                            >
                              <FaUndo size={12} />
                              Desmarcar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderDetalheCategoria = () => {
    if (!categoriaSelecionada) return null;

    return (
      <div style={styles.detailView}>
        <button 
          style={styles.backButton}
          onClick={() => setCategoriaSelecionada(null)}
        >
          ← Voltar
        </button>
        
        <h3 style={{ 
          fontSize: "24px", 
          fontWeight: "600", 
          color: "var(--text-primary)",
          marginBottom: "24px"
        }}>
          {categoriaSelecionada.nome} - {formatarCurrency(categoriaSelecionada.total)}
        </h3>

        {categoriaSelecionada.subcategorias.map(subcategoria => {
          const contas = contasPorCategoria[categoriaSelecionada.nome]?.[subcategoria] || [];
          const totalSubcategoria = contas.reduce((acc, c) => acc + c.valor, 0);
          const isExpanded = subcategoriasExpandidas[subcategoria];
          
          return (
            <div key={subcategoria} style={styles.subcategorySection}>
              <div 
                style={styles.subcategoryHeader}
                onClick={() => toggleSubcategoria(subcategoria)}
              >
                <div style={styles.subcategoryTitle}>
                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                  {subcategoria}
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "400" }}>
                    ({contas.length} contas)
                  </span>
                </div>
                <div style={styles.subcategoryTotal}>{formatarCurrency(totalSubcategoria)}</div>
              </div>
              
              {isExpanded && contas.length > 0 && (
                <table style={styles.contasTable}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Fornecedor</th>
                      <th style={styles.tableHeader}>Data Pagamento</th>
                      <th style={styles.tableHeader}>Forma Pagamento</th>
                      <th style={styles.tableHeader}>Valor</th>
                      <th style={styles.tableHeader}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contas.map(conta => (
                      <tr key={conta.id} style={styles.tableRow}>
                        <td style={styles.tableCell}>{conta.fornecedor}</td>
                        <td style={styles.tableCell}>{formatarData(conta.data_pagamento)}</td>
                        <td style={styles.tableCell}>{conta.forma_pagamento}</td>
                        <td style={styles.tableCell}>{formatarCurrency(conta.valor)}</td>
                        <td style={styles.tableCell}>
                          <button 
                            style={styles.actionButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              abrirModalDesmarcar(conta, categoriaSelecionada.nome, subcategoria);
                            }}
                          >
                            <FaUndo size={12} />
                            Desmarcar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Contas Pagas</h2>
      </div>

      {/* Estatísticas */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Pago</div>
          <div style={{...styles.statValue, color: "var(--success-500)"}}>{formatarCurrency(stats.total)}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Contas Pagas</div>
          <div style={styles.statValue}>{stats.quantidade}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Categorias</div>
          <div style={styles.statValue}>{stats.categoriaCount}</div>
        </div>
      </div>

      {/* Toolbar */}
      {!categoriaSelecionada && (
        <div style={styles.toolbar}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              style={styles.input}
              placeholder="Buscar por categoria ou subcategoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button style={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
          
          <div style={styles.viewToggle}>
            <button
              style={{
                ...styles.toggleButton,
                ...(visualizacao === "categorias" ? styles.toggleButtonActive : {})
              }}
              onClick={() => setVisualizacao("categorias")}
            >
              Por Categoria
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(visualizacao === "subcategorias" ? styles.toggleButtonActive : {})
              }}
              onClick={() => setVisualizacao("subcategorias")}
            >
              Por Subcategoria
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      {categoriaSelecionada ? (
        renderDetalheCategoria()
      ) : visualizacao === "categorias" ? (
        renderVisualizacaoCategorias()
      ) : (
        renderVisualizacaoSubcategorias()
      )}

      {/* Modal de Confirmação */}
      {modalDesmarcar && (
        <div style={styles.modalOverlay} onClick={() => setModalDesmarcar(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitle}>Desmarcar como paga?</div>
            <div style={styles.modalText}>
              Tem certeza que deseja desmarcar a conta de <strong>{modalDesmarcar.conta.fornecedor}</strong> 
              no valor de <strong>{formatarCurrency(modalDesmarcar.conta.valor)}</strong> como paga?
              <br /><br />
              Esta conta retornará para a lista de "Contas a Pagar".
            </div>
            <div style={styles.modalActions}>
              <button 
                style={{...styles.modalButton, ...styles.modalButtonCancel}}
                onClick={() => setModalDesmarcar(null)}
              >
                Cancelar
              </button>
              <button 
                style={{...styles.modalButton, ...styles.modalButtonConfirm}}
                onClick={confirmarDesmarcar}
              >
                Sim, desmarcar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContasPagas;