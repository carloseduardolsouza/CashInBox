import { useState, useEffect, useMemo, useCallback } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaBox,
  FaTag,
} from "react-icons/fa";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedProducts, setExpandedProducts] = useState({});

  // Otimização: useCallback para evitar recriação de funções
  const abrirLightbox = useCallback((imagens, indexInicial = 0) => {
    setLightboxImages(imagens);
    setCurrentImageIndex(indexInicial);
    setLightboxOpen(true);
  }, []);

  const fecharLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const toggleExpandProduct = useCallback((produtoId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [produtoId]: !prev[produtoId],
    }));
  }, []);

  // Otimização: Função simplificada e mais eficiente
  const getImagemPrincipal = useCallback(
    (imagens, possuiVariacao, variacoes = []) => {
      if (!possuiVariacao) {
        if (!imagens?.length) return null;
        const principal = imagens.find(
          (img) => img.principal === true || img.principal === "1"
        );
        return (
          principal?.caminho_arquivo || imagens[0]?.caminho_arquivo || null
        );
      }

      if (possuiVariacao && Array.isArray(variacoes)) {
        for (const variacao of variacoes) {
          if (!variacao?.imagem?.length) continue;
          const principal = variacao.imagem.find(
            (img) => img.principal === true || img.principal === "1"
          );
          if (principal) return principal.caminho_arquivo;
        }

        for (const variacao of variacoes) {
          if (variacao?.imagem?.[0]) return variacao.imagem[0].caminho_arquivo;
        }
      }

      return null;
    },
    []
  );

  const getAllImages = useCallback((imagens, possuiVariacao, variacoes = []) => {
    if (!possuiVariacao) {
      if (!imagens?.length) return [];
      return imagens.map(
        (img) => `http://localhost:3322/uploads/${img.caminho_arquivo}`
      );
    }

    if (possuiVariacao && Array.isArray(variacoes)) {
      for (const variacao of variacoes) {
        if (variacao?.imagem?.length) {
          return variacao.imagem.map(
            (img) => `http://localhost:3322/uploads/${img.caminho_arquivo}`
          );
        }
      }
    }

    return [];
  }, []);

  // Mock inicial
  useEffect(() => {
    const mockProdutos = [
      {
        id: "1",
        nome: "Camiseta Básica Premium",
        descricao: "Camiseta de algodão premium com tecnologia anti-odor",
        preco_venda: "59.90",
        estoque: "150",
        estoque_minimo: "20",
        imagem: [],
        variacao: [
          {
            id: "1",
            nome: "P Vermelho",
            tipo: "Tamanho P / Cor Vermelha",
            estoque: "50",
            cod_interno: "CAM-P-VM",
            estoque_minimo: "10",
            imagem: [
              {
                caminho_arquivo: "1764632648138-fog__o_-_2.avif",
                principal: false,
              },
            ],
          },
          {
            id: "2",
            nome: "G Preto",
            tipo: "Tamanho G / Cor Preta",
            estoque: "25",
            cod_interno: "CAM-G-PR",
            estoque_minimo: "8",
            imagem: [
              {
                caminho_arquivo: "1764356583070-airfryer-_1.jpg",
                principal: true,
              },
            ],
          },
        ],
      },
      {
        id: "2",
        nome: "Whey Protein Isolado",
        descricao: "Suplemento proteico de alta qualidade",
        cod_barras: "7891234567894",
        cod_interno: "WHEY001",
        preco_custo: "65.00",
        preco_venda: "99.90",
        margem: "53.69",
        estoque: "80",
        estoque_minimo: "15",
        imagem: [
          { caminho_arquivo: "1764356583070-airfryer-_1.jpg", principal: true },
        ],
        variacao: [],
      },
      {
        id: "3",
        nome: "Whey Protein Isolado",
        descricao: "Suplemento proteico de alta qualidade",
        cod_barras: "7891234567894",
        cod_interno: "WHEY001",
        preco_custo: "65.00",
        preco_venda: "99.90",
        margem: "53.69",
        estoque: "80",
        estoque_minimo: "15",
        imagem: [
          { caminho_arquivo: "1764356583070-airfryer-_1.jpg", principal: true },
        ],
        variacao: [],
      },
      {
        id: "2",
        nome: "Whey Protein Isolado",
        descricao: "Suplemento proteico de alta qualidade",
        cod_barras: "7891234567894",
        cod_interno: "WHEY001",
        preco_custo: "65.00",
        preco_venda: "99.90",
        margem: "53.69",
        estoque: "80",
        estoque_minimo: "15",
        imagem: [
          { caminho_arquivo: "1764356583070-airfryer-_1.jpg", principal: true },
        ],
        variacao: [],
      },
      {
        id: "1",
        nome: "Camiseta Básica Premium",
        descricao: "Camiseta de algodão premium com tecnologia anti-odor",
        preco_venda: "59.90",
        estoque: "150",
        estoque_minimo: "20",
        imagem: [],
        variacao: [
          {
            id: "1",
            nome: "P Vermelho",
            tipo: "Tamanho P / Cor Vermelha",
            estoque: "50",
            cod_interno: "CAM-P-VM",
            estoque_minimo: "10",
            imagem: [
              {
                caminho_arquivo: "1764632648138-fog__o_-_2.avif",
                principal: false,
              },
            ],
          },
          {
            id: "2",
            nome: "G Preto",
            tipo: "Tamanho G / Cor Preta",
            estoque: "25",
            cod_interno: "CAM-G-PR",
            estoque_minimo: "8",
            imagem: [
              {
                caminho_arquivo: "1764356583070-airfryer-_1.jpg",
                principal: true,
              },
            ],
          },
        ],
      },
    ];

    setProdutos(mockProdutos);
  }, []);

  // Otimização: useMemo para filtrar produtos apenas quando necessário
  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) =>
      p.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);

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

      {/* Lightbox com React Awesome Lightbox */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <Lightbox
          images={lightboxImages}
          startIndex={currentImageIndex}
          onClose={fecharLightbox}
        />
      )}

      {/* Grid de produtos */}
      <div style={styles.grid}>
        {produtosFiltrados.map((prod) => {
          const temVariacoes = prod.variacao?.length > 0;
          const imagemPrincipal = getImagemPrincipal(
            prod.imagem,
            temVariacoes,
            prod.variacao
          );
          const todasImagens = getAllImages(
            prod.imagem,
            temVariacoes,
            prod.variacao
          );
          const isExpanded = expandedProducts[prod.id];

          const estoqueTotal = temVariacoes
            ? prod.variacao.reduce(
                (acc, v) => acc + parseInt(v.estoque || 0),
                0
              )
            : parseInt(prod.estoque || 0);

          return (
            <div
              key={prod.id}
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
                {/* Imagem principal */}
                {imagemPrincipal ? (
                  <div
                    onClick={() => abrirLightbox(todasImagens, 0)}
                    style={{
                      ...styles.imageBox,
                      backgroundImage: `url(http://localhost:3322/uploads/${imagemPrincipal})`,
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
                      {prod.cod_interno || prod.id}
                    </span>
                  </div>

                  <div style={styles.price}>
                    R$ {parseFloat(prod.preco_venda).toFixed(2)}
                  </div>

                  <div style={styles.infoRow}>
                    <FaBox style={{ color: "var(--text-secondary)" }} />
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

              {/* Variações */}
              {temVariacoes && (
                <div style={styles.variacoesContainer}>
                  <div
                    style={styles.variacoesHeader}
                    onClick={() => toggleExpandProduct(prod.id)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--neutral-600)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--surface-strong)")
                    }
                  >
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    <span>Variações Disponíveis ({prod.variacao.length})</span>
                  </div>

                  {isExpanded &&
                    prod.variacao.map((variacao) => {
                      const variacaoImagemPrincipal = getImagemPrincipal(
                        variacao.imagem
                      );
                      const variacaoImagens = getAllImages(variacao.imagem);

                      return (
                        <div
                          key={variacao.id}
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
                              onClick={() => abrirLightbox(variacaoImagens, 0)}
                              style={{
                                ...styles.variacaoImage,
                                backgroundImage: `url(http://localhost:3322/uploads/${variacaoImagemPrincipal})`,
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
                              <FaBox
                                style={{ color: "var(--text-secondary)" }}
                              />
                              <span style={styles.label}>Estoque:</span>
                              <span style={styles.value}>
                                {variacao.estoque} un.
                              </span>
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "var(--text-secondary)",
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
    </div>
  );
}

export default ListaProdutos;