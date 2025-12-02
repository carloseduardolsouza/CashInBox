import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Icones
import { FaSearch } from "react-icons/fa";

//components
import Table from "../../components/ui/tabelas/Table";

function ListaClientes() {
  const styles = {
    ListaClientes: {
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
      backgroundColor: "var(--background-soft)",
      fontSize: "15px",
    },
    buttonAdicionarCliente: {
      backgroundColor: "var(--primary-color)",
      border: "none",
      height: "35px",
      color: "var(--text-inverse)",
      cursor: "pointer",
      fontWeight: "bold",
      padding: "10px 20px",
      borderRadius: "20px",
      textDecoration: "none",
      fontSize: "15px",
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
        backgroundColor: "var(--warning-500)"
    },
  };

  // Exemplo de uso
  const columns = [
    { header: "Nome", key: "nome" },
    { header: "Telefone", key: "telefone" },
    { header: "Endereço", key: "endereco" },
    { header: "Email", key: "email" },
    { header: "Total em compras", key: "totalCompras" },
  ];

  const data = [
    {
      id: 1,
      nome: "João Silva",
      telefone : "",
      endereco: "",
      email: "",
      totalCompras: 150,
    },
    {
      id: 2,
      nome: "Maria Santos",
      telefone : "",
      endereco: "",
      email: "",
      totalCompras: 230,
    },
    {
      id: 3,
      nome: "Pedro Costa",
      telefone : "",
      endereco: "",
      email: "",
      totalCompras: 120,
    },
  ];

  const navigate = useNavigate();

  const actions = [
    {
      label: "Informações",
      type: "details",
      onClick: (row, index) => {
        navigate(`/clientes/detalhes/${row.id}`);
      },
    },
  ];

  return (
    <div style={styles.ListaClientes}>
      <h2 style={styles.titleHeader}>Lista de clientes</h2>

      <div>
        <form>
          <Link to={"/clientes/cadastro"} style={styles.buttonAdicionarCliente} type="button">
            +
          </Link>
          <input
            type="text"
            style={styles.inputSearch}
            placeholder="Procurar Cliente..."
          />
          <button style={styles.buttonSearch} type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      <Table columns={columns} data={data} actions={actions} />
    </div>
  );
}

export default ListaClientes;
