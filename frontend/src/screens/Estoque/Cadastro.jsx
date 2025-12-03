import React, { useState, useRef } from "react";
import {
  FaCamera,
  FaBox,
  FaTag,
  FaDollarSign,
  FaImage,
  FaPlus,
  FaTimes,
  FaCheck,
  FaEdit,
  FaTrash,
  FaCube,
} from "react-icons/fa";

//Biblioteca
import Select from "react-select";

//modais
import ModalVariacao from "./components/ModalVariacao";

// Dados simulados
const categoriasSimuladas = [
  { id: 1, nome: "Eletrônicos" },
  { id: 2, nome: "Roupas" },
  { id: 3, nome: "Alimentos" },
  { id: 4, nome: "Livros" },
  { id: 5, nome: "Brinquedos" },
];

const CadastrarProduto = () => {
  const fileInputRef = useRef(null);

  const [state, setState] = useState({
    categorias: categoriasSimuladas,
    images: [],
    imageFiles: [],
    showImagePreview: false,
    isSubmitting: false,
    showModal: false,
    currentImageIndex: 0,
    showSuccess: false,
    showVariacaoModal: false,
    editingVariacaoIndex: null,
  });

  const [formData, setFormData] = useState({
    nome: "",
    marca: "",
    descricao: "",
    precoCompra: "",
    precoVenda: "",
    markup: 0,
    categoriaId: "",
    referencia: "",
    usarReferencia: false,
  });

  const [variacoes, setVariacoes] = useState([]);

  const [variacaoForm, setVariacaoForm] = useState({
    nome: "",
    tipo: "",
    cod_interno: "",
    cod_barras: "",
    estoque: "",
    estoque_minimo: "",
    imagemIndex: null,
  });

  const [novaCategoria, setNovaCategoria] = useState("");

  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0px auto 0px 44px",
      padding: "32px 24px",
      background: "var(--background-color)",
      minHeight: "100vh",
    },
    mainContent: {
      display: "flex",
      gap: "32px",
      alignItems: "flex-start",
    },
    formContainer: {
      flex: 1,
      background: "var(--background-color)",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      border: "1px solid var(--surface-border)",
    },
    formSection: {
      marginBottom: "32px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "var(--text-primary)",
      margin: "0 0 20px 0",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      paddingBottom: "12px",
      borderBottom: "2px solid var(--surface-border)",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "20px",
    },
    formLabel: {
      fontSize: "14px",
      fontWeight: "600",
      color: "var(--text-secondary)",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    requiredIndicator: {
      color: "var(--error-500)",
      fontSize: "12px",
    },
    formInput: {
      width: "95%",
      padding: "12px 16px",
      border: "2px solid var(--surface-border)",
      borderRadius: "8px",
      fontSize: "15px",
      color: "var(--text-primary)",
      background: "var(--background)",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
    },
    categoryRow: {
      display: "flex",
      alignItems: "flex-end",
      gap: "12px",
    },
    categorySelect: {
      flex: 1,
    },
    textarea: {
      minHeight: "100px",
      resize: "vertical",
      fontFamily: "inherit",
    },
    pricingSection: {
      background: "var(--surface-soft)",
      border: "2px solid var(--surface-border)",
      borderRadius: "12px",
      padding: "24px",
    },
    pricingGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "5px",
    },
    priceInputWrapper: {
      position: "relative",
    },
    currencySymbol: {
      position: "absolute",
      left: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "15px",
      fontWeight: "600",
      color: "var(--success-700)",
      pointerEvents: "none",
    },
    priceInput: {
      paddingLeft: "45px",
      fontWeight: "600",
      textAlign: "right",
      width: "70%",
      padding: "12px 16px",
      border: "2px solid var(--surface-border)",
      borderRadius: "8px",
      fontSize: "15px",
      color: "var(--text-primary)",
      background: "var(--background)",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
    },
    marginInput: {
      textAlign: "center",
      fontWeight: "700",
      color: "var(--error-500)",
      paddingLeft: "45px",
      width: "70%",
      padding: "12px 16px",
      border: "2px solid var(--surface-border)",
      borderRadius: "8px",
      fontSize: "15px",
      background: "var(--background)",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
    },
    fileInputWrapper: {
      position: "relative",
    },
    fileInput: {
      position: "absolute",
      width: 0,
      height: 0,
      opacity: 0,
      overflow: "hidden",
    },
    fileInputButton: {
      width: "95%",
      padding: "20px",
      background: "var(--surface)",
      border: "2px dashed var(--surface-border)",
      borderRadius: "8px",
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    },
    fileInputIcon: {
      fontSize: "32px",
      color: "var(--text-muted)",
    },
    fileInputText: {
      fontSize: "14px",
      color: "var(--text-secondary)",
      fontWeight: "500",
    },
    submitSection: {
      marginTop: "32px",
      paddingTop: "24px",
      borderTop: "2px solid var(--surface-border)",
      textAlign: "center",
    },
    submitButton: {
      padding: "14px 48px",
      background: "var(--primary-color)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    submitButtonDisabled: {
      background: "var(--neutral-500)",
      cursor: "not-allowed",
    },
    imagePreviewContainer: {
      background: "var(--background)",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      border: "1px solid var(--surface-border)",
      height: "fit-content",
      width: "380px",
      flexShrink: 0,
      position: "sticky",
      top: "24px",
    },
    previewHeader: {
      textAlign: "center",
      marginBottom: "20px",
    },
    previewTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "var(--text-primary)",
      margin: "0 0 8px 0",
    },
    previewSubtitle: {
      fontSize: "14px",
      color: "var(--text-muted)",
      margin: 0,
    },
    imageDisplay: {
      width: "100%",
      height: "320px",
      borderRadius: "12px",
      overflow: "hidden",
      background: "var(--surface)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    placeholderContent: {
      textAlign: "center",
      color: "var(--text-muted)",
    },
    placeholderIcon: {
      fontSize: "64px",
      marginBottom: "16px",
      opacity: 0.5,
    },
    placeholderText: {
      fontSize: "15px",
      fontWeight: "500",
      margin: 0,
    },
    imageSlider: {
      width: "100%",
      height: "100%",
      position: "relative",
    },
    imageSlide: {
      width: "100%",
      height: "320px",
      objectFit: "cover",
    },
    imageControls: {
      position: "absolute",
      bottom: "16px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      zIndex: 2,
    },
    imageNavButton: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: "rgba(0, 0, 0, 0.6)",
      border: "none",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    },
    imageIndicators: {
      display: "flex",
      gap: "6px",
    },
    indicator: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.5)",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    indicatorActive: {
      background: "white",
      width: "24px",
      borderRadius: "4px",
    },
    removeImageButton: {
      position: "absolute",
      top: "12px",
      right: "12px",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      background: "var(--error-500)",
      border: "none",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 3,
      transition: "all 0.2s ease",
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
    },
    deleteButton: {
      background: "var(--error-500)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
    },
    variacoesEmpty: {
      textAlign: "center",
      padding: "32px",
      color: "var(--text-muted)",
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
    saveButton: {
      padding: "10px 24px",
      background: "var(--primary-color)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "600",
    },
  };

  const calculatePrices = (field, value) => {
    const numValue = parseFloat(value) || 0;

    if (field === "precoCompra") {
      const newPrecoVenda = numValue + (numValue * formData.markup) / 100;
      setFormData((prev) => ({
        ...prev,
        precoCompra: numValue,
        precoVenda: newPrecoVenda.toFixed(2),
      }));
    } else if (field === "markup") {
      const newPrecoVenda =
        formData.precoCompra + (formData.precoCompra * numValue) / 100;
      setFormData((prev) => ({
        ...prev,
        markup: numValue,
        precoVenda: newPrecoVenda.toFixed(2),
      }));
    } else if (field === "precoVenda") {
      const newMarkup =
        formData.precoCompra > 0
          ? ((numValue - formData.precoCompra) / formData.precoCompra) * 100
          : 0;
      setFormData((prev) => ({
        ...prev,
        precoVenda: numValue,
        markup: newMarkup.toFixed(2),
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => URL.createObjectURL(file));

    setState((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...files],
      images: [...prev.images, ...newImages],
      showImagePreview: true,
    }));
  };

  const removeImage = (index) => {
    setState((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
      currentImageIndex: Math.max(0, prev.currentImageIndex - 1),
      showImagePreview: prev.images.length > 1,
    }));
  };

  const nextImage = () => {
    setState((prev) => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = () => {
    setState((prev) => ({
      ...prev,
      currentImageIndex:
        prev.currentImageIndex === 0
          ? prev.images.length - 1
          : prev.currentImageIndex - 1,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.isSubmitting) return;

    setState((prev) => ({ ...prev, isSubmitting: true }));

    // Simular requisição de API
    setTimeout(() => {
      console.log("Produto:", formData);
      console.log("Variações:", variacoes);
      console.log("Imagens:", state.imageFiles);

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        showSuccess: true,
        images: [],
        imageFiles: [],
        showImagePreview: false,
        currentImageIndex: 0,
      }));

      setFormData({
        nome: "",
        marca: "",
        descricao: "",
        precoCompra: "",
        precoVenda: "",
        markup: 0,
        categoriaId: "",
      });

      setVariacoes([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        setState((prev) => ({ ...prev, showSuccess: false }));
      }, 3000);
    }, 1500);
  };

  const handleAddCategoria = () => {
    if (novaCategoria.trim()) {
      const newCat = {
        id: state.categorias.length + 1,
        nome: novaCategoria,
      };
      setState((prev) => ({
        ...prev,
        categorias: [...prev.categorias, newCat],
        showModal: false,
      }));
      setNovaCategoria("");
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
      imagemIndex: null,
    });
    setState((prev) => ({
      ...prev,
      showVariacaoModal: true,
      editingVariacaoIndex: null,
    }));
  };

  const closeVariacaoModal = () => {
    setState((prev) => ({
      ...prev,
      showVariacaoModal: false,
      editingVariacaoIndex: null,
    }));
  };

  const handleSaveVariacao = () => {
    if (!variacaoForm.nome.trim()) {
      alert("Nome da variação é obrigatório");
      return;
    }

    if (state.editingVariacaoIndex !== null) {
      // Editando variação existente
      const newVariacoes = [...variacoes];
      newVariacoes[state.editingVariacaoIndex] = { ...variacaoForm };
      setVariacoes(newVariacoes);
    } else {
      // Adicionando nova variação
      setVariacoes([...variacoes, { ...variacaoForm }]);
    }

    closeVariacaoModal();
  };

  const handleEditVariacao = (index) => {
    setVariacaoForm({ ...variacoes[index] });
    setState((prev) => ({
      ...prev,
      showVariacaoModal: true,
      editingVariacaoIndex: index,
    }));
  };

  const handleDeleteVariacao = (index) => {
    if (window.confirm("Deseja realmente excluir esta variação?")) {
      setVariacoes(variacoes.filter((_, i) => i !== index));
    }
  };

  const isFormValid =
    formData.nome.trim() !== "" && formData.categoriaId !== "";

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

  const optionsCategorias = [];

  state.categorias.map((categoria, index) => {
    optionsCategorias.push({
      value: categoria.id,
      label: categoria.nome,
    });
  });

  const handleSaveCategoria = (value) => {
    if (value.trim()) {
      const newCat = {
        id: state.categorias.length + 1,
        nome: value,
      };
      setState((prev) => ({
        ...prev,
        categorias: [...prev.categorias, newCat],
        showModal: false,
      }));
      setNovaCategoria("");
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          <div>
            {/* Informações Básicas */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <FaTag /> Informações Básicas
              </h3>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Nome do Produto{" "}
                  <span style={styles.requiredIndicator}>*</span>
                </label>
                <input
                  type="text"
                  style={styles.formInput}
                  placeholder="Digite o nome do produto..."
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, nome: e.target.value }))
                  }
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Categoria <span style={styles.requiredIndicator}>*</span>
                </label>
                <div style={styles.categoryRow}>
                  <div style={styles.categorySelect}>
                    <Select
                      styles={customStyles}
                      placeholder="Categoria"
                      options={optionsCategorias}
                      onChange={(e) => {
                        const selected = state.categorias.find(
                          (c) => c.id === parseInt(e.value)
                        );
                        setFormData((prev) => ({
                          ...prev,
                          categoriaId: e.value,
                          marca: selected ? selected.nome : "",
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Descrição</label>
                <textarea
                  style={{ ...styles.formInput, ...styles.textarea }}
                  placeholder="Descreva o produto..."
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      descricao: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </div>
            </div>

            {/* Precificação */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <FaDollarSign /> Precificação
              </h3>

              <div style={styles.pricingSection}>
                <div style={styles.pricingGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Preço de Compra</label>
                    <div style={styles.priceInputWrapper}>
                      <span style={styles.currencySymbol}>R$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        style={styles.priceInput}
                        placeholder="0,00"
                        value={formData.precoCompra}
                        onChange={(e) =>
                          calculatePrices("precoCompra", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Margem (%)</label>
                    <input
                      type="number"
                      style={styles.marginInput}
                      placeholder="0"
                      value={formData.markup}
                      onChange={(e) =>
                        calculatePrices("markup", e.target.value)
                      }
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Preço de Venda</label>
                    <div style={styles.priceInputWrapper}>
                      <span style={styles.currencySymbol}>R$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        style={styles.priceInput}
                        placeholder="0,00"
                        value={formData.precoVenda}
                        onChange={(e) =>
                          calculatePrices("precoVenda", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Variações */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <FaCube /> Variações do Produto
              </h3>

              {variacoes.length === 0 ? (
                <div style={styles.variacoesEmpty}>
                  <p>Nenhuma variação adicionada</p>
                  <p style={{ fontSize: "13px", marginTop: "8px" }}>
                    Combine diferentes propriedades do seu produto. Exemplo: cor
                    + tamanho
                  </p>
                </div>
              ) : (
                <div>
                  {variacoes.map((variacao, index) => (
                    <div key={index} style={styles.variacaoCard}>
                      {variacao.imagemIndex !== null &&
                        state.images[variacao.imagemIndex] && (
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
                              src={state.images[variacao.imagemIndex]}
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
                          {variacao.estoque && `Estoque: ${variacao.estoque}`}
                          {variacao.estoque_minimo &&
                            ` • Mín: ${variacao.estoque_minimo}`}
                        </div>
                      </div>
                      <div style={styles.variacaoActions}>
                        <button
                          style={styles.editButton}
                          onClick={() => handleEditVariacao(index)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          style={styles.deleteButton}
                          onClick={() => handleDeleteVariacao(index)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                style={styles.addVariacaoButton}
                onClick={openVariacaoModal}
              >
                <FaPlus /> Adicionar Variação
              </button>
            </div>

            {/* Imagens */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <FaImage /> Imagens do Produto
              </h3>

              <div style={styles.formGroup}>
                <div style={styles.fileInputWrapper}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    style={styles.fileInput}
                    onChange={handleImageChange}
                    id="file-input"
                  />
                  <label htmlFor="file-input" style={styles.fileInputButton}>
                    <FaCamera style={styles.fileInputIcon} />
                    <span style={styles.fileInputText}>
                      {state.images.length > 0
                        ? `${state.images.length} imagem(ns) selecionada(s)`
                        : "Clique para adicionar imagens"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Botão Submit */}
            <div style={styles.submitSection}>
              <button
                onClick={handleSubmit}
                style={{
                  ...styles.submitButton,
                  ...((!isFormValid || state.isSubmitting) &&
                    styles.submitButtonDisabled),
                }}
                disabled={!isFormValid || state.isSubmitting}
              >
                {state.isSubmitting ? (
                  <>Cadastrando...</>
                ) : (
                  <>
                    <FaBox />
                    Cadastrar Produto
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview de Imagens */}
        <div style={styles.imagePreviewContainer}>
          <div style={styles.previewHeader}>
            <h3 style={styles.previewTitle}>Preview das Imagens</h3>
            <p style={styles.previewSubtitle}>
              {state.images.length > 0
                ? `${state.images.length} imagem(ns) carregada(s)`
                : "Nenhuma imagem selecionada"}
            </p>
          </div>

          <div style={styles.imageDisplay}>
            {state.showImagePreview && state.images.length > 0 ? (
              <div style={styles.imageSlider}>
                <img
                  src={state.images[state.currentImageIndex]}
                  alt={`Preview ${state.currentImageIndex + 1}`}
                  style={styles.imageSlide}
                />
                <button
                  type="button"
                  style={styles.removeImageButton}
                  onClick={() => removeImage(state.currentImageIndex)}
                  title="Remover imagem"
                >
                  <FaTimes />
                </button>
                {state.images.length > 1 && (
                  <div style={styles.imageControls}>
                    <button
                      type="button"
                      style={styles.imageNavButton}
                      onClick={prevImage}
                    >
                      ‹
                    </button>
                    <div style={styles.imageIndicators}>
                      {state.images.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            ...styles.indicator,
                            ...(index === state.currentImageIndex &&
                              styles.indicatorActive),
                          }}
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              currentImageIndex: index,
                            }))
                          }
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      style={styles.imageNavButton}
                      onClick={nextImage}
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.placeholderContent}>
                <FaCamera style={styles.placeholderIcon} />
                <p style={styles.placeholderText}>As imagens aparecerão aqui</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Categoria */}
      {state.showModal && (
        <ModalCategoria
          isOpen={state.showModal}
          onClose={() => setState((prev) => ({ ...prev, showModal: false }))}
          onSave={handleSaveCategoria}
          value={novaCategoria}
          onChange={setNovaCategoria}
        />
      )}

      {/* Modal de Variação */}
      {state.showVariacaoModal && (
        <ModalVariacao
          isOpen={state.showVariacaoModal}
          onClose={closeVariacaoModal}
          onSave={handleSaveVariacao}
          data={variacaoForm}
          onChange={setVariacaoForm}
          isEditing={state.editingVariacaoIndex !== null}
          images={state.images}
        />
      )}
    </div>
  );
};

export default CadastrarProduto;
