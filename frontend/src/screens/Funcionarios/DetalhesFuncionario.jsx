import { useState, useEffect } from "react";
import funcionariosFetch from "../../services/api/funcionariosFetch";
import { useParams } from "react-router-dom";

import HeaderBack from "../../components/ui/HeaderBack";

//biblioteca de paginas
import { Tabs, Tab, Box } from "@mui/material";

//components
import InformacoesGerais from "./Components/InformacoesGerais";
import Table from "../../components/ui/tabelas/Table";
import Loading from "../../components/layout/Loading";

const styles = {
  DetalhesFuncionario: {
    marginLeft: "40px",
    padding: "10px",
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
};

const HistoricoDeVendas = () => {
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

function DetalhesFuncionario() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [funcionarioData, setFuncionarioData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const procurarFuncionario = async () => {
      try {
        setLoading(true);
        const data = await funcionariosFetch.funcionarioID(id);
        console.log(data)

        setFuncionarioData(data);
      } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
      } finally {
        setLoading(false);
      }
    };

    procurarFuncionario();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <div style={styles.DetalhesFuncionario}>
        <HeaderBack route={"/funcionarios/lista"} title={"Detalhes do Funcionario"} />
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label="Informações gerais" sx={styles.TablePages} />
          <Tab label="Histórico de vendas" sx={styles.TablePages} />
          <Tab label="Pendencias" sx={styles.TablePages} />
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 && <InformacoesGerais dados={funcionarioData} />}
          {
            // {value === 1 && }
            // {value === 2 && }
          }
        </Box>
      </div>
    </Box>
  );
}

export default DetalhesFuncionario;
