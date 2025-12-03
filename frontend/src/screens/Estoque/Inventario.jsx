import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Download, Plus, Trash2 } from "lucide-react";
import { FaEdit } from "react-icons/fa";

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
    width: "48px",
    height: "48px",
    backgroundColor: "var(--surface)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
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
};

export default function Inventario() {
  const [products] = useState([
    {
      id: 1,
      name: "Ectoplasma - 480g - Demons Lab",
      image: "🧪",
      stock: "Sem estoque",
      price: 169.9,
      variation: "Tutti fruit",
    },
    {
      id: 2,
      name: "Combo Emagrecimento 2 Hot + ShotDry - Max Titanium",
      image: "📦",
      stock: "Sem estoque",
      price: 189.8,
      variations: [
        { name: "Tangerina / Frutas...", stock: "Sem estoque", quantity: 2 },
        { name: "Tangerina / Maracujá", stock: 2, quantity: 2 },
        { name: "Limão / Frutas Vermelhas", stock: "Sem estoque", quantity: 2 },
        { name: "Limão / Maracujá", stock: 2, quantity: 2 },
      ],
    },
    {
      id: 3,
      name: "2 Hot - 200g - Max Titanium",
      image: "🔥",
      stock: 2,
      price: 94.9,
      variations: [
        { name: "Tangerina", stock: 2, quantity: 2 },
        { name: "Limão", stock: 2, quantity: 2 },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Produtos</h1>

        <div style={styles.headerButtons}>
          <button style={styles.button}>
            <Download size={16} />
            Exportar
          </button>

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
            placeholder="Buscar produtos por nome, SKU ou tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <button style={styles.button}>
          <Filter size={16} />
          Filtrar
        </button>
      </div>

      {/* Product count */}
      <div style={styles.productCount}>{products.length} produtos</div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thCheckbox}>
                <input type="checkbox" />
              </th>
              <th style={styles.th}>Produto</th>
              <th style={styles.th}>Estoque</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Variações</th>
              <th style={styles.thActions}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr>
                  <td style={styles.td}>
                    <input type="checkbox" />
                  </td>

                  <td style={styles.td}>
                    <div style={styles.productCell}>
                      <div style={styles.productImage}>{product.image}</div>
                      <span style={styles.productName}>{product.name}</span>
                    </div>
                  </td>

                  <td style={styles.td}>{product.stock}</td>

                  <td style={styles.td}>
                    <div style={styles.priceBox}>
                      R$ {product.price.toFixed(1)}
                    </div>
                  </td>

                  <td style={styles.td}>
                    {product.variation || product.variations?.[0]?.name}
                  </td>

                  <td style={styles.td}>
                    <div style={styles.actionsContainer}>
                      <button style={styles.actionButton}>
                        <FaEdit size={16} />
                      </button>
                      <button style={styles.actionButton}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Variations */}
                {product.variations &&
                  product.variations.slice(1).map((variation, idx) => (
                    <tr key={idx} style={styles.variationRow}>
                      <td style={styles.td}></td>
                      <td style={{ ...styles.td, ...styles.variationCell }}>
                        {variation.name}
                      </td>
                      <td style={styles.td}>{variation.stock}</td>
                      <td style={styles.td}>
                        <div style={styles.variationPriceBox}>
                          R$ {product.price.toFixed(1)}
                        </div>
                      </td>
                      <td style={styles.td}></td>
                      <td style={styles.td}></td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}