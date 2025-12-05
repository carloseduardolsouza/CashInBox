import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  ChevronRight,
  Plus,
  Edit2,
  Eye,
  Trash2,
  X,
  Check,
} from "lucide-react";
import estoqueFetch from "../../services/api/estoqueFetch";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "var(--background-color)",
    minHeight: "100vh",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: "0",
  },
  createButton: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  description: {
    color: "var(--text-secondary)",
    fontSize: "14px",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  categoryItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    position: "relative",
  },
  newCategoryItem: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "var(--background)",
    border: "2px solid var(--primary-color)",
    borderRadius: "8px",
    position: "relative",
    gap: "12px",
  },
  chevronContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "4px",
    marginRight: "8px",
  },
  chevron: {
    color: "var(--text-muted)",
    transition: "transform 0.2s",
  },
  chevronExpanded: {
    transform: "rotate(90deg)",
  },
  categoryName: {
    flex: 1,
    color: "var(--text-primary)",
    fontSize: "15px",
    fontWeight: "500",
  },
  categoryInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "15px",
    fontWeight: "500",
    color: "var(--text-primary)",
    backgroundColor: "transparent",
    padding: "4px 8px",
  },
  subcategoryInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)",
    backgroundColor: "transparent",
    padding: "4px 8px",
  },
  subcategoryCount: {
    color: "var(--text-muted)",
    fontSize: "13px",
    marginRight: "8px",
    backgroundColor: "var(--background-soft)",
    padding: "4px 8px",
    borderRadius: "12px",
  },
  moreButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-muted)",
    borderRadius: "4px",
  },
  actionButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
  confirmButton: {
    color: "var(--text-muted)",
  },
  cancelButton: {
    color: "var(--text-muted)",
  },
  dropdown: {
    position: "absolute",
    right: "16px",
    top: "48px",
    backgroundColor: "var(--background)",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    minWidth: "180px",
    overflow: "hidden",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    backgroundColor: "var(--background)",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontSize: "14px",
    color: "var(--text-primary)",
    borderBottom: "1px solid var(--surface-border)",
  },
  dropdownItemDelete: {
    color: "var(--error-500)",
    borderBottom: "none",
  },
  subcategoryList: {
    marginLeft: "48px",
    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  subcategoryItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "var(--background-soft)",
    border: "1px solid var(--surface-border)",
    borderRadius: "6px",
    position: "relative",
    gap: "8px",
  },
  newSubcategoryItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "var(--background-soft)",
    border: "2px solid var(--primary-color)",
    borderRadius: "6px",
    position: "relative",
    gap: "8px",
  },
  dragHandle: {
    color: "var(--text-muted)",
    cursor: "grab",
    marginRight: "8px",
  },
};

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [openCreateSubcategoria, setOpenCreateSubcategoria] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");

  const [formCategoria, setFormCategoria] = useState({
    nome: "",
    descricao: "",
  });
  const [formSubcategoria, setFormSubcategoria] = useState({
    id_categoria: null,
    nome: "",
    descricao: "",
  });

  const buscarCategorias = async () => {
    const response = await estoqueFetch.listaCategoria();
    setCategories(response.reverse());
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-dropdown]")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleCategory = (e, id) => {
    e.stopPropagation();
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleStartCreateCategory = () => {
    setIsCreatingCategory(true);
    setNewCategoryName("");
    setFormCategoria({
      nome: "",
      descricao: "",
    });
  };

  const handleStartCreateSubcategory = (id) => {
    setOpenDropdown(null);
    setOpenCreateSubcategoria(id);
    setNewSubcategoryName("");
    setFormSubcategoria({
      id_categoria: id,
      nome: "",
      descricao: "",
    });
    // Expande a categoria automaticamente
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleCancelCreateCategory = () => {
    setIsCreatingCategory(false);
    setNewCategoryName("");
    setFormCategoria({
      nome: "",
      descricao: "",
    });
  };

  const handleCancelCreateSubcategory = () => {
    setOpenCreateSubcategoria(null);
    setNewSubcategoryName("");
    setFormSubcategoria({
      id_categoria: null,
      nome: "",
      descricao: "",
    });
  };

  const handleConfirmCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    const categoriaData = {
      ...formCategoria,
      nome: newCategoryName,
    };

    try {
      const response = await estoqueFetch.cadastroCategoria(categoriaData);
      if (response.success) {
        buscarCategorias();
        setIsCreatingCategory(false);
        setNewCategoryName("");
        setFormCategoria({
          nome: "",
          descricao: "",
        });
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  const handleConfirmCreateSubcategory = async () => {
    if (!newSubcategoryName.trim()) {
      return;
    }

    const subcategoriaData = {
      ...formSubcategoria,
      nome: newSubcategoryName,
    };

    try {
      const response = await estoqueFetch.cadastroSubCategoria(subcategoriaData);
      if (response.success) {
        buscarCategorias();
        setOpenCreateSubcategoria(null);
        setNewSubcategoryName("");
        setFormSubcategoria({
          id_categoria: null,
          nome: "",
          descricao: "",
        });
      }
    } catch (error) {
      console.error("Erro ao criar subcategoria:", error);
    }
  };

  const handleCategoryNameChange = (e) => {
    const value = e.target.value;
    setNewCategoryName(value);
    setFormCategoria((prev) => ({
      ...prev,
      nome: value,
    }));
  };

  const handleSubcategoryNameChange = (e) => {
    const value = e.target.value;
    setNewSubcategoryName(value);
    setFormSubcategoria((prev) => ({
      ...prev,
      nome: value,
    }));
  };

  const handleKeyPressCategory = (e) => {
    if (e.key === "Enter") {
      handleConfirmCreateCategory();
    } else if (e.key === "Escape") {
      handleCancelCreateCategory();
    }
  };

  const handleKeyPressSubcategory = (e) => {
    if (e.key === "Enter") {
      handleConfirmCreateSubcategory();
    } else if (e.key === "Escape") {
      handleCancelCreateSubcategory();
    }
  };

  const handleEdit = async (id) => {
    setOpenDropdown(null);
    // Implementar lógica de edição de categoria
    console.log("Editar categoria:", id);
    // Você pode abrir um modal ou transformar o item em editável
  };

  const handleEditSubcategory = async (categoryId, subcategoryId) => {
    setOpenDropdown(null);
    // Implementar lógica de edição de subcategoria
    console.log("Editar subcategoria:", subcategoryId, "da categoria:", categoryId);
  };

  const handleDelete = async (id) => {
    setOpenDropdown(null);
    if (window.confirm("Tem certeza que deseja eliminar esta categoria?")) {
      try {
        const response = await estoqueFetch.deleteCategoria(id);
        if (response.success) {
          buscarCategorias();
        }
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
      }
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    setOpenDropdown(null);
    if (window.confirm("Tem certeza que deseja eliminar esta subcategoria?")) {
      try {
        const response = await estoqueFetch.deleteSubcategoria(subcategoryId);
        if (response.success) {
          buscarCategorias();
        }
      } catch (error) {
        console.error("Erro ao deletar subcategoria:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Categorias</h1>
        <button style={styles.createButton} onClick={handleStartCreateCategory}>
          <Plus size={18} />
          Criar categoria
        </button>
      </div>

      <p style={styles.description}>
        Para organizar seus produtos, crie categorias e subcategorias.
      </p>

      <div style={styles.categoryList}>
        {isCreatingCategory && (
          <div style={styles.newCategoryItem}>
            <input
              type="text"
              style={styles.categoryInput}
              placeholder="Nome da categoria"
              value={newCategoryName}
              onChange={handleCategoryNameChange}
              onKeyDown={handleKeyPressCategory}
              autoFocus
            />
            <button
              style={{ ...styles.actionButton, ...styles.cancelButton }}
              onClick={handleCancelCreateCategory}
              title="Cancelar"
            >
              <X size={20} />
            </button>
            <button
              style={{ ...styles.actionButton, ...styles.confirmButton }}
              onClick={handleConfirmCreateCategory}
              title="Salvar"
            >
              <Check size={20} />
            </button>
          </div>
        )}

        {categories.map((category) => (
          <div key={category.id_categoria}>
            <div style={styles.categoryItem}>
              <div
                style={styles.chevronContainer}
                onClick={(e) => toggleCategory(e, category.id_categoria)}
              >
                <ChevronRight
                  size={18}
                  style={{
                    ...styles.chevron,
                    ...(expandedCategories[category.id_categoria]
                      ? styles.chevronExpanded
                      : {}),
                  }}
                />
              </div>
              <span style={styles.categoryName}>{category.nome}</span>
              {category.subcategorias.length > 0 && (
                <span style={styles.subcategoryCount}>
                  {category.subcategorias.length}
                </span>
              )}
              <button
                style={styles.moreButton}
                onClick={(e) => toggleDropdown(e, category.id_categoria)}
                data-dropdown
              >
                <MoreVertical size={20} />
              </button>

              {openDropdown === category.id_categoria && (
                <div style={styles.dropdown} data-dropdown>
                  <button
                    style={styles.dropdownItem}
                    onClick={() =>
                      handleStartCreateSubcategory(category.id_categoria)
                    }
                  >
                    <Plus size={16} />
                    Criar subcategoria
                  </button>
                  <button
                    style={styles.dropdownItem}
                    onClick={() => handleEdit(category.id_categoria)}
                  >
                    <Edit2 size={16} />
                    Editar
                  </button>
                  <button
                    style={{
                      ...styles.dropdownItem,
                      ...styles.dropdownItemDelete,
                    }}
                    onClick={() => handleDelete(category.id_categoria)}
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            {expandedCategories[category.id_categoria] && (
              <>
                {openCreateSubcategoria === category.id_categoria && (
                  <div style={styles.subcategoryList}>
                    <div style={styles.newSubcategoryItem}>
                      <input
                        type="text"
                        style={styles.subcategoryInput}
                        placeholder="Nome da subcategoria"
                        value={newSubcategoryName}
                        onChange={handleSubcategoryNameChange}
                        onKeyDown={handleKeyPressSubcategory}
                        autoFocus
                      />
                      <button
                        style={{
                          ...styles.actionButton,
                          ...styles.cancelButton,
                        }}
                        onClick={handleCancelCreateSubcategory}
                        title="Cancelar"
                      >
                        <X size={20} />
                      </button>
                      <button
                        style={{
                          ...styles.actionButton,
                          ...styles.confirmButton,
                        }}
                        onClick={handleConfirmCreateSubcategory}
                        title="Salvar"
                      >
                        <Check size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {category.subcategorias.length > 0 && (
                  <div style={styles.subcategoryList}>
                    {category.subcategorias.map((subcategory) => (
                      <div
                        key={subcategory.id_subcategoria}
                        style={styles.subcategoryItem}
                      >
                        <span
                          style={{ ...styles.categoryName, fontSize: "14px" }}
                        >
                          {subcategory.nome}
                        </span>
                        <button
                          style={styles.moreButton}
                          onClick={(e) =>
                            toggleDropdown(
                              e,
                              `sub-${subcategory.id_subcategoria}`
                            )
                          }
                          data-dropdown
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openDropdown ===
                          `sub-${subcategory.id_subcategoria}` && (
                          <div style={styles.dropdown} data-dropdown>
                            <button
                              style={styles.dropdownItem}
                              onClick={() =>
                                handleEditSubcategory(
                                  category.id_categoria,
                                  subcategory.id_subcategoria
                                )
                              }
                            >
                              <Edit2 size={16} />
                              Editar
                            </button>
                            <button
                              style={{
                                ...styles.dropdownItem,
                                ...styles.dropdownItemDelete,
                              }}
                              onClick={() =>
                                handleDeleteSubcategory(
                                  category.id_categoria,
                                  subcategory.id_subcategoria
                                )
                              }
                            >
                              <Trash2 size={16} />
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;