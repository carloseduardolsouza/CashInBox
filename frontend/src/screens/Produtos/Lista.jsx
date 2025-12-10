import { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaBox,
  FaTag,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import estoqueFetch from "../../services/api/estoqueFetch";

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedProducts, setExpandedProducts] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalAberta, setModalAberta] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const PRODUTOS_POR_PAGINA = 10;

  const abrirLightbox = useCallback((imagens, indexInicial = 0) => {
    setLightboxImages(imagens);
    setCurrentImageIndex(indexInicial);
    setLightboxOpen(true);
  }, []);

  const fecharLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const abrirModal = useCallback((produto) => {
    setProdutoSelecionado(produto);
    setModalAberta(true);
    document.body.style.overflow = "hidden";
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberta(false);
    setProdutoSelecionado(null);
    document.body.style.overflow = "auto";
  }, []);

  const toggleExpandProduct = useCallback((produtoId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [produtoId]: !prev[produtoId],
    }));
  }, []);

  const getImagemPrincipal = useCallback((imagens) => {
    if (!imagens?.length) return null;
    const principal = imagens.find(
      (img) =>
        img.principal === true ||
        img.principal === 1 ||
        img.principal === "1"
    );
    return principal?.caminho_arquivo || imagens[0]?.caminho_arquivo || null;
  }, []);

  const getAllImages = useCallback((imagens) => {
    if (!imagens?.length) return [];
    return imagens.map(
      (img) => `http://localhost:1122${img.caminho_arquivo}`
    );
  }, []);

  const listarProdutos = async () => {
    const produtos = await estoqueFetch.lista();
    setProdutos(produtos);
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [busca]);

  const { produtosPaginados, totalPaginas } = useMemo(() => {
    const inicio = (paginaAtual - 1) * PRODUTOS_POR_PAGINA;
    const fim = inicio + PRODUTOS_POR_PAGINA;
    return {
      produtosPaginados: produtosFiltrados.slice(inicio, fim),
      totalPaginas: Math.ceil(produtosFiltrados.length / PRODUTOS_POR_PAGINA),
    };
  }, [produtosFiltrados, paginaAtual]);

  const irParaPagina = useCallback((pagina) => {
    setPaginaAtual(pagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const paginaAnterior = useCallback(() => {
    if (paginaAtual > 1) {
      irParaPagina(paginaAtual - 1);
    }
  }, [paginaAtual, irParaPagina]);

  const proximaPagina = useCallback(() => {
    if (paginaAtual < totalPaginas) {
      irParaPagina(paginaAtual + 1);
    }
  }, [paginaAtual, totalPaginas, irParaPagina]);

  const FallbackImage = ({ text = "Sem imagem" }) => (
    <div style={{ opacity: "0.6", textAlign: "center" }}>{text}</div>
  );

  const styles = {
    container: {
      marginLeft: "40px",
      padding: "24px 16px",
      backgroundColor: "var(--background-color)",
      minHeight: "100vh",
    },
    header: {
      marginBottom: "32px",
    },
    title: {
      color: "var(--text-primary)",
      fontSize: "32px",
      fontWeight: "700",
      marginBottom: "8px",
    },
    subtitle: {
      color: "var(--text-secondary)",
      fontSize: "14px",
      marginBottom: "24px",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      maxWidth: "400px",
    },
    inputSearch: {
      flex: 1,
      borderRadius: "8px",
      padding: "12px 16px",
      border: "2px solid var(--neutral-600)",
      fontSize: "15px",
      backgroundColor: "var(--background-soft)",
      color: "var(--text-primary)",
      transition: "all 0.2s",
      outline: "none",
    },
    buttonSearch: {
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      borderRadius: "8px",
      width: "48px",
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      backgroundColor: "var(--warning-500)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))",
      gap: "24px",
      marginTop: "24px",
    },
    card: {
      backgroundColor: "var(--surface)",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
      color: "var(--text-primary)",
    },
    cardContent: {
      display: "flex",
      gap: "20px",
    },
    imageBox: {
      minWidth: "200px",
      minHeight: "200px",
      maxWidth: "200px",
      maxHeight: "200px",
      backgroundPosition: "center",
      backgroundSize: "cover",
      cursor: "pointer",
      borderRadius: "12px",
      backgroundColor: "var(--surface-strong)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      transition: "transform 0.2s",
      overflow: "hidden",
    },
    imageCounter: {
      position: "absolute",
      bottom: "12px",
      right: "12px",
      backgroundColor: "rgba(0,0,0,0.8)",
      color: "white",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "600",
    },
    productInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    productName: {
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "4px",
      color: "var(--text-primary)",
    },
    infoRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
    },
    label: {
      color: "var(--text-secondary)",
      fontWeight: "500",
    },
    value: {
      color: "var(--text-primary)",
      fontWeight: "600",
    },
    price: {
      fontSize: "28px",
      fontWeight: "700",
      color: "var(--primary-color)",
    },
    detalhesBtn: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      padding: "12px 32px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "auto",
      border: "none",
      fontSize: "15px",
      fontWeight: "600",
      transition: "all 0.2s",
      alignSelf: "flex-start",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      backgroundColor: "var(--primary-color)",
      color: "white",
      padding: "4px 12px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "600",
      marginLeft: "8px",
    },
    variacoesContainer: {
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: "2px solid var(--neutral-600)",
    },
    variacoesHeader: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      padding: "12px 16px",
      backgroundColor: "var(--surface-strong)",
      borderRadius: "8px",
      marginBottom: "12px",
      transition: "background-color 0.2s",
      fontWeight: "600",
    },
    variacaoCard: {
      backgroundColor: "var(--background-soft)",
      padding: "16px",
      borderRadius: "10px",
      marginBottom: "12px",
      display: "flex",
      gap: "16px",
      transition: "transform 0.2s",
    },
    variacaoImage: {
      minWidth: "100px",
      minHeight: "100px",
      maxWidth: "100px",
      maxHeight: "100px",
      backgroundPosition: "center",
      backgroundSize: "cover",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "var(--surface-strong)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      transition: "transform 0.2s",
    },
    variacaoInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    variacaoNome: {
      fontSize: "16px",
      fontWeight: "600",
      color: "var(--text-primary)",
    },
    variacaoTipo: {
      fontSize: "13px",
      color: "var(--text-secondary)",
    },
    paginacao: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      marginTop: "48px",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    botaoPaginacao: {
      padding: "10px 16px",
      borderRadius: "8px",
      border: "2px solid var(--neutral-600)",
      backgroundColor: "var(--surface)",
      color: "var(--text-primary)",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      minWidth: "44px",
      justifyContent: "center",
    },
    botaoPaginacaoAtivo: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      borderColor: "var(--primary-color)",
    },
    botaoPaginacaoDesabilitado: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
    infoPaginacao: {
      color: "var(--text-secondary)",
      fontSize: "14px",
      fontWeight: "500",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "20px",
      backdropFilter: "blur(4px)",
    },
    modalContent: {
      backgroundColor: "var(--surface)",
      borderRadius: "16px",
      maxWidth: "700px",
      width: "100%",
      maxHeight: "90vh",
      overflow: "auto",
      position: "relative",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    },
    modalHeader: {
      padding: "24px",
      borderBottom: "2px solid var(--neutral-600)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "16px",
      position: "sticky",
      top: 0,
      backgroundColor: "var(--surface)",
      zIndex: 1,
    },
    modalTitle: {
      fontSize: "24px",
      fontWeight: "700",
      color: "var(--text-primary)",
      margin: 0,
    },
    modalCloseBtn: {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      color: "var(--text-secondary)",
      transition: "all 0.2s",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      width: "36px",
      height: "36px",
      flexShrink: 0,
    },
    modalBody: {
      padding: "24px",
    },
    modalSection: {
      marginBottom: "24px",
    },
    modalSectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "var(--text-primary)",
      marginBottom: "12px",
    },
    modalDescricao: {
      fontSize: "15px",
      lineHeight: "1.6",
      color: "var(--text-primary)",
      whiteSpace: "pre-wrap",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Catálogo de Produtos</h1>
        <p style={styles.subtitle}>
          {produtosFiltrados.length} produto
          {produtosFiltrados.length !== 1 ? "s" : ""} encontrado
          {produtosFiltrados.length !== 1 ? "s" : ""}
        </p>

        <div style={styles.searchContainer}>
          <input
            type="text"
            style={styles.inputSearch}
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button
            style={styles.buttonSearch}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {lightboxOpen && lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          startIndex={currentImageIndex}
          onClose={fecharLightbox}
        />
      )}

      {/* Modal de Detalhes */}
      {modalAberta && produtoSelecionado && (
        <div
          style={styles.modalOverlay}
          onClick={fecharModal}
        >
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{produtoSelecionado.nome}</h2>
              <button
                style={styles.modalCloseBtn}
                onClick={fecharModal}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--surface-strong)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <FaTimes />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <div style={styles.modalSectionTitle}>Informações do Produto</div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Código:</span>
                  <span style={styles.value}>
                    {produtoSelecionado.cod_interno || produtoSelecionado.id_produto}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Preço:</span>
                  <span style={{ ...styles.value, color: "var(--primary-color)", fontSize: "20px" }}>
                    R$ {parseFloat(produtoSelecionado.preco_venda).toFixed(2)}
                  </span>
                </div>
                <div style={styles.infoRow}>
                  <FaBox style={{ color: "#666" }} />
                  <span style={styles.label}>Estoque:</span>
                  <span style={styles.value}>
                    {produtoSelecionado.variacao?.length > 0
                      ? produtoSelecionado.variacao.reduce(
                          (acc, v) => acc + parseInt(v.estoque || 0),
                          0
                        )
                      : parseInt(produtoSelecionado.estoque || 0)}{" "}
                    un.
                  </span>
                </div>
              </div>

              {produtoSelecionado.descricao && (
                <div style={styles.modalSection}>
                  <div style={styles.modalSectionTitle}>Descrição</div>
                  <div style={styles.modalDescricao}>
                    {produtoSelecionado.descricao}
                  </div>
                </div>
              )}

              {!produtoSelecionado.descricao && (
                <div style={styles.modalSection}>
                  <div style={{ ...styles.modalDescricao, opacity: 0.6, fontStyle: "italic" }}>
                    Este produto não possui descrição.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {produtosPaginados.map((prod) => {
          const temVariacoes = prod.variacao?.length > 0;
          
          let imagemPrincipal = null;
          let todasImagens = [];
          
          if (temVariacoes) {
            for (const variacao of prod.variacao) {
              if (variacao.images) {
                imagemPrincipal = variacao.images;
                todasImagens = getAllImages(prod.images);
                break;
              }
            }
            if (!imagemPrincipal && prod.images?.length > 0) {
              imagemPrincipal = getImagemPrincipal(prod.images);
              todasImagens = getAllImages(prod.images);
            }
          } else {
            imagemPrincipal = getImagemPrincipal(prod.images);
            todasImagens = getAllImages(prod.images);
          }
          
          const isExpanded = expandedProducts[prod.id_produto];

          const estoqueTotal = temVariacoes
            ? prod.variacao.reduce(
                (acc, v) => acc + parseInt(v.estoque || 0),
                0
              )
            : parseInt(prod.estoque || 0);

          return (
            <div
              key={prod.id_produto}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div style={styles.cardContent}>
                {imagemPrincipal ? (
                  <div
                    onClick={() => abrirLightbox(todasImagens, 0)}
                    style={{
                      ...styles.imageBox,
                      backgroundImage: `url(http://localhost:1122${imagemPrincipal})`,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {todasImagens.length > 1 && (
                      <div style={styles.imageCounter}>
                        +{todasImagens.length}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={styles.imageBox}>
                    <FallbackImage />
                  </div>
                )}

                <div style={styles.productInfo}>
                  <h2 style={styles.productName}>{prod.nome}</h2>

                  <div style={styles.infoRow}>
                    <span style={styles.label}>Código:</span>
                    <span style={styles.value}>
                      {prod.cod_interno || prod.id_produto}
                    </span>
                  </div>

                  <div style={styles.price}>
                    R$ {parseFloat(prod.preco_venda).toFixed(2)}
                  </div>

                  <div style={styles.infoRow}>
                    <FaBox style={{ color: "#666" }} />
                    <span style={styles.label}>Estoque:</span>
                    <span style={styles.value}>{estoqueTotal} un.</span>
                    {temVariacoes && (
                      <span style={styles.badge}>
                        <FaTag />
                        {prod.variacao.length} variações
                      </span>
                    )}
                  </div>

                  <button
                    style={styles.detalhesBtn}
                    onClick={() => abrirModal(prod)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>

              {temVariacoes && (
                <div style={styles.variacoesContainer}>
                  <div
                    style={styles.variacoesHeader}
                    onClick={() => toggleExpandProduct(prod.id_produto)}
                  >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    <span>Variações Disponíveis ({prod.variacao.length})</span>
                  </div>

                  {isExpanded &&
                    prod.variacao.map((variacao) => {
                      const variacaoImagemPrincipal = variacao.imagem?.caminho_arquivo;

                      return (
                        <div
                          key={variacao.id_variacao}
                          style={styles.variacaoCard}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform =
                              "translateX(4px)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "translateX(0)")
                          }
                        >
                          {variacaoImagemPrincipal ? (
                            <div
                              onClick={() => abrirLightbox([`http://localhost:1122${variacaoImagemPrincipal}`], 0)}
                              style={{
                                ...styles.variacaoImage,
                                backgroundImage: `url(http://localhost:1122${variacaoImagemPrincipal})`,
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.transform = "scale(1.1)")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.transform = "scale(1)")
                              }
                            />
                          ) : (
                            <div style={styles.variacaoImage}>
                              <FallbackImage text="Sem img" />
                            </div>
                          )}

                          <div style={styles.variacaoInfo}>
                            <div style={styles.variacaoNome}>
                              {variacao.nome}
                            </div>
                            <div style={styles.variacaoTipo}>
                              {variacao.tipo}
                            </div>
                            <div style={styles.infoRow}>
                              <span style={styles.label}>Código:</span>
                              <span style={styles.value}>
                                {variacao.cod_interno}
                              </span>
                              {variacao.cod_barras && (
                                <>
                                  <span style={styles.label}>| EAN:</span>
                                  <span style={styles.value}>
                                    {variacao.cod_barras}
                                  </span>
                                </>
                              )}
                            </div>
                            <div style={styles.infoRow}>
                              <FaBox style={{ color: "#666" }} />
                              <span style={styles.label}>Estoque:</span>
                              <span style={styles.value}>
                                {variacao.estoque} un.
                              </span>
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#666",
                                }}
                              >
                                (mín: {variacao.estoque_minimo})
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Paginação */}
      {totalPaginas > 1 && (
        <div style={styles.paginacao}>
          <button
            style={{
              ...styles.botaoPaginacao,
              ...(paginaAtual === 1 && styles.botaoPaginacaoDesabilitado),
            }}
            onClick={paginaAnterior}
            disabled={paginaAtual === 1}
            onMouseEnter={(e) => {
              if (paginaAtual !== 1) {
                e.currentTarget.style.backgroundColor = "var(--surface-strong)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface)";
            }}
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numPagina) => {
            if (
              numPagina === 1 ||
              numPagina === totalPaginas ||
              (numPagina >= paginaAtual - 1 && numPagina <= paginaAtual + 1)
            ) {
              return (
                <button
                  key={numPagina}
                  style={{
                    ...styles.botaoPaginacao,
                    ...(numPagina === paginaAtual && styles.botaoPaginacaoAtivo),
                  }}
                  onClick={() => irParaPagina(numPagina)}
                  onMouseEnter={(e) => {
                    if (numPagina !== paginaAtual) {
                      e.currentTarget.style.backgroundColor = "var(--surface-strong)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (numPagina !== paginaAtual) {
                      e.currentTarget.style.backgroundColor = "var(--surface)";
                    }
                  }}
                >
                  {numPagina}
                </button>
              );
            } else if (
              numPagina === paginaAtual - 2 ||
              numPagina === paginaAtual + 2
            ) {
              return <span key={numPagina} style={styles.infoPaginacao}>...</span>;
            }
            return null;
          })}

          <button
            style={{
              ...styles.botaoPaginacao,
              ...(paginaAtual === totalPaginas && styles.botaoPaginacaoDesabilitado),
            }}
            onClick={proximaPagina}
            disabled={paginaAtual === totalPaginas}
            onMouseEnter={(e) => {
              if (paginaAtual !== totalPaginas) {
                e.currentTarget.style.backgroundColor = "var(--surface-strong)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface)";
            }}
          >
            <FaChevronRight />
          </button>

          <span style={styles.infoPaginacao}>
            Página {paginaAtual} de {totalPaginas}
          </span>
        </div>
      )}
    </div>
  );
}

export default ListaProdutos;