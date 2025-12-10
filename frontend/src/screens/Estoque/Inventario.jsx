import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import AppContext from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, Plus, Trash2, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import estoqueFetch from "../../services/api/estoqueFetch";
import format from "../../utils/formatters";
import CardConfirmacao from "../../components/ui/modal/CardConfirmacao";

const styles = {
  container: {
    marginLeft: "44px",
    minHeight: "100vh",
    backgroundColor: "var(--background)",
    padding: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  headerButtons: {
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    fontSize: "14px",
    color: "var(--text-primary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    position: "relative",
  },
  primaryButton: {
    padding: "10px 20px",
    textDecoration: "none",
    fontWeight: "bold",
    backgroundColor: "var(--primary-color)",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    color: "var(--text-inverse)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  searchContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  searchWrapper: {
    flex: 1,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
  },
  searchInput: {
    width: "95%",
    padding: "10px 12px 10px 40px",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    fontSize: "14px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
  },
  productCount: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    marginBottom: "16px",
  },
  tableContainer: {
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px 16px",
    backgroundColor: "var(--background-soft)",
    borderBottom: "1px solid var(--surface-border)",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-secondary)",
    textAlign: "left",
  },
  thCheckbox: {
    width: "40px",
    padding: "12px 16px",
    backgroundColor: "var(--background-soft)",
    borderBottom: "1px solid var(--surface-border)",
    textAlign: "left",
  },
  thActions: {
    width: "120px",
    padding: "12px 16px",
    backgroundColor: "var(--background-soft)",
    borderBottom: "1px solid var(--surface-border)",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-secondary)",
    textAlign: "left",
  },
  td: {
    padding: "14px 16px",
    borderBottom: "1px solid var(--surface-border)",
    fontSize: "14px",
    color: "var(--text-primary)",
  },
  productCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  productImage: {
    minWidth: "70px",
    minHeight: "70px",
    maxWidth: "70px",
    maxHeight: "70px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "12px",
    backgroundColor: "var(--surface-strong)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "transform 0.2s",
    overflow: "hidden",
  },
  productName: {
    color: "var(--primary-color)",
    fontWeight: "500",
  },
  priceBox: {
    padding: "6px 12px",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    display: "inline-block",
    width: "fit-content",
  },
  actionsContainer: {
    display: "flex",
    gap: "8px",
  },
  actionButton: {
    padding: "8px",
    color: "var(--text-secondary)",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  variationRow: {
    backgroundColor: "var(--background-soft)",
  },
  variationCell: {
    paddingLeft: "80px",
    color: "var(--text-secondary)",
  },
  variationPriceBox: {
    padding: "6px 12px",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    display: "inline-block",
    width: "fit-content",
    backgroundColor: "var(--background)",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 4px)",
    right: 0,
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minWidth: "280px",
    maxHeight: "400px",
    overflowY: "auto",
    zIndex: 1000,
  },
  dropdownHeader: {
    padding: "12px 16px",
    borderBottom: "1px solid var(--surface-border)",
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-secondary)",
  },
  categoryItem: {
    padding: "12px 16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "var(--text-primary)",
    transition: "background-color 0.2s",
    borderBottom: "1px solid var(--surface-border)",
  },
  categoryItemHover: {
    backgroundColor: "var(--background-soft)",
  },
  categoryName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flex: 1,
  },
  subcategoryItem: {
    padding: "10px 16px 10px 40px",
    cursor: "pointer",
    fontSize: "13px",
    color: "var(--text-secondary)",
    transition: "background-color 0.2s",
    borderBottom: "1px solid var(--surface-border)",
  },
  subcategoryItemHover: {
    backgroundColor: "var(--background-soft)",
  },
  activeFilter: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    fontWeight: "600",
  },
  clearButton: {
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: "13px",
    color: "var(--primary-color)",
    textAlign: "center",
    fontWeight: "600",
    borderTop: "1px solid var(--surface-border)",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderTop: "1px solid var(--surface-border)",
    backgroundColor: "var(--background)",
  },
  paginationInfo: {
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
  paginationButtons: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  paginationButton: {
    padding: "8px 12px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    fontSize: "14px",
    color: "var(--text-primary)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.2s",
  },
  paginationButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  paginationButtonActive: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    borderColor: "var(--primary-color)",
  },
};

