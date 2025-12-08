import { Link, useNavigate } from "react-router-dom";
import format from "../../utils/formatters"

import Table from "../../components/ui/tabelas/Table";
import funcionariosFetch from "../../services/api/funcionariosFetch";
import { useState, useEffect } from "react";

//Icones
import { FaSearch } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

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
  formListaFuncionarios: {
    marginBottom: "15px",
  },
};

function ListaFuncionarios() {
  const [funcionarios , setFuncionarios] = useState([])
  // Exemplo de uso
  const columns = [
    { header: "Nome", key: "nome" },
    { header: "Telefone", key: "telefone" },
    { header: "Email", key: "email" },
    { header: "Nascimento", key: "data_nascimento" },
    { header: "Cargo", key: "cargo" },
    { header: "Comissão d/mês", key: "comissao_mes" },
  ];

  const listaFuncionario = async () => {
    const funcionariosResult = await funcionariosFetch.lista()
    setFuncionarios(funcionariosResult)
  }

  useEffect(() => {
    listaFuncionario()
  },[])

  const navigate = useNavigate();

  const actions = [
    {
      label: <FaCircleInfo />,
      type: "details",
      onClick: (row, index) => {
        navigate(`/funcionarios/detalhes/${row.id_funcionario}`);
      },
    },
  ];

  const data = funcionarios.map((dados) => {
    return {
      ...dados,
      telefone: format.formatarTelefone(dados.telefone),
      data_nascimento: format.formatDate(dados.data_nascimento)
    }
  })

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
