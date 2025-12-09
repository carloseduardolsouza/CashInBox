import React, { useState, useEffect, useRef, useContext } from "react";
import Select from "react-select";
import estoqueFetch from "../../services/api/estoqueFetch";
import CardConfirmacao from "../../components/ui/modal/CardConfirmacao";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  Tag,
  DollarSign,
  TrendingUp,
  Archive,
  Save,
  X,
  Plus,
  Image as ImageIcon,
  Camera,
} from "lucide-react";

const API_URL = "http://localhost:1122";

const styles = {
  container: {
    marginLeft: "44px",
    minHeight: "100vh",
    backgroundColor: "var(--background)",
    padding: "24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  backButton: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    gap: "8px",
  },
  iconButton: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)",
  },
  saveButton: {
    backgroundColor: "var(--primary-color)",
    color: "white",
    border: "none",
  },
  deleteButton: {
    color: "var(--error-500)",
    borderColor: "var(--error-500)",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gap: "24px",
    marginBottom: "24px",
  },
  imageSection: {
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "12px",
    padding: "24px",
    height: "fit-content",
    position: "sticky",
    top: "24px",
  },
  mainImage: {
    width: "100%",
    height: "350px",
    backgroundColor: "var(--background-soft)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    overflow: "hidden",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  noImage: {
    textAlign: "center",
    color: "var(--text-muted)",
  },
  noImageIcon: {
    fontSize: "48px",
    marginBottom: "8px",
    opacity: 0.3,
  },
  addImageButton: {
    width: "100%",
    padding: "12px",
    background: "var(--surface)",
    border: "2px dashed var(--surface-border)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "var(--primary-color)",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "12px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "12px",
    padding: "24px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "12px",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  value: {
    fontSize: "16px",
    color: "var(--text-primary)",
    fontWeight: "500",
  },
  input: {
    width: "90%",
    padding: "10px 12px",
    border: "2px solid var(--surface-border)",
    borderRadius: "8px",
    fontSize: "15px",
    color: "var(--text-primary)",
    backgroundColor: "var(--background)",
    fontFamily: "inherit",
  },
  textarea: {
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  metricCard: {
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "12px",
    padding: "20px",
  },
  metricLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  metricValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--text-primary)",
  },
  metricInput: {
    fontSize: "24px",
    fontWeight: "600",
    padding: "8px",
    width: "90%",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
  },
  badgeSuccess: {
    backgroundColor: "var(--success-100)",
    color: "var(--success-700)",
  },
  badgeError: {
    backgroundColor: "var(--error-100)",
    color: "var(--error-700)",
  },
  variacaoCard: {
    background: "var(--surface)",
    border: "2px solid var(--surface-border)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  variacaoInfo: {
    flex: 1,
  },
  variacaoNome: {
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "4px",
  },
  variacaoDetalhes: {
    fontSize: "13px",
    color: "var(--text-secondary)",
    marginBottom: "2px",
  },
  variacaoActions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    background: "var(--primary-color)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  deleteVariacaoButton: {
    background: "var(--error-500)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  addVariacaoButton: {
    width: "100%",
    padding: "12px",
    background: "var(--surface)",
    border: "2px dashed var(--surface-border)",
    borderRadius: "8px",
    cursor: "pointer",
    color: "var(--primary-color)",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  thumbnailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
    marginTop: "8px",
  },
  thumbnail: {
    width: "100%",
    paddingTop: "100%",
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    border: "2px solid var(--surface-border)",
  },
  thumbnailActive: {
    borderColor: "var(--primary-color)",
  },
  thumbnailImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "var(--background)",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "2px solid var(--surface-border)",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: 0,
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "24px",
    color: "var(--text-muted)",
    cursor: "pointer",
    padding: "4px",
  },
  modalFormGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "24px",
    paddingTop: "24px",
    borderTop: "2px solid var(--surface-border)",
  },
  cancelButton: {
    padding: "10px 24px",
    background: "var(--surface)",
    color: "var(--text-primary)",
    border: "2px solid var(--surface-border)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  modalSaveButton: {
    padding: "10px 24px",
    background: "var(--primary-color)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  removeImageBtn: {
    position: "absolute",
    top: "4px",
    right: "4px",
    background: "var(--error-500)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
  removeMainImageBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "var(--error-500)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    zIndex: 10,
    transition: "all 0.2s",
  },
  imagePreviewModal: {
    marginTop: "16px",
    padding: "16px",
    background: "var(--background-soft)",
    borderRadius: "8px",
    border: "2px solid var(--surface-border)",
  },
  imagePreviewTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "12px",
  },
  imagePreviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
  },
  imagePreviewItem: {
    position: "relative",
    paddingTop: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    border: "2px solid var(--surface-border)",
    transition: "all 0.2s",
  },
  imagePreviewItemSelected: {
    borderColor: "var(--primary-color)",
    boxShadow: "0 0 0 2px var(--primary-color)",
  },
  imagePreviewImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  selectedBadge: {
    position: "absolute",
    top: "4px",
    right: "4px",
    background: "var(--primary-color)",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
  },
};

const ProductDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const { adicionarAviso } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVariacaoModal, setShowVariacaoModal] = useState(false);
  const [editingVariacaoIndex, setEditingVariacaoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [modalDeleteProduto, setModalDeleteProduto] = useState(false);

  const [productData, setProductData] = useState({});
  const [originalData, setOriginalData] = useState({});

  const [variacaoForm, setVariacaoForm] = useState({
    nome: "",
    tipo: "",
    cod_interno: "",
    cod_barras: "",
    estoque: "",
    estoque_minimo: "",
    images: null, // Agora armazena o ID da imagem
  });

  useEffect(() => {
    buscarProdutoID();
  }, [id]);

  const buscarProdutoID = async () => {
    try {
      const res = await estoqueFetch.produtoID(id);

      if (!res) {
        console.error("Resposta vazia ao buscar produto");
        return;
      }

      const variacoes = Array.isArray(res.variacao) ? res.variacao : [];

      const resFormated = {
        ...res,
        variacao: variacoes.map((dados) => {
          return {
            cod_barras: dados.cod_barras ?? "",
            cod_interno: dados.cod_interno ?? "",
            estoque: Number(dados.estoque ?? 0),
            estoque_minimo: Number(dados.estoque_minimo ?? 0),
            id_variacao: dados.id_variacao ?? null,
            nome: dados.nome ?? "",
            tipo: dados.tipo ?? "",
            images: dados.images[0]?.id_imagem || null,
          };
        }),
      };

      setProductData(resFormated);
      setOriginalData(JSON.parse(JSON.stringify(resFormated)));
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const deletarProduto = async () => {
    try {
      await estoqueFetch.deletar(productData.id_produto);
      adicionarAviso("sucesso", "Produto deletado com sucesso");
      navigate("/estoque/inventario");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      adicionarAviso("erro", "Erro ao deletar produto");
    }
  };

  const deletarVariacao = async (id_variacao) => {
    const res = await estoqueFetch.deletarVariacao(id_variacao);
    buscarProdutoID();
  };

  // 🆕 Função para adicionar imagens ao produto
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploadingImages(true);

      // Envia as imagens para a API
      const imagensSalvas = await estoqueFetch.adicionarImagens(
        productData.id_produto,
        files
      );

      // Atualiza o estado com as novas imagens
      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...imagensSalvas],
      }));

      adicionarAviso(
        "sucesso",
        `${imagensSalvas.length} imagem(ns) adicionada(s)`
      );
    } catch (error) {
      console.error("Erro ao adicionar imagens:", error);
      adicionarAviso("erro", "Erro ao adicionar imagens");
    } finally {
      setUploadingImages(false);
    }
  };

  // Função para remover imagem
  const removeExistingImage = async (imageId) => {
    if (window.confirm("Deseja realmente excluir esta imagem?")) {
      try {
        await estoqueFetch.deletarImagem(imageId);

        // Remove do estado
        setProductData((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img.id_imagem !== imageId),
        }));

        // Ajusta o índice selecionado se necessário
        if (selectedImageIndex >= productData.images.length - 1) {
          setSelectedImageIndex(Math.max(0, productData.images.length - 2));
        }

        adicionarAviso("sucesso", "Imagem removida com sucesso");
      } catch (error) {
        console.error("Erro ao remover imagem:", error);
        adicionarAviso("erro", "Erro ao remover imagem");
      }
    }
  };

  const calculatePrices = (field, value) => {
    const numValue = parseFloat(value) || 0;

    if (field === "preco_custo") {
      const newPrecoVenda = numValue + (numValue * productData.margem) / 100;
      setProductData((prev) => ({
        ...prev,
        preco_custo: numValue,
        preco_venda: parseFloat(newPrecoVenda.toFixed(2)),
      }));
    } else if (field === "margem") {
      const newPrecoVenda =
        productData.preco_custo + (productData.preco_custo * numValue) / 100;
      setProductData((prev) => ({
        ...prev,
        margem: numValue,
        preco_venda: parseFloat(newPrecoVenda.toFixed(2)),
      }));
    } else if (field === "preco_venda") {
      const newMargem =
        productData.preco_custo > 0
          ? ((numValue - productData.preco_custo) / productData.preco_custo) *
            100
          : 0;
      setProductData((prev) => ({
        ...prev,
        preco_venda: numValue,
        margem: parseFloat(newMargem.toFixed(2)),
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Prepara os dados do produto
      const dadosProduto = {
        nome: productData.nome,
        descricao: productData.descricao || "",
        cod_barras: productData.cod_barras || "",
        preco_custo: parseFloat(productData.preco_custo) || 0,
        preco_venda: parseFloat(productData.preco_venda) || 0,
        margem: parseFloat(productData.margem) || 0,
        id_categoria: productData.id_categoria || null,
        id_subcategoria: productData.id_subcategoria || null,
        estoque: parseFloat(productData.estoque) || 0,
        estoque_minimo: parseFloat(productData.estoque_minimo) || 0,
        ativo: productData.ativo ? true : false,
        variacao:
          productData.variacao.map((v) => ({
            id_variacao: v.id_variacao || null,
            nome: v.nome || "",
            tipo: v.tipo || "",
            cod_interno: v.cod_interno || "",
            cod_barras: v.cod_barras || "",
            estoque: parseFloat(v.estoque) || 0,
            estoque_minimo: parseFloat(v.estoque_minimo) || 0,
            images: v.images || null, // ID da imagem associada
          })) || [],
      };

      console.log("📤 Enviando atualização:", dadosProduto);

      await estoqueFetch.editar(productData.id_produto, dadosProduto);

      adicionarAviso("sucesso", "Produto atualizado com sucesso");
      setIsEditing(false);
      await buscarProdutoID();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      adicionarAviso("erro", "Falha ao atualizar produto");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProductData(JSON.parse(JSON.stringify(originalData)));
    setSelectedImageIndex(0);
    setIsEditing(false);
  };

  const openVariacaoModal = () => {
    setVariacaoForm({
      nome: "",
      tipo: "",
      cod_interno: "",
      cod_barras: "",
      estoque: "",
      estoque_minimo: "",
      images: null,
    });
    setEditingVariacaoIndex(null);
    setShowVariacaoModal(true);
  };

  const handleEditVariacao = (index) => {
    const variacao = productData.variacao[index];

    setVariacaoForm({
      nome: variacao.nome,
      tipo: variacao.tipo,
      cod_interno: variacao.cod_interno,
      cod_barras: variacao.cod_barras,
      estoque: variacao.estoque,
      estoque_minimo: variacao.estoque_minimo,
      images: variacao.images,
    });
    setEditingVariacaoIndex(index);
    setShowVariacaoModal(true);
  };

  const handleSaveVariacao = () => {
    if (!variacaoForm.nome.trim()) {
      adicionarAviso("aviso", "Nome da variação é obrigatório");
      return;
    }

    setProductData((prev) => {
      const novasVariacoes = [...prev.variacao];

      if (editingVariacaoIndex !== null) {
        // Editar variação existente
        novasVariacoes[editingVariacaoIndex] = {
          ...novasVariacoes[editingVariacaoIndex],
          nome: variacaoForm.nome,
          tipo: variacaoForm.tipo,
          cod_interno: variacaoForm.cod_interno,
          cod_barras: variacaoForm.cod_barras,
          estoque: parseFloat(variacaoForm.estoque) || 0,
          estoque_minimo: parseFloat(variacaoForm.estoque_minimo) || 0,
          images: variacaoForm.images || null,
        };
      } else {
        // Adicionar nova variação
        novasVariacoes.push({
          nome: variacaoForm.nome,
          tipo: variacaoForm.tipo,
          cod_interno: variacaoForm.cod_interno,
          cod_barras: variacaoForm.cod_barras,
          estoque: parseFloat(variacaoForm.estoque) || 0,
          estoque_minimo: parseFloat(variacaoForm.estoque_minimo) || 0,
          images: variacaoForm.images || null,
        });
      }

      return {
        ...prev,
        variacao: novasVariacoes,
      };
    });

    setShowVariacaoModal(false);
  };

  const hasVariations = productData.variacao && productData.variacao.length > 0;
  const currentImages = productData.images || [];
  const currentImage = currentImages[selectedImageIndex];

  const getCurrentEstoque = () => {
    if (hasVariations) {
      return productData.variacao.reduce(
        (sum, v) => sum + (parseFloat(v.estoque) || 0),
        0
      );
    }
    return productData.estoque || 0;
  };

  const getCurrentEstoqueMinimo = () => {
    if (hasVariations) {
      return productData.variacao.reduce(
        (sum, v) => sum + (parseFloat(v.estoque_minimo) || 0),
        0
      );
    }
    return productData.estoque_minimo || 0;
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--surface-strong)",
      borderColor: "var(--surface-border)",
      padding: "6px",
      borderRadius: "12px",
      boxShadow: "none",
      ":hover": {
        borderColor: "var(--surface-border)",
      },
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "var(--text-primary)",
      fontWeight: 600,
    }),
    menu: (base) => ({
      ...base,
      background: "var(--surface-strong)",
      borderRadius: "10px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "var(--surface-strong)"
        : "transparent",
      color: "var(--text-primary)",
      cursor: "pointer",
    }),
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button
            style={styles.backButton}
            onClick={() => navigate("/estoque/inventario")}
          >
            <ArrowLeft size={20} color="var(--text-primary)" />
          </button>
          <h1 style={styles.title}>Detalhes do Produto</h1>
        </div>
        <div style={styles.headerRight}>
          {!isEditing ? (
            <>
              <button
                style={styles.iconButton}
                onClick={() => setIsEditing(true)}
              >
                <Edit size={18} />
                <span>Editar</span>
              </button>
              <button
                style={{ ...styles.iconButton, ...styles.deleteButton }}
                onClick={() => setModalDeleteProduto(true)}
              >
                <Trash2 size={18} />
                <span>Excluir</span>
              </button>
            </>
          ) : (
            <>
              <button
                style={{ ...styles.iconButton, ...styles.saveButton }}
                onClick={handleSave}
                disabled={loading}
              >
                <Save size={18} />
                <span>{loading ? "Salvando..." : "Salvar"}</span>
              </button>
              <button style={styles.iconButton} onClick={handleCancel}>
                <X size={18} />
                <span>Cancelar</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.imageSection}>
          <div style={styles.mainImage}>
            {currentImage ? (
              <>
                <img
                  src={
                    currentImage.isNew
                      ? currentImage.caminho_arquivo
                      : `${API_URL}${currentImage.caminho_arquivo}`
                  }
                  alt="Produto"
                  style={styles.productImage}
                />
                {isEditing && (
                  <button
                    style={styles.removeMainImageBtn}
                    onClick={() => {
                      if (currentImage.isNew) {
                        const newIndex = newImages.findIndex(
                          (img) => img === currentImage.caminho_arquivo
                        );
                        if (newIndex !== -1) {
                          removeNewImage(newIndex);
                          setSelectedImageIndex(
                            Math.max(0, selectedImageIndex - 1)
                          );
                        }
                      } else {
                        removeExistingImage(currentImage.id_imagem);
                        setSelectedImageIndex(
                          Math.max(0, selectedImageIndex - 1)
                        );
                      }
                    }}
                    title="Remover imagem"
                  >
                    <X size={18} />
                  </button>
                )}
              </>
            ) : (
              <div style={styles.noImage}>
                <div style={styles.noImageIcon}>
                  <Camera size={48} />
                </div>
                <p>Sem imagem</p>
              </div>
            )}
          </div>

          {currentImages.length > 1 && (
            <div style={styles.thumbnailGrid}>
              {currentImages.map((img, index) => (
                <div
                  key={img.id_imagem || img.tempId || index}
                  style={{
                    ...styles.thumbnail,
                    ...(selectedImageIndex === index
                      ? styles.thumbnailActive
                      : {}),
                    position: "relative",
                  }}
                >
                  <div
                    onClick={() => setSelectedImageIndex(index)}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      src={
                        img.isNew
                          ? img.caminho_arquivo
                          : `${API_URL}${img.caminho_arquivo}`
                      }
                      alt={`Thumbnail ${index + 1}`}
                      style={styles.thumbnailImg}
                    />
                  </div>
                  {isEditing && (
                    <button
                      style={styles.removeImageBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (img.isNew) {
                          const newIndex = newImages.findIndex(
                            (newImg) => newImg === img.caminho_arquivo
                          );
                          if (newIndex !== -1) {
                            removeNewImage(newIndex);
                            if (
                              selectedImageIndex >=
                              currentImages.length - 1
                            ) {
                              setSelectedImageIndex(
                                Math.max(0, currentImages.length - 2)
                              );
                            }
                          }
                        } else {
                          removeExistingImage(img.id_imagem);
                          if (selectedImageIndex >= currentImages.length - 1) {
                            setSelectedImageIndex(
                              Math.max(0, currentImages.length - 2)
                            );
                          }
                        }
                      }}
                      title="Remover"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <button
                style={styles.addImageButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon size={18} />
                Adicionar Imagens
              </button>
            </>
          )}
        </div>

        <div style={styles.infoSection}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Package size={18} />
              Informações Gerais
            </h2>
            <div style={styles.infoGrid}>
              <div style={{ ...styles.infoItem, gridColumn: "1 / -1" }}>
                <span style={styles.label}>Nome do Produto</span>
                {isEditing ? (
                  <input
                    style={styles.input}
                    value={productData.nome || ""}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        nome: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span style={styles.value}>{productData.nome}</span>
                )}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.label}>Status</span>
                {isEditing ? (
                  <select
                    style={styles.input}
                    value={productData.ativo ? 1 : 0}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        ativo: parseInt(e.target.value) === 1,
                      }))
                    }
                  >
                    <option value={1}>Ativo</option>
                    <option value={0}>Inativo</option>
                  </select>
                ) : (
                  <span
                    style={{
                      ...styles.badge,
                      ...(productData.ativo
                        ? styles.badgeSuccess
                        : styles.badgeError),
                    }}
                  >
                    {productData.ativo ? "Ativo" : "Inativo"}
                  </span>
                )}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.label}>Código de Barras</span>
                {isEditing ? (
                  <input
                    style={styles.input}
                    value={productData.cod_barras || ""}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        cod_barras: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span style={styles.value}>
                    {productData.cod_barras || "—"}
                  </span>
                )}
              </div>

              {isEditing ? (
                <div style={styles.infoItem}>
                  <span style={styles.label}>Categoria</span>
                  <Select styles={customStyles} />
                </div>
              ) : (
                <div style={styles.infoItem}>
                  <span style={styles.label}>Categoria</span>
                  <span style={styles.value}>
                    {productData.categoria_nome || "—"}
                  </span>
                </div>
              )}

              {isEditing ? (
                <div style={styles.infoItem}>
                  <span style={styles.label}>Subcategoria</span>
                  <Select styles={customStyles} />
                </div>
              ) : (
                <div style={styles.infoItem}>
                  <span style={styles.label}>Subcategoria</span>
                  <span style={styles.value}>
                    {productData.subcategoria_nome || "—"}
                  </span>
                </div>
              )}

              <div style={{ ...styles.infoItem, gridColumn: "1 / -1" }}>
                <span style={styles.label}>Descrição</span>
                {isEditing ? (
                  <textarea
                    style={{ ...styles.input, ...styles.textarea }}
                    value={productData.descricao || ""}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        descricao: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span style={styles.value}>
                    {productData.descricao || "—"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <Archive size={18} />
              Estoque
            </h2>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Quantidade em Estoque</span>
                {isEditing && !hasVariations ? (
                  <input
                    type="number"
                    style={styles.input}
                    value={productData.estoque || 0}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        estoque: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                ) : (
                  <span style={styles.value}>
                    {getCurrentEstoque()} unidades
                  </span>
                )}
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Estoque Mínimo</span>
                {isEditing && !hasVariations ? (
                  <input
                    type="number"
                    style={styles.input}
                    value={productData.estoque_minimo || 0}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        estoque_minimo: parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                ) : (
                  <span style={styles.value}>
                    {getCurrentEstoqueMinimo()} unidades
                  </span>
                )}
              </div>
            </div>
          </div>

          {hasVariations && (
            <div style={styles.card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h2 style={{ ...styles.cardTitle, marginBottom: 0 }}>
                  <Tag size={18} />
                  Variações do Produto
                </h2>
              </div>

              {productData.variacao.map((variacao, index) => {
                const variacaoImage = currentImages.find(
                  (img) => img.id_imagem === variacao.images
                );
                return (
                  <div key={variacao.id_variacao} style={styles.variacaoCard}>
                    {variacaoImage && (
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          marginRight: "12px",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={
                            variacaoImage.isNew
                              ? variacaoImage.caminho_arquivo
                              : `${API_URL}${variacaoImage.caminho_arquivo}`
                          }
                          alt={variacao.nome}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    <div style={styles.variacaoInfo}>
                      <div style={styles.variacaoNome}>{variacao.nome}</div>
                      <div style={styles.variacaoDetalhes}>
                        {variacao.tipo && `Tipo: ${variacao.tipo}`}
                        {variacao.cod_interno &&
                          ` • Cód. Interno: ${variacao.cod_interno}`}
                      </div>
                      <div style={styles.variacaoDetalhes}>
                        Estoque: {variacao.estoque} • Mín:{" "}
                        {variacao.estoque_minimo}
                      </div>
                    </div>
                    {isEditing && (
                      <div style={styles.variacaoActions}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEditVariacao(index)}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          style={styles.deleteVariacaoButton}
                          onClick={() => deletarVariacao(variacao.id_variacao)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {isEditing && (
            <button
              style={styles.addVariacaoButton}
              onClick={openVariacaoModal}
            >
              <Plus size={18} />
              Adicionar Variação
            </button>
          )}
        </div>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>
            <DollarSign size={14} />
            Preço de Custo
          </div>
          {isEditing ? (
            <input
              type="number"
              step="0.01"
              style={{ ...styles.input, ...styles.metricInput }}
              value={productData.preco_custo || 0}
              onChange={(e) => calculatePrices("preco_custo", e.target.value)}
            />
          ) : (
            <div style={styles.metricValue}>
              R$ {parseFloat(productData.preco_custo || 0).toFixed(2)}
            </div>
          )}
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>
            <TrendingUp size={14} />
            Margem
          </div>
          {isEditing ? (
            <input
              type="number"
              step="0.01"
              style={{ ...styles.input, ...styles.metricInput }}
              value={productData.margem || 0}
              onChange={(e) => calculatePrices("margem", e.target.value)}
            />
          ) : (
            <div style={styles.metricValue}>
              {parseFloat(productData.margem || 0).toFixed(2)}%
            </div>
          )}
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricLabel}>
            <Tag size={14} />
            Preço de Venda
          </div>
          {isEditing ? (
            <input
              type="number"
              step="0.01"
              style={{ ...styles.input, ...styles.metricInput }}
              value={productData.preco_venda || 0}
              onChange={(e) => calculatePrices("preco_venda", e.target.value)}
            />
          ) : (
            <div style={styles.metricValue}>
              R$ {parseFloat(productData.preco_venda || 0).toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {showVariacaoModal && (
        <div
          style={styles.modalOverlay}
          onClick={() => setShowVariacaoModal(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingVariacaoIndex !== null
                  ? "Editar Variação"
                  : "Nova Variação"}
              </h3>
              <button
                style={styles.closeButton}
                onClick={() => setShowVariacaoModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalFormGrid}>
              <div style={{ ...styles.infoItem, ...styles.fullWidth }}>
                <label style={styles.label}>Nome da Variação *</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Chocolate, Baunilha..."
                  value={variacaoForm.nome}
                  onChange={(e) =>
                    setVariacaoForm((prev) => ({
                      ...prev,
                      nome: e.target.value,
                    }))
                  }
                />
              </div>

              <div style={styles.infoItem}>
                <label style={styles.label}>Tipo</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Sabor, Cor..."
                  value={variacaoForm.tipo}
                  onChange={(e) =>
                    setVariacaoForm((prev) => ({
                      ...prev,
                      tipo: e.target.value,
                    }))
                  }
                />
              </div>

              <div style={styles.infoItem}>
                <label style={styles.label}>Código Interno</label>
                <input
                  style={styles.input}
                  value={variacaoForm.cod_interno}
                  onChange={(e) =>
                    setVariacaoForm((prev) => ({
                      ...prev,
                      cod_interno: e.target.value,
                    }))
                  }
                />
              </div>

              <div style={{ ...styles.infoItem, ...styles.fullWidth }}>
                <label style={styles.label}>Código de Barras</label>
                <input
                  style={styles.input}
                  value={variacaoForm.cod_barras}
                  onChange={(e) =>
                    setVariacaoForm((prev) => ({
                      ...prev,
                      cod_barras: e.target.value,
                    }))
                  }
                />
              </div>

              <div style={styles.infoItem}>
                <label style={styles.label}>Estoque</label>
                <input
                  type="number"
                  style={styles.input}
                  value={variacaoForm.estoque}
                  onChange={(e) =>
                    setVariacaoForm((prev) => ({
                      ...prev,
                      estoque: e.target.value,
                    }))
                  }
                />
              </div>

              <div style={styles.infoItem}>
                <label style={styles.label}>Estoque Mínimo</label>
                <input
                  type="number"
                  style={styles.input}
                  value={variacaoForm.estoque_minimo}
                  onChange={(e) =>
                    setVariacaoForm((prev) => ({
                      ...prev,
                      estoque_minimo: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {currentImages.length > 0 && (
              <div style={styles.imagePreviewModal}>
                <div style={styles.imagePreviewTitle}>
                  Selecionar Imagem para Variação
                </div>
                <div style={styles.imagePreviewGrid}>
                  <div
                    style={{
                      ...styles.imagePreviewItem,
                      ...(variacaoForm.images === null
                        ? styles.imagePreviewItemSelected
                        : {}),
                    }}
                    onClick={() =>
                      setVariacaoForm((prev) => ({
                        ...prev,
                        images: null,
                      }))
                    }
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--background-soft)",
                        color: "var(--text-muted)",
                        fontSize: "12px",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Sem imagem
                    </div>
                    {variacaoForm.images === null && (
                      <div style={styles.selectedBadge}>✓</div>
                    )}
                  </div>

                  {currentImages.map((img, index) => (
                    <div
                      key={img.id_imagem || index}
                      style={{
                        ...styles.imagePreviewItem,
                        ...(variacaoForm.images === img.id_imagem
                          ? styles.imagePreviewItemSelected
                          : {}),
                      }}
                      onClick={() =>
                        setVariacaoForm((prev) => ({
                          ...prev,
                          images: img.id_imagem,
                        }))
                      }
                    >
                      {console.log(variacaoForm)}
                      <img
                        src={
                          img.isNew
                            ? img.caminho_arquivo
                            : `${API_URL}${img.caminho_arquivo}`
                        }
                        alt={`Opção ${index + 1}`}
                        style={styles.imagePreviewImg}
                      />
                      {variacaoForm.images === img.id_imagem && (
                        <div style={styles.selectedBadge}>✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setShowVariacaoModal(false)}
              >
                Cancelar
              </button>
              <button
                style={styles.modalSaveButton}
                onClick={handleSaveVariacao}
              >
                Salvar Variação
              </button>
            </div>
          </div>
        </div>
      )}

      {modalDeleteProduto && (
        <CardConfirmacao
          text={`Deseja confirmar a exclusão de: ${productData.nome}`}
          subText={`Esses dados não poderão ser recuperados posteriormente.`}
          onClose={() => setModalDeleteProduto(false)}
          action={deletarProduto}
        />
      )}
    </div>
  );
};

export default ProductDetailScreen;
