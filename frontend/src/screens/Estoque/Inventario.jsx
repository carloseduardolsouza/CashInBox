import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Download, Plus, Trash2 } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import estoqueFetch from "../../services/api/estoqueFetch";
import format from "../../utils/formatters";

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
};

export default function Inventario() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const listarProdutos = async () => {
    const produtosResponsse = await estoqueFetch.lista();
    setProdutos(produtosResponsse);
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  const estoqueCalc = (produto) => {
    let estoque = 0;

    if (produto.variacao.length >= 1) {
      produto.variacao.map((dados) => {
        estoque += dados.estoque;
      });

      return (estoque = 0 ? "Sem estoque" : estoque);
    } else {
      return produto.estoque == 0 ? "Sem estoque" : produto.estoque;
    }
  };

  const getAllImages = useCallback((imagens) => {
    if (!imagens?.length) return [];
    return imagens.map((img) => `http://localhost:1122${img.caminho_arquivo}`);
  }, []);

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
      <div style={styles.productCount}>{produtos.length} produtos</div>

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
              <th style={styles.th}>Preço de custo</th>
              <th style={styles.th}>Margem</th>
              <th style={styles.th}>Preço de venda</th>
              <th style={styles.thActions}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((product) => {
              const imagemProduto = getAllImages(product.images);
              return (
                <React.Fragment key={product.id_produto}>
                  <tr>
                    <td style={styles.td}>
                      <input type="checkbox" />
                    </td>

                    <td style={styles.td}>
                      <div style={styles.productCell}>
                        <div
                          style={{
                            ...styles.productImage,
                            backgroundImage: `url(${imagemProduto[0]})`,
                          }}
                        />
                        <span style={styles.productName}>{product.nome}</span>
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
                          onClick={() => console.log(produtos)}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button style={styles.actionButton}>
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
                          {variation.estoque == 0
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
      </div>
    </div>
  );
}