export default function Inventario() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [deletarModal, setDeletarModal] = useState(false);
  const [textModal, setTextModal] = useState("");
  const [subtextModal, setSubtextModal] = useState("");
  const [idDeleted, setIdDeleted] = useState(0);
  
  // Estados para paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;
  
  // Estados para o dropdown
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriasExpandidas, setCategoriasExpandidas] = useState({});
  const [filtroSelecionado, setFiltroSelecionado] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickFora = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAberto(false);
      }
    };

    if (dropdownAberto) {
      document.addEventListener("mousedown", handleClickFora);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [dropdownAberto]);

  const listarProdutos = async () => {
    const produtosResponsse = await estoqueFetch.lista();
    setProdutos(produtosResponsse);
  };

  const listarCategorias = async () => {
    const categoriasResponsse = await estoqueFetch.listaCategoria()
    setCategorias(categoriasResponsse)
  }

  useEffect(() => {
    listarProdutos();
    listarCategorias()
  }, []);

  const toggleCategoria = (idCategoria) => {
    setCategoriasExpandidas((prev) => ({
      ...prev,
      [idCategoria]: !prev[idCategoria],
    }));
  };

  const selecionarFiltro = (tipo, id, nome) => {
    setFiltroSelecionado({ tipo, id, nome });
    setDropdownAberto(false);
    setPaginaAtual(1); // Reset para primeira página ao filtrar
  };

  const limparFiltro = () => {
    setFiltroSelecionado(null);
    setPaginaAtual(1); // Reset para primeira página ao limpar filtro
  };

  const produtosFiltrados = useMemo(() => {
    let filtrados = produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );

    // Aplicar filtro de categoria/subcategoria
    if (filtroSelecionado) {
      if (filtroSelecionado.tipo === "categoria") {
        filtrados = filtrados.filter(
          (p) => p.id_categoria === filtroSelecionado.id
        );
      } else if (filtroSelecionado.tipo === "subcategoria") {
        filtrados = filtrados.filter(
          (p) => p.id_subcategoria === filtroSelecionado.id
        );
      }
    }

    return filtrados;
  }, [produtos, busca, filtroSelecionado]);

  // Cálculos de paginação
  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const produtosPaginados = produtosFiltrados.slice(indiceInicial, indiceFinal);

  // Reset para primeira página quando busca mudar
  useEffect(() => {
    setPaginaAtual(1);
  }, [busca]);

  const irParaPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      irParaPagina(paginaAtual - 1);
    }
  };

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      irParaPagina(paginaAtual + 1);
    }
  };

  // Gerar array de números de página para exibir
  const gerarNumerosPaginas = () => {
    const paginas = [];
    const maxPaginasVisiveis = 5;
    
    if (totalPaginas <= maxPaginasVisiveis) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (paginaAtual <= 3) {
        for (let i = 1; i <= 4; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      } else if (paginaAtual >= totalPaginas - 2) {
        paginas.push(1);
        paginas.push('...');
        for (let i = totalPaginas - 3; i <= totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        paginas.push(1);
        paginas.push('...');
        for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++) {
          paginas.push(i);
        }
        paginas.push('...');
        paginas.push(totalPaginas);
      }
    }
    
    return paginas;
  };

  const estoqueCalc = (produto) => {
    let estoque = 0;

    if (produto.variacao.length >= 1) {
      produto.variacao.map((dados) => {
        estoque += dados.estoque;
      });

      return estoque === 0 ? "Sem estoque" : estoque;
    } else {
      return produto.estoque === 0 ? "Sem estoque" : produto.estoque;
    }
  };

  const getAllImages = useCallback((imagens) => {
    if (!imagens?.length) return [];
    return imagens.map((img) => `http://localhost:1122${img.caminho_arquivo}`);
  }, []);

  const { adicionarAviso } = useContext(AppContext);

  const deletarProduto = async (id) => {
    const res = await estoqueFetch.deletar(id);
    adicionarAviso("sucesso", `Produto com id: ${id} foi deletado com sucesso`);
    listarProdutos();

    setIdDeleted(0);
    setTextModal(``);
    setSubtextModal("Esses dados não poderão ser recuperados posteriormente.");
    setDeletarModal(false);
  };

  const handleDeletarProduto = async (product) => {
    setIdDeleted(product.id_produto);
    setTextModal(`Deseja confirmar a exclusão de: ${product.nome}`);
    setSubtextModal("Esses dados não poderão ser recuperados posteriormente.");
    setDeletarModal(true);
  };

  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Produtos</h1>

        <div style={styles.headerButtons}>
          <Link to={"/estoque/cadastro"} style={styles.primaryButton}>
            <Plus size={16} />
            Adicionar produto
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div style={styles.searchContainer}>
        <div style={styles.searchWrapper}>
          <Search size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar produtos por nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            style={{
              ...styles.button,
              ...(filtroSelecionado ? styles.activeFilter : {}),
            }}
            onClick={() => setDropdownAberto(!dropdownAberto)}
          >
            <Filter size={16} />
            {filtroSelecionado ? filtroSelecionado.nome : "Filtrar"}
          </button>

          {dropdownAberto && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>Filtrar por categoria</div>

              {categorias.map((categoria) => (
                <div key={categoria.id_categoria}>
                  <div
                    style={{
                      ...styles.categoryItem,
                      ...(hoveredCategory === categoria.id_categoria
                        ? styles.categoryItemHover
                        : {}),
                    }}
                    onMouseEnter={() => setHoveredCategory(categoria.id_categoria)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onClick={() => {
                      if (categoria.subcategorias.length > 0) {
                        toggleCategoria(categoria.id_categoria);
                      } else {
                        selecionarFiltro(
                          "categoria",
                          categoria.id_categoria,
                          categoria.nome
                        );
                      }
                    }}
                  >
                    <div style={styles.categoryName}>
                      {categoria.subcategorias.length > 0 && (
                        <>
                          {categoriasExpandidas[categoria.id_categoria] ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </>
                      )}
                      <span>{categoria.nome}</span>
                    </div>
                  </div>

                  {categoriasExpandidas[categoria.id_categoria] &&
                    categoria.subcategorias.map((subcategoria) => (
                      <div
                        key={subcategoria.id_subcategoria}
                        style={{
                          ...styles.subcategoryItem,
                          ...(hoveredSubcategory === subcategoria.id_subcategoria
                            ? styles.subcategoryItemHover
                            : {}),
                        }}
                        onMouseEnter={() =>
                          setHoveredSubcategory(subcategoria.id_subcategoria)
                        }
                        onMouseLeave={() => setHoveredSubcategory(null)}
                        onClick={() =>
                          selecionarFiltro(
                            "subcategoria",
                            subcategoria.id_subcategoria,
                            subcategoria.nome
                          )
                        }
                      >
                        {subcategoria.nome}
                      </div>
                    ))}
                </div>
              ))}

              {filtroSelecionado && (
                <div style={styles.clearButton} onClick={limparFiltro}>
                  Limpar filtro
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product count */}
      <div style={styles.productCount}>
        {produtosFiltrados.length} produtos
        {filtroSelecionado && ` - Filtrado por: ${filtroSelecionado.nome}`}
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thCheckbox}></th>
              <th style={styles.th}>Produto</th>
              <th style={styles.th}>Estoque</th>
              <th style={styles.th}>Preço de custo</th>
              <th style={styles.th}>Margem</th>
              <th style={styles.th}>Preço de venda</th>
              <th style={styles.thActions}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosPaginados.map((product) => {
              const imagemProduto = getAllImages(product.images);
              return (
                <React.Fragment key={product.id_produto}>
                  <tr>
                    <td style={styles.td}></td>

                    <td style={styles.td}>
                      <div style={styles.productCell}>
                        <div
                          style={{
                            ...styles.productImage,
                            backgroundImage: `url(${imagemProduto[0]})`,
                          }}
                        />
                        <Link
                          to={`/estoque/detalhes/produto/${product.id_produto}`}
                          style={styles.productName}
                        >
                          {product.nome}
                        </Link>
                      </div>
                    </td>

                    <td style={styles.td}>{estoqueCalc(product)}</td>

                    <td style={styles.td}>
                      <div style={styles.priceBox}>
                        {format.formatarCurrency(product.preco_custo)}
                      </div>
                    </td>

                    <td style={styles.td}>{product.margem} %</td>

                    <td style={styles.td}>
                      <div style={styles.priceBox}>
                        {format.formatarCurrency(product.preco_venda)}
                      </div>
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actionsContainer}>
                        <button
                          style={styles.actionButton}
                          onClick={() => {
                            navigate(
                              `/estoque/detalhes/produto/${product.id_produto}`
                            );
                          }}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          style={styles.actionButton}
                          onClick={() => handleDeletarProduto(product)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Variations */}
                  {product.variacao &&
                    product.variacao.map((variation, idx) => (
                      <tr key={idx} style={styles.variationRow}>
                        <td style={styles.td}></td>
                        <td style={{ ...styles.td, ...styles.variationCell }}>
                          {variation.nome}
                        </td>
                        <td style={styles.td}>
                          {variation.estoque === 0
                            ? "Sem estoque"
                            : variation.estoque}
                        </td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                        <td style={styles.td}></td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {/* Paginação */}
        {totalPaginas > 1 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Mostrando {indiceInicial + 1} a {Math.min(indiceFinal, produtosFiltrados.length)} de {produtosFiltrados.length} produtos
            </div>

            <div style={styles.paginationButtons}>
              <button
                style={{
                  ...styles.paginationButton,
                  ...(paginaAtual === 1 ? styles.paginationButtonDisabled : {}),
                }}
                onClick={paginaAnterior}
                disabled={paginaAtual === 1}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              {gerarNumerosPaginas().map((numero, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.paginationButton,
                    ...(numero === paginaAtual ? styles.paginationButtonActive : {}),
                  }}
                  onClick={() => typeof numero === 'number' && irParaPagina(numero)}
                  disabled={numero === '...'}
                >
                  {numero}
                </button>
              ))}

              <button
                style={{
                  ...styles.paginationButton,
                  ...(paginaAtual === totalPaginas ? styles.paginationButtonDisabled : {}),
                }}
                onClick={proximaPagina}
                disabled={paginaAtual === totalPaginas}
              >
                Próxima
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {deletarModal && (
        <CardConfirmacao
          action={() => deletarProduto(idDeleted)}
          onClose={() => setDeletarModal(false)}
          text={textModal}
          subText={subtextModal}
        />
      )}
    </div>
  );
}