import { useState, useEffect } from "react";
import funcionariosFetch from "../../services/api/funcionariosFetch";
import vendaFetch from "../../services/api/vendaFetch";
import { useParams , useNavigate } from "react-router-dom";
import format from "../../utils/formatters"

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

const HistoricoDeVendas = ({dados}) => {
  const [dadosFormated , setDadosFormated] = useState([])

  useEffect(() => {
    const response = dados.map((dados) => {
      return {
        id_venda: dados.id_venda,
        cliente: dados.cliente?.nome || "Cliente desconhecido",
        desconto: `${format.formatarCurrency(dados.desconto_real)} / ${dados.desconto_porcentagem}%`,
        acrescimos: `${format.formatarCurrency(dados.acrescimo_real)} / ${dados.acrescimo_porcentagem}%`,
        total: format.formatarCurrency(dados.valor_liquido),
        status: dados.status,
        data: format.formatDate(dados.data),
      }
    })

    setDadosFormated(response)
  } , [dados])
  const columns = [
    { header: "Cliente", key: "cliente" },
    { header: "Desconto", key: "desconto" },
    { header: "Acréscimos", key: "acrescimos" },
    { header: "Total", key: "total" },
    { header: "Status", key: "status" },
    { header: "Data", key: "data" },
  ];

  const navigate = useNavigate()

  const actions = [
    {
      label: "Detalhes",
      type: "details",
      onClick: (row, index) => {
        navigate(`/vendas/detalhes/${row.id_venda}`)
      },
    },
  ];

  return (
    <div style={styles.ContainerGeral}>
      <Table columns={columns} data={dadosFormated} actions={actions} />
    </div>
  );
};

function DetalhesFuncionario() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [funcionarioData, setFuncionarioData] = useState({});
  const [dataVendas , setDataVendas] = useState([])
  const [loading, setLoading] = useState(true);

  const procurarFuncionario = async () => {
    try {
      setLoading(true);
      const data = await funcionariosFetch.funcionarioID(id);

      setFuncionarioData(data);
    } catch (error) {
      console.error("Erro ao buscar funcionario:", error);
    } finally {
      setLoading(false);
    }
  };

  const procurarVendasFuncionario = async () => {
    try {
      setLoading(true);
      const data = await vendaFetch.lista();

      const response = data.filter((e) => e.vendedor?.id_funcionario == id)

      setDataVendas(response);
    } catch (error) {
      console.error("Erro ao buscar vendas do funcionario:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    procurarFuncionario();
    procurarVendasFuncionario()
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
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 && <InformacoesGerais dados={funcionarioData} />}
          {value === 1 && <HistoricoDeVendas dados={dataVendas}/>}
        </Box>
      </div>
    </Box>
  );
}

export default DetalhesFuncionario;
