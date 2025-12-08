import React, { useState, useEffect, useRef } from "react";
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
};

const ProductDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showVariacaoModal, setShowVariacaoModal] = useState(false);
  const [editingVariacaoIndex, setEditingVariacaoIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalDeleteProduto, setModalDeleteProduto] = useState(false);

  const [productData, setProductData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const [variacaoForm, setVariacaoForm] = useState({
    nome: "",
    tipo: "",
    cod_interno: "",
    cod_barras: "",
    estoque: "",
    estoque_minimo: "",
  });

  useEffect(() => {
    buscarProdutoID();
  }, [id]);

  const buscarProdutoID = async () => {
    try {
      const res = await fetch(`${API_URL}/produto/lista`);
      const data = await res.json();
      const produto = data.data.find(
        (p) => Number(p.id_produto) === Number(id)
      );

      if (produto) {
        setProductData(produto);
        setOriginalData(JSON.parse(JSON.stringify(produto)));
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  const deletarProduto = async () => {
    try {
      await fetch(`${API_URL}/produto/deletar/${productData.id_produto}`, {
        method: "DELETE",
      });
      navigate("/estoque/inventario");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImageURLs = files.map((file) => URL.createObjectURL(file));
    setNewImages([...newImages, ...newImageURLs]);
    setNewImageFiles([...newImageFiles, ...files]);
  };

  const removeNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImageFiles(newImageFiles.filter((_, i) => i !== index));
  };

  const removeExistingImage = (imageId) => {
    // Adiciona o ID da imagem à lista de imagens a serem deletadas
    setDeletedImages([...deletedImages, imageId]);

    // Remove a imagem visualmente do productData
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id_imagem !== imageId),
    }));
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

      const formData = new FormData();

      // Dados básicos do produto
      formData.append("nome", productData.nome);
      formData.append("descricao", productData.descricao || "");
      formData.append("cod_barras", productData.cod_barras || "");
      formData.append("preco_custo", parseFloat(productData.preco_custo) || 0);
      formData.append("preco_venda", parseFloat(productData.preco_venda) || 0);
      formData.append("margem", parseFloat(productData.margem) || 0);
      formData.append("id_categoria", productData.id_categoria || "");
      formData.append("id_subcategoria", productData.id_subcategoria || "");
      formData.append("estoque", productData.estoque || 0);
      formData.append("estoque_minimo", productData.estoque_minimo || 0);
      formData.append("ativo", productData.ativo ? true : false);

      // IDs das imagens existentes que devem ser mantidas
      const imagensExistentes = (productData.images || [])
        .filter((img) => img.id_imagem) // Apenas imagens que já existem no banco
        .map((img) => img.id_imagem);

      formData.append("imagensExistentes", JSON.stringify(imagensExistentes));

      // IDs das imagens a serem deletadas
      formData.append("imagensDeletar", JSON.stringify(deletedImages));

      // Novas imagens
      newImageFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Variações
      const variacoesFormatadas = (productData.variacao || []).map((v) => ({
        nome: v.nome || "",
        tipo: v.tipo || "",
        cod_interno: v.cod_interno || "",
        cod_barras: v.cod_barras || "",
        estoque: v.estoque || 0,
        estoque_minimo: v.estoque_minimo || 0,
        imagemIndex: null,
      }));

      formData.append("variacoes", JSON.stringify(variacoesFormatadas));

      // Log para debug
      console.log("📤 Enviando atualização:");
      console.log("- Imagens existentes:", imagensExistentes.length);
      console.log("- Imagens a deletar:", deletedImages.length);
      console.log("- Novas imagens:", newImageFiles.length);

      const response = await fetch(
        `${API_URL}/produto/editar/${productData.id_produto}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Produto atualizado com sucesso!");
        setIsEditing(false);
        setNewImages([]);
        setNewImageFiles([]);
        setDeletedImages([]);
        setSelectedImageIndex(0);
        await buscarProdutoID(); // Recarrega os dados
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao atualizar produto");
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert(`Erro ao salvar produto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProductData(JSON.parse(JSON.stringify(originalData)));
    setNewImages([]);
    setNewImageFiles([]);
    setDeletedImages([]);
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
    });
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
          ...(prev.variacao || []),
          { id_variacao: Date.now(), ...variacaoForm, images: [] },
        ],
      }));
    }

    setShowVariacaoModal(false);
  };

  const handleDeleteVariacao = (index) => {
    if (window.confirm("Deseja realmente excluir esta variação?")) {
      setProductData((prev) => ({
        ...prev,
        variacao: prev.variacao.filter((_, i) => i !== index),
      }));
    }
  };

  const hasVariations = productData.variacao && productData.variacao.length > 0;

  // Combina imagens existentes (não deletadas) com novas imagens
  const existingImages = (productData.images || []).filter(
    (img) => !deletedImages.includes(img.id_imagem)
  );
  const newImagesWithFlag = newImages.map((url, i) => ({
    caminho_arquivo: url,
    isNew: true,
    tempId: `new-${i}`,
  }));
  const currentImages = [...existingImages, ...newImagesWithFlag];
  const currentImage = currentImages[selectedImageIndex];

  const getCurrentEstoque = () => {
    if (hasVariations) {
      return productData.variacao.reduce(
        (total, v) => total + (v.estoque || 0),
        0
      );
    }
    return productData.estoque;
  };

  const getCurrentEstoqueMinimo = () => {
    if (hasVariations) {
      return productData.variacao.reduce(
        (total, v) => total + (v.estoque_minimo || 0),
        0
      );
    }
    return productData.estoque_minimo;
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
                        // Remove imagem nova
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
                        // Remove imagem existente
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

              {productData.variacao.map((variacao, index) => (
                <div key={variacao.id_variacao} style={styles.variacaoCard}>
                  {variacao.images && variacao.images.length > 0 && (
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
                        src={`${API_URL}${variacao.images[0].caminho_arquivo}`}
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

      {modalDeleteProduto && (
        <div
          style={styles.modalOverlay}
          onClick={() => setModalDeleteProduto(false)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Confirmar Exclusão</h3>
              <button
                style={styles.closeButton}
                onClick={() => setModalDeleteProduto(false)}
              >
                <X size={20} />
              </button>
            </div>
            <p style={{ color: "var(--text-primary)", marginBottom: "8px" }}>
              Deseja confirmar a exclusão de:{" "}
              <strong>{productData.nome}</strong>?
            </p>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Esses dados não poderão ser recuperados posteriormente.
            </p>
            <div style={styles.modalActions}>
              <button
                style={styles.cancelButton}
                onClick={() => setModalDeleteProduto(false)}
              >
                Cancelar
              </button>
              <button
                style={{
                  ...styles.modalSaveButton,
                  background: "var(--error-500)",
                }}
                onClick={deletarProduto}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailScreen;
