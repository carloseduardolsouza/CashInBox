import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clientesFetch from "../../services/api/clientesFetch";
import format from "../../utils/formatters";

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
      backgroundColor: "var(--warning-500)",
    },
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const listaClientes = async () => {
      const clientes = await clientesFetch.lista();

      const clientesFormated = clientes.map((dados) => {
        // Campos do endereço
        const camposEndereco = [
          dados.endereco?.[0]?.bairro,
          dados.endereco?.[0]?.rua,
          dados.endereco?.[0]?.complemento,
          dados.endereco?.[0]?.cidade,
          dados.endereco?.[0]?.estado,
          dados.endereco?.[0]?.pais,
        ];

        // Remove campos nulos e vazios
        const enderecoLimpo = camposEndereco.filter(
          (campo) => campo && campo.trim() !== ""
        );

        // Junta com " - "
        let endereco = enderecoLimpo.join(" - ");

        // Limite de caracteres
        const LIMIT = 40;
        if (endereco.length > LIMIT) {
          endereco = endereco.substring(0, LIMIT) + "...";
        }

        return {
          ...dados,
          cpfCNPJ: format.formatCPF(dados.cpfCNPJ),
          telefone: format.formatarTelefone(dados.telefone),
          endereco,
        };
      });

      setData(clientesFormated.reverse());
    };

    listaClientes();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Exemplo de uso
  const columns = [
    { header: "Nome", key: "nome" },
    { header: "Telefone", key: "telefone" },
    { header: "Endereço", key: "endereco" },
    { header: "CPF/CNPJ", key: "cpfCNPJ" },
    { header: "Email", key: "email" },
  ];

  const navigate = useNavigate();

  const actions = [
    {
      label: "Informações",
      type: "details",
      onClick: (row, index) => {
        navigate(`/clientes/detalhes/${row.id_cliente}`);
      },
    },
  ];

  const filterClientes = (e) => {
    const termo = e.target.value.toLowerCase();
    setSearchTerm(termo);

    if (termo === "") {
      setFilteredData(data);
    } else {
      const clientesFiltrados = data.filter((cliente) =>
        cliente.nome.toLowerCase().includes(termo)
      );
      setFilteredData(clientesFiltrados);
    }
  };

  return (
    <div style={styles.ListaClientes}>
      <h2 style={styles.titleHeader}>Lista de clientes</h2>

      <div>
        <form>
          <Link
            to={"/clientes/cadastro"}
            style={styles.buttonAdicionarCliente}
            type="button"
          >
            +
          </Link>
          <input
            type="text"
            style={styles.inputSearch}
            placeholder="Procurar Cliente..."
            onChange={(e) => {
              filterClientes(e);
            }}
          />
          <button style={styles.buttonSearch} type="button">
            <FaSearch />
          </button>
        </form>
      </div>

      <Table columns={columns} data={filteredData} actions={actions} />
    </div>
  );
}

export default ListaClientes;
