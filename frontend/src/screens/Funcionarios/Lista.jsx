import { Link , useNavigate } from "react-router-dom";

import Table from "../../components/ui/tabelas/Table";

//Icones
import { FaSearch } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

function ListaFuncionarios() {
  const styles = {
    container: {
      marginLeft: "44px",
      padding: "10px",
    },
    titleContainer: {
      color: "var(--text-primary)",
      marginBottom: "10px",
    },
    buttonAdicionarFuncionario: {
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
    inputSearch: {
      marginLeft: "10px",
      borderRadius: "6px",
      padding: "8px",
      width: "260px",
      border: "2px solid var(--neutral-600)",
      backgroundColor: "var(--background-soft)",
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
      backgroundColor: "var(--warning-500)",
    },
    formListaFuncionarios : {
        marginBottom: "15px"
    }
  };

  // Exemplo de uso
  const columns = [
    { header: "Nome", key: "nome" },
    { header: "Telefone", key: "telefone" },
    { header: "Email", key: "email" },
    { header: "Nascimento", key: "data_nascimento" },
    { header: "Cargo", key: "cargo" },
    { header: "Comissão d/mês", key: "comissao_mes" },
  ];

  const data = [
    {
      id: 1,
      nome: "João Silva",
      telefone : "",
      email: "",
      data_nascimento: "",
      comissao_mes: 150,
      cargo: "Vendedor"
    },
    {
      id: 2,
      nome: "João Silva",
      telefone : "",
      email: "",
      data_nascimento: "",
      comissao_mes: 150,
      cargo: "Entregador"
    },
    {
      id: 3,
      nome: "João Silva",
      telefone : "(62) 9 9336-2090",
      email: "",
      data_nascimento: "",
      comissao_mes: 150,
      cargo: "Gerente"
    },
  ];

  const navigate = useNavigate();

  const actions = [
    {
      label: <FaCircleInfo />,
      type: "details",
      onClick: (row, index) => {
        navigate(`/clientes/detalhes/${row.id}`);
      },
    },
  ];


  return (
    <div style={styles.container}>
      <h2 style={styles.titleContainer}>Lista de funcionários</h2>

      <form style={styles.formListaFuncionarios}>
        <Link
          to={"/funcionarios/cadastro"}
          style={styles.buttonAdicionarFuncionario}
          type="button"
        >
          +
        </Link>
        <input
          type="text"
          style={styles.inputSearch}
          placeholder="Procurar Funcionario..."
        />
        <button style={styles.buttonSearch} type="submit">
          <FaSearch />
        </button>
      </form>

      <Table columns={columns} data={data} actions={actions} />
    </div>
  );
}

export default ListaFuncionarios;
