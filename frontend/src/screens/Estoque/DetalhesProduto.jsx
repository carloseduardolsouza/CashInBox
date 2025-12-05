import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardConfirmacao from "../../components/ui/modal/CardConfirmacao";
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
import estoqueFetch from "../../services/api/estoqueFetch";

const styles = {
  container: {
    marginLeft: "44px",
    minHeight: "100vh",
    backgroundColor: "var(--background)",
    padding: "24px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
    color: "var(--text-inverse)",
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
  variationChips: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  chip: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid var(--surface-border)",
    backgroundColor: "var(--background)",
    cursor: "pointer",
    fontSize: "14px",
    color: "var(--text-secondary)",
    transition: "all 0.2s",
  },
  chipActive: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    borderColor: "var(--primary-color)",
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
    width: "100%",
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
    width: "100%",
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
  imagePreview: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "8px",
  },
  imagePreviewItem: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    overflow: "hidden",
    position: "relative",
    border: "2px solid var(--surface-border)",
  },
  imagePreviewImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
};

// Componente mock para simular o comportamento
const ProductDetailScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVariacaoModal, setShowVariacaoModal] = useState(false);
  const [editingVariacaoIndex, setEditingVariacaoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newProductImages, setNewProductImages] = useState([]);
  const [newVariationImages, setNewVariationImages] = useState([]);

  const [modalDeleteProduto, setModalDeleteProduto] = useState(false);

  const deletarProduto = async () => {
    const res = await estoqueFetch.deletar(productData.id_produto)
    navigate("/estoque/inventario")
  }

  const navigate = useNavigate();

  const [productData, setProductData] = useState({});

  const [variacaoForm, setVariacaoForm] = useState({
    nome: "",
    tipo: "",
    cod_interno: "",
    cod_barras: "",
    estoque: "",
    estoque_minimo: "",
  });

  const { id } = useParams();

  const buscarProdutoID = async () => {
    const produtoResponsse = await estoqueFetch.produtoID(id);
    setProductData(produtoResponsse);
  };

  useEffect(() => {
    buscarProdutoID();
  }, []);

  const hasVariations = productData.variacao && productData.variacao.length > 0;

  const getCurrentImages = () => {
    if (hasVariations && productData.variacao[selectedVariation]) {
      return productData.variacao[selectedVariation].images || [];
    }
    return productData.images || [];
  };

  const getCurrentEstoque = () => {
    if (hasVariations && productData.variacao[selectedVariation]) {
      return productData.variacao[selectedVariation].estoque;
    }
    return productData.estoque;
  };

  const getCurrentEstoqueMinimo = () => {
    if (hasVariations && productData.variacao[selectedVariation]) {
      return productData.variacao[selectedVariation].estoque_minimo;
    }
    return productData.estoque_minimo;
  };

  const getCurrentCodBarras = () => {
    if (hasVariations && productData.variacao[selectedVariation]) {
      return productData.variacao[selectedVariation].cod_barras;
    }
    return productData.cod_barras;
  };

  const getCurrentCodInterno = () => {
    if (hasVariations && productData.variacao[selectedVariation]) {
      return productData.variacao[selectedVariation].cod_interno;
    }
    return productData.cod_interno;
  };

  const handleImageUpload = (e, isVariation = false) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;

        if (isVariation) {
          setNewVariationImages((prev) => [
            ...prev,
            { image: base64, principal: prev.length === 0 },
          ]);
        } else {
          setNewProductImages((prev) => [
            ...prev,
            { image: base64, principal: prev.length === 0 },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index, isVariation = false) => {
    if (isVariation) {
      setNewVariationImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setNewProductImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const dataToSend = {
        nome: productData.nome,
        descricao: productData.descricao || "",
        cod_barras: hasVariations ? "" : productData.cod_barras || "",
        preco_custo: parseFloat(productData.preco_custo),
        preco_venda: parseFloat(productData.preco_venda),
        margem: parseFloat(productData.margem),
        id_categoria: productData.id_categoria,
        id_subcategoria: productData.id_subcategoria,
        variacao: [],
        images: [],
      };

      if (hasVariations) {
        dataToSend.variacao = productData.variacao.map((v) => ({
          nome: v.nome,
          tipo: v.tipo || "",
          cod_interno: v.cod_interno || "",
          cod_barras: v.cod_barras || "",
          estoque: parseInt(v.estoque) || 0,
          estoque_minimo: parseInt(v.estoque_minimo) || 0,
          images: v.images
            ? v.images.map((img) => ({
                image: img.caminho_arquivo || "",
                principal: img.principal || false,
              }))
            : [],
        }));
      } else {
        dataToSend.images = productData.images
          ? productData.images.map((img) => ({
              image: img.caminho_arquivo || "",
              principal: img.principal || false,
            }))
          : [];

        if (newProductImages.length > 0) {
          dataToSend.images = [...dataToSend.images, ...newProductImages];
        }
      }

      console.log(
        "Dados a serem enviados:",
        JSON.stringify(dataToSend, null, 2)
      );

      // Aqui você faria a chamada real para a API
      // const response = await estoqueFetch.updateProduto(productData.id_produto, dataToSend);

      alert("Produto atualizado com sucesso!");
      setIsEditing(false);
      setNewProductImages([]);
      setNewVariationImages([]);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewProductImages([]);
    setNewVariationImages([]);
    // Aqui você recarregaria os dados originais
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

  const openVariacaoModal = () => {
    setVariacaoForm({
      nome: "",
      tipo: "",
      cod_interno: "",
      cod_barras: "",
      estoque: "",
      estoque_minimo: "",
    });
    setNewVariationImages([]);
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
    });
    setNewVariationImages([]);
    setEditingVariacaoIndex(index);
    setShowVariacaoModal(true);
  };

  const handleSaveVariacao = () => {
    if (!variacaoForm.nome.trim()) {
      alert("Nome da variação é obrigatório");
      return;
    }

    if (editingVariacaoIndex !== null) {
      const newVariacoes = [...productData.variacao];
      newVariacoes[editingVariacaoIndex] = {
        ...newVariacoes[editingVariacaoIndex],
        ...variacaoForm,
      };
      setProductData((prev) => ({ ...prev, variacao: newVariacoes }));
    } else {
      setProductData((prev) => ({
        ...prev,
        variacao: [
          ...prev.variacao,
          {
            id_variacao: Date.now(),
            ...variacaoForm,
            images: newVariationImages.length > 0 ? newVariationImages : [],
          },
        ],
      }));
    }

    setShowVariacaoModal(false);
    setNewVariationImages([]);
  };

  const handleDeleteVariacao = (index) => {
    if (window.confirm("Deseja realmente excluir esta variação?")) {
      setProductData((prev) => ({
        ...prev,
        variacao: prev.variacao.filter((_, i) => i !== index),
      }));
      if (selectedVariation >= productData.variacao.length - 1) {
        setSelectedVariation(Math.max(0, productData.variacao.length - 2));
      }
    }
  };

  const currentImages = getCurrentImages();
  const currentImage = currentImages[selectedImageIndex]?.caminho_arquivo;

  return (
    <div style={styles.container}>
      {modalDeleteProduto && (
        <CardConfirmacao
          text={`Deseja confirma a exclusão de: ${productData.nome} ?`}
          subText={`esses dados não poderam ser recuperados posteriormente`}
          onClose={() => setModalDeleteProduto(false)}
          action={deletarProduto}
        />
      )}
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
              <button style={{ ...styles.iconButton, ...styles.deleteButton }} onClick={() => setModalDeleteProduto(true)}>
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
              <img
                src={`http://localhost:1122${currentImage}`}
                alt="Produto"
                style={styles.productImage}
              />
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
                  key={img.id_imagem || index}
                  style={{
                    ...styles.thumbnail,
                    ...(selectedImageIndex === index
                      ? styles.thumbnailActive
                      : {}),
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={`http://localhost:1122${img.caminho_arquivo}`}
                    alt={`Thumbnail ${index + 1}`}
                    style={styles.thumbnailImg}
                  />
                </div>
              ))}
            </div>
          )}

          {hasVariations && (
            <div style={styles.variationChips}>
              {productData.variacao.map((v, index) => (
                <div
                  key={v.id_variacao}
                  style={{
                    ...styles.chip,
                    ...(selectedVariation === index ? styles.chipActive : {}),
                  }}
                  onClick={() => {
                    setSelectedVariation(index);
                    setSelectedImageIndex(0);
                  }}
                >
                  {v.nome}
                </div>
              ))}
            </div>
          )}

          {isEditing && !hasVariations && (
            <>
              <input
                type="file"
                id="productImages"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e, false)}
              />
              <button
                style={styles.addImageButton}
                onClick={() => document.getElementById("productImages").click()}
              >
                <ImageIcon size={18} />
                Adicionar Imagens
              </button>

              {newProductImages.length > 0 && (
                <div style={styles.imagePreview}>
                  {newProductImages.map((img, index) => (
                    <div key={index} style={styles.imagePreviewItem}>
                      <img
                        src={img.image}
                        alt={`Nova ${index}`}
                        style={styles.imagePreviewImg}
                      />
                      <button
                        style={styles.removeImageBtn}
                        onClick={() => removeNewImage(index, false)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                    value={productData.nome}
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
                    value={productData.ativo}
                    onChange={(e) =>
                      setProductData((prev) => ({
                        ...prev,
                        ativo: parseInt(e.target.value),
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
                    value={getCurrentCodBarras() || ""}
                    onChange={(e) => {
                      if (hasVariations) {
                        const newVariacoes = [...productData.variacao];
                        newVariacoes[selectedVariation].cod_barras =
                          e.target.value;
                        setProductData((prev) => ({
                          ...prev,
                          variacao: newVariacoes,
                        }));
                      } else {
                        setProductData((prev) => ({
                          ...prev,
                          cod_barras: e.target.value,
                        }));
                      }
                    }}
                  />
                ) : (
                  <span style={styles.value}>
                    {getCurrentCodBarras() || "—"}
                  </span>
                )}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.label}>Código Interno</span>
                {isEditing ? (
                  <input
                    style={styles.input}
                    value={getCurrentCodInterno() || ""}
                    onChange={(e) => {
                      if (hasVariations) {
                        const newVariacoes = [...productData.variacao];
                        newVariacoes[selectedVariation].cod_interno =
                          e.target.value;
                        setProductData((prev) => ({
                          ...prev,
                          variacao: newVariacoes,
                        }));
                      } else {
                        setProductData((prev) => ({
                          ...prev,
                          cod_interno: e.target.value,
                        }));
                      }
                    }}
                  />
                ) : (
                  <span style={styles.value}>
                    {getCurrentCodInterno() || "—"}
                  </span>
                )}
              </div>

              <div style={styles.infoItem}>
                <span style={styles.label}>Categoria</span>
                <span style={styles.value}>
                  {productData.categoria_nome || "—"}
                </span>
              </div>

              <div style={styles.infoItem}>
                <span style={styles.label}>Subcategoria</span>
                <span style={styles.value}>
                  {productData.subcategoria_nome || "—"}
                </span>
              </div>

              <div style={{ ...styles.infoItem, gridColumn: "1 / -1" }}>
                <span style={styles.label}>Descrição</span>
                {isEditing ? (
                  <textarea
                    style={{ ...styles.input, ...styles.textarea }}
                    value={productData.descricao}
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
              {hasVariations &&
                ` - ${productData.variacao[selectedVariation]?.nome || ""}`}
            </h2>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Quantidade em Estoque</span>
                {isEditing ? (
                  <input
                    type="number"
                    style={styles.input}
                    value={getCurrentEstoque()}
                    onChange={(e) => {
                      if (hasVariations) {
                        const newVariacoes = [...productData.variacao];
                        newVariacoes[selectedVariation].estoque =
                          parseInt(e.target.value) || 0;
                        setProductData((prev) => ({
                          ...prev,
                          variacao: newVariacoes,
                        }));
                      } else {
                        setProductData((prev) => ({
                          ...prev,
                          estoque: parseInt(e.target.value) || 0,
                        }));
                      }
                    }}
                  />
                ) : (
                  <span style={styles.value}>
                    {getCurrentEstoque()} unidades
                  </span>
                )}
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Estoque Mínimo</span>
                {isEditing ? (
                  <input
                    type="number"
                    style={styles.input}
                    value={getCurrentEstoqueMinimo()}
                    onChange={(e) => {
                      if (hasVariations) {
                        const newVariacoes = [...productData.variacao];
                        newVariacoes[selectedVariation].estoque_minimo =
                          parseInt(e.target.value) || 0;
                        setProductData((prev) => ({
                          ...prev,
                          variacao: newVariacoes,
                        }));
                      } else {
                        setProductData((prev) => ({
                          ...prev,
                          estoque_minimo: parseInt(e.target.value) || 0,
                        }));
                      }
                    }}
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

              {productData.variacao.map((variacao, index) => (
                <div key={variacao.id_variacao} style={styles.variacaoCard}>
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
                        onClick={() => handleDeleteVariacao(index)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

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
              value={productData.preco_custo}
              onChange={(e) => calculatePrices("preco_custo", e.target.value)}
            />
          ) : (
            <div style={styles.metricValue}>R$ {productData.preco_custo}</div>
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
              value={productData.margem}
              onChange={(e) => calculatePrices("margem", e.target.value)}
            />
          ) : (
            <div style={styles.metricValue}>{productData.margem}%</div>
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
              value={productData.preco_venda}
              onChange={(e) => calculatePrices("preco_venda", e.target.value)}
            />
          ) : (
            <div style={styles.metricValue}>R$ {productData.preco_venda}</div>
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

              <div style={styles.infoItem}>
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

              <div style={{ ...styles.infoItem, ...styles.fullWidth }}>
                <label style={styles.label}>Imagens da Variação</label>
                <input
                  type="file"
                  id="variationImages"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e, true)}
                />
                <button
                  style={styles.addImageButton}
                  onClick={() =>
                    document.getElementById("variationImages").click()
                  }
                >
                  <ImageIcon size={18} />
                  Adicionar Imagens
                </button>

                {newVariationImages.length > 0 && (
                  <div style={styles.imagePreview}>
                    {newVariationImages.map((img, index) => (
                      <div key={index} style={styles.imagePreviewItem}>
                        <img
                          src={img.image}
                          alt={`Nova ${index}`}
                          style={styles.imagePreviewImg}
                        />
                        <button
                          style={styles.removeImageBtn}
                          onClick={() => removeNewImage(index, true)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

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
    </div>
  );
};

export default ProductDetailScreen;
