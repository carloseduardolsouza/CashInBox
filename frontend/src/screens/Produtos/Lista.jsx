import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  const chamarModal = () => {
    console.log("Abrir modal do produto");
  };

  const FallbackImage = () => {
    return <div style={{ ...styles.imageBox, opacity: "0.6" }}>Sem imagem</div>;
  };

  const styles = {
    ListaProdutos: {
      marginLeft: "40px",
      padding: "0 16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      backgroundColor: "var(--background-color)",
      minHeight: "100vh",
    },

    titleHeader: {
      color: "var(--text-primary)",
    },

    inputSearch: {
      marginLeft: "10px",
      borderRadius: "6px",
      padding: "8px",
      width: "260px",
      border: "2px solid var(--neutral-600)",
      fontSize: "15px",
      backgroundColor: "var(--background-soft)",
      color: "var(--text-primary)",
    },

    buttonSearch: {
      border: "none",
      fontSize: "17px",
      cursor: "pointer",
      borderRadius: "6px",
      width: "38px",
      height: "38px",
      marginLeft: "3px",
      color: "var(--text-inverse)",
      backgroundColor: "var(--warning-500)",
    },

    viewListaProdutos: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },

    cardProdutos: {
      width: "600px",
      backgroundColor: "var(--surface)",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "12px",
      display: "flex",
      gap: "10px",
      position: "relative",
      color: "var(--text-primary)",
    },

    imageBox: {
      minWidth: "200px",
      minHeight: "200px",

      backgroundPosition: "center",
      marginRight: "10px",
      cursor: "pointer",
      borderRadius: "10px",

      fontSize: "14px",
      backgroundSize: "cover",
      backgroundColor: "var(--surface-strong)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    detalhesBtn: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      padding: "8px 35px",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px",
      border: "none",
    },
  };

  // Buscar produtos (mock por enquanto)
  useEffect(() => {
    const mockProdutos = [
      {
        id: 1,
        nome: "Whey Protein",
        estoque_atual: 20,
        preco: 99.9,
        image: "1764356583070-airfryer-_1.jpg",
      },
      {
        id: 2,
        nome: "Creatina",
        estoque_atual: 35,
        preco: 69.9,
        image: "",
      },
      {
        id: 3,
        nome: "Air Fryer Wallita 12 Litros",
        estoque_atual: 35,
        preco: 69.9,
        image: "",
      },
    ];

    setProdutos(mockProdutos);
  }, []);

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={styles.ListaProdutos}>
      <h2 style={styles.titleHeader}>Lista de produtos</h2>

      {/* Barra de busca */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          style={styles.inputSearch}
          placeholder="Procurar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <button style={styles.buttonSearch} type="submit">
          <FaSearch />
        </button>
      </form>

      {/* Cards */}
      <div style={styles.viewListaProdutos}>
        {produtosFiltrados.map((prod) => (
          <div key={prod.id} style={styles.cardProdutos}>
            {prod.image ? (
              <div
                onClick={chamarModal}
                style={{
                  ...styles.imageBox,
                  backgroundImage: prod.image
                    ? `url(http://localhost:3322/uploads/${prod.image})`
                    : "none",
                }}
              ></div>
            ) : (
              <FallbackImage />
            )}

            <div>
              <h2>{prod.nome}</h2>
              <strong>Código:</strong>
              <p>{prod.id}</p>

              <strong>Preço:</strong>
              <p>R$ {prod.preco.toFixed(2)}</p>

              <strong>Em Estoque:</strong>
              <p>{prod.estoque_atual} unidades</p>

              <button style={styles.detalhesBtn}>Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;
