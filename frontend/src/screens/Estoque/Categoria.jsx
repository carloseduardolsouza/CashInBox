import React, { useState, useEffect } from 'react';
import { MoreVertical, ChevronRight, Plus, Edit2, Eye, Trash2 } from 'lucide-react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'var(--background-color)',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: '0'
  },
  createButton: {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--text-inverse)',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    marginBottom: '24px',
    lineHeight: '1.5'
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'var(--background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
    position: 'relative'
  },
  chevronContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '4px',
    marginRight: '8px'
  },
  chevron: {
    color: 'var(--text-muted)',
    transition: 'transform 0.2s'
  },
  chevronExpanded: {
    transform: 'rotate(90deg)'
  },
  categoryName: {
    flex: 1,
    color: 'var(--text-primary)',
    fontSize: '15px',
    fontWeight: '500'
  },
  subcategoryCount: {
    color: 'var(--text-muted)',
    fontSize: '13px',
    marginRight: '8px',
    backgroundColor: 'var(--background-soft)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  moreButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-muted)',
    borderRadius: '4px'
  },
  dropdown: {
    position: 'absolute',
    right: '16px',
    top: '48px',
    backgroundColor: 'var(--background)',
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '180px',
    overflow: 'hidden'
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    cursor: 'pointer',
    backgroundColor: 'var(--background)',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    fontSize: '14px',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--surface-border)'
  },
  dropdownItemDelete: {
    color: 'var(--error-500)',
    borderBottom: 'none'
  },
  subcategoryList: {
    marginLeft: '48px',
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  subcategoryItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: 'var(--background-soft)',
    border: '1px solid var(--surface-border)',
    borderRadius: '6px',
    position: 'relative'
  }
};

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Wheys', subcategories: [
      { id: 11, name: 'Whey Isolado' },
      { id: 12, name: 'Whey Concentrado' }
    ]},
    { id: 2, name: 'Pré-Treino', subcategories: [] },
    { id: 3, name: 'Creatina', subcategories: [] },
    { id: 4, name: 'Aminoácidos', subcategories: [] },
    { id: 5, name: 'Combos', subcategories: [] },
    { id: 6, name: 'Termogênicos', subcategories: [] },
    { id: 7, name: 'Cafeínas', subcategories: [] }
  ]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-dropdown]')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleCategory = (e, id) => {
    e.stopPropagation();
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateSubcategory = (categoryId) => {
    const name = prompt('Nome da subcategoria:');
    if (name) {
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: [...cat.subcategories, { id: Date.now(), name }] }
          : cat
      ));
      setExpandedCategories(prev => ({ ...prev, [categoryId]: true }));
    }
    setOpenDropdown(null);
  };

  const handleEdit = (id) => {
    const category = categories.find(c => c.id === id);
    const newName = prompt('Editar nome da categoria:', category?.name);
    if (newName && newName !== category?.name) {
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: newName } : cat
      ));
    }
    setOpenDropdown(null);
  };

  const handleEditSubcategory = (categoryId, subcategoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
    const newName = prompt('Editar nome da subcategoria:', subcategory?.name);
    if (newName && newName !== subcategory?.name) {
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { 
              ...cat, 
              subcategories: cat.subcategories.map(sub => 
                sub.id === subcategoryId ? { ...sub, name: newName } : sub
              ) 
            }
          : cat
      ));
    }
    setOpenDropdown(null);
  };

  const handleHide = (id) => {
    alert(`Ocultar na loja: ${categories.find(c => c.id === id)?.name}`);
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    const category = categories.find(c => c.id === id);
    if (confirm(`Eliminar categoria "${category?.name}"?`)) {
      setCategories(categories.filter(c => c.id !== id));
    }
    setOpenDropdown(null);
  };

  const handleCreateCategory = () => {
    const name = prompt('Nome da nova categoria:');
    if (name) {
      setCategories([...categories, { id: Date.now(), name, subcategories: [] }]);
    }
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    if (confirm('Eliminar subcategoria?')) {
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId) }
          : cat
      ));
    }
    setOpenDropdown(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Categorias</h1>
        <button style={styles.createButton} onClick={handleCreateCategory}>
          <Plus size={18} />
          Criar categoria
        </button>
      </div>

      <p style={styles.description}>
        Para organizar seus produtos, crie categorias e subcategorias.
      </p>

      <div style={styles.categoryList}>
        {categories.map((category) => (
          <div key={category.id}>
            <div style={styles.categoryItem}>
              <div 
                style={styles.chevronContainer}
                onClick={(e) => toggleCategory(e, category.id)}
              >
                <ChevronRight 
                  size={18} 
                  style={{
                    ...styles.chevron,
                    ...(expandedCategories[category.id] ? styles.chevronExpanded : {})
                  }} 
                />
              </div>
              <span style={styles.categoryName}>{category.name}</span>
              {category.subcategories.length > 0 && (
                <span style={styles.subcategoryCount}>
                  {category.subcategories.length}
                </span>
              )}
              <button 
                style={styles.moreButton}
                onClick={(e) => toggleDropdown(e, category.id)}
                data-dropdown
              >
                <MoreVertical size={20} />
              </button>

              {openDropdown === category.id && (
                <div style={styles.dropdown} data-dropdown>
                  <button 
                    style={styles.dropdownItem}
                    onClick={() => handleCreateSubcategory(category.id)}
                  >
                    <Plus size={16} />
                    Criar subcategoria
                  </button>
                  <button 
                    style={styles.dropdownItem}
                    onClick={() => handleEdit(category.id)}
                  >
                    <Edit2 size={16} />
                    Editar
                  </button>
                  <button 
                    style={{...styles.dropdownItem, ...styles.dropdownItemDelete}}
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            {expandedCategories[category.id] && category.subcategories.length > 0 && (
              <div style={styles.subcategoryList}>
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.id} style={styles.subcategoryItem}>
                    <span style={{...styles.categoryName, fontSize: '14px'}}>{subcategory.name}</span>
                    <button 
                      style={styles.moreButton}
                      onClick={(e) => toggleDropdown(e, `sub-${subcategory.id}`)}
                      data-dropdown
                    >
                      <MoreVertical size={18} />
                    </button>

                    {openDropdown === `sub-${subcategory.id}` && (
                      <div style={styles.dropdown} data-dropdown>
                        <button 
                          style={styles.dropdownItem}
                          onClick={() => handleEditSubcategory(category.id, subcategory.id)}
                        >
                          <Edit2 size={16} />
                          Editar
                        </button>
                        <button 
                          style={styles.dropdownItem}
                          onClick={() => { alert('Ocultar subcategoria'); setOpenDropdown(null); }}
                        >
                          <Eye size={16} />
                          Ocultar na loja
                        </button>
                        <button 
                          style={{...styles.dropdownItem, ...styles.dropdownItemDelete}}
                          onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;