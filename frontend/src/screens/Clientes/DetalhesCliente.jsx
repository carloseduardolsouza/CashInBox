import { useState, useEffect } from "react";
import clientesFetch from "../../services/api/clientesFetch";
import { useParams } from "react-router-dom";

//biblioteca de paginas
import { Tabs, Tab, Box, CircularProgress } from "@mui/material";

//components
import InformacoesGerais from "./Components/InformacoesGerais";
import Table from "../../components/ui/tabelas/Table";

// Dados simulados
const clienteSimulado = {
  id: 123,
  nome: "Carlos eduardo lourenço de souza",
  cpfCNPJ: "71247814181.0",
  email: "joao.silva@email.com",
  genero: "Masculino",
  telefone: "34999887766",
  data_nascimento: "1990-05-15",
  categoria: 1,
  endereco: {
    pais: "Brasil",
    estado: "Minas Gerais",
    cidade: "Uberlândia",
    bairro: "Centro",
    rua: "Rua das Flores, 123",
    complemento: "Apto 301",
    cep: "38400000",
  },
};

const styles = {
  DetalhesCliente: {
    marginLeft: "40px",
    background: "var(--background-color)",
  },
  TablePages: {
    fontWeight: "600",
    fontSize: "0.95rem",
    textTransform: "none",
    minHeight: "64px",
    color: "var(--text-primary)",
    "&:hover": {
      backgroundColor: "var(--background-soft)",
    },
  },
  TabsContainer: {
    borderBottom: "2px solid #e0e0e0",
    "& .MuiTabs-indicator": {
      height: "3px",
      borderRadius: "3px 3px 0 0",
    },
  },
  ContainerGeral: {
    height: "100vh",
  },
  LoadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    background: "var(--background-color)",
  },
};

const HistoricoCompras = () => {
  const columns = [
    { header: "Desconto", key: "desconto" },
    { header: "Acréscimos", key: "acrescimos" },
    { header: "Total", key: "total" },
    { header: "Status", key: "status" },
    { header: "Data", key: "data" },
  ];

  const data = [
    {
      desconto: 10,
      acrescimos: 5,
      total: 150,
      status: "Pago",
      data: "2025-12-01",
    },
    {
      desconto: 0,
      acrescimos: 0,
      total: 230,
      status: "Pendente",
      data: "2025-12-02",
    },
    {
      desconto: 15,
      acrescimos: 0,
      total: 120,
      status: "Pago",
      data: "2025-12-02",
    },
  ];

  const actions = [
    {
      label: "Detalhes",
      type: "details",
      onClick: (row, index) => {
        console.log(`Exibir detalhes:`, row);
      },
    },
  ];

  return (
    <div style={styles.ContainerGeral}>
      <Table columns={columns} data={data} actions={actions} />
    </div>
  );
};

const Pendencias = () => {
  const columns = [
    { header: "Valor", key: "valor" },
    { header: "Vencimento", key: "vencimento" },
    { header: "Status", key: "status" },
  ];

  const data = [
    {
      valor: 10,
      vencimento: "2025-12-01",
      status: "Pendente",
    },
  ];

  const actions = [
    {
      label: "Faturar",
      type: "faturar",
      onClick: (row, index) => {
        console.log(`Exibir detalhes:`, row);
      },
    },
    {
      label: "Detalhes",
      type: "details",
      onClick: (row, index) => {
        console.log(`Exibir detalhes:`, row);
      },
    },
  ];
  return (
    <div style={styles.ContainerGeral}>
      <Table columns={columns} data={data} actions={actions} />
    </div>
  );
};

function DetalhesCliente() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [clienteData, setClienteData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const procurarCliente = async () => {
      try {
        setLoading(true);
        const data = await clientesFetch.clienteID(id);

        const obj = {
          ...data,
          endereco: data.endereco[0],
        };

        setClienteData(obj);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    procurarCliente();
  }, [id]);

  if (loading) {
    return (
      <Box sx={styles.LoadingContainer}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <div style={styles.DetalhesCliente}>
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label="Informações gerais" sx={styles.TablePages} />
          <Tab label="Histórico de compras" sx={styles.TablePages} />
          <Tab label="Pendencias" sx={styles.TablePages} />
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 && <InformacoesGerais dados={clienteData} />}
          {value === 1 && <HistoricoCompras />}
          {value === 2 && <Pendencias />}
        </Box>
      </div>
    </Box>
  );
}

export default DetalhesCliente;