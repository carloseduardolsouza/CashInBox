import { useState, useEffect } from "react";
import clientesFetch from "../../services/api/clientesFetch";
import vendaFetch from "../../services/api/vendaFetch";
import { useParams } from "react-router-dom";
import ModalCrediario from "../../components/shared/InfoCrediario";
import format from "../../utils/formatters";
import { useNavigate } from "react-router-dom";

import HeaderBack from "../../components/ui/HeaderBack";

//biblioteca de paginas
import { Tabs, Tab, Box } from "@mui/material";

//components
import InformacoesGerais from "./Components/InformacoesGerais";
import Table from "../../components/ui/tabelas/Table";
import Loading from "../../components/layout/Loading";

const styles = {
  DetalhesCliente: {
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

const HistoricoCompras = ({ vendas }) => {
  const columns = [
    { header: "Desconto", key: "desconto" },
    { header: "Acréscimos", key: "acrescimos" },
    { header: "Total", key: "total" },
    { header: "Status", key: "status" },
    { header: "Data", key: "data" },
  ];

  const navigate = useNavigate();

  const actions = [
    {
      label: "Detalhes",
      type: "details",
      onClick: (row, index) => {
        navigate(`/vendas/detalhes/${row.id_venda}`);
      },
    },
  ];

  return (
    <div style={styles.ContainerGeral}>
      <Table columns={columns} data={vendas} actions={actions} />
    </div>
  );
};

function DetalhesCliente() {
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [clienteData, setClienteData] = useState({});
  const [dataVendas, setDataVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [crediariosRaw, setCrediariosRaw] = useState([]);
  const [crediariosData, setCrediariosData] = useState([]);
  const [crediarioSelecionado, setCrediarioSelecionado] = useState(null);
  const [modalAberta, setModalAberta] = useState(false);

  const buscarVendasCliente = async () => {
    try {
      const res = await vendaFetch.lista();
      if (!Array.isArray(res)) {
        console.error("Resposta inesperada:", res);
        setDataVendas([]);
        return;
      }

      const vendasCliente = res.filter((e) => e.cliente.id_cliente == id);

      // Formata os dados
      const resFormated = vendasCliente.map((dados) => ({
        id_venda: dados.id_venda,
        desconto: `${format.formatarCurrency(dados.desconto_real)} / ${
          dados.desconto_porcentagem
        } %`,
        acrescimos: `${format.formatarCurrency(dados.acrescimo_real)} / ${
          dados.acrescimo_porcentagem
        } %`,
        total: format.formatarCurrency(dados.valor_liquido),
        status: dados.status,
        data: format.formatDate(dados.data),
      }));

      setDataVendas(resFormated);
    } catch (err) {
      console.error("Erro ao buscar vendas:", err);
    }
  };

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

  const buscarCrediarios = async () => {
    const res = await vendaFetch.listaCrediarios();
    const resCliente = res.filter((e) => e.cliente.id_cliente == id);

    setCrediariosRaw(resCliente);

    const resFormated = resCliente.map((dados) => {
      const parcelasPagas = dados.parcelas.filter((e) => e.status === "Pago");
      return {
        cliente: dados.cliente.nome,
        status: dados.status,
        entrada: format.formatarCurrency(dados.entrada),
        numero_parcelas: dados.numero_parcelas,
        parcelas_pagas: parcelasPagas.length,
        valor_venda: format.formatarCurrency(dados.valor_total),
      };
    });

    setCrediariosData(resFormated);
  };

  useEffect(() => {
    procurarCliente();
    buscarVendasCliente();
    buscarCrediarios();
  }, [id]);

  const abrirModal = (row, index) => {
    setCrediarioSelecionado(crediariosRaw[index]);
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
    setCrediarioSelecionado(null);
  };

  const handlePagarParcela = async (id, valor_pago, data_pagamento) => {
    const dados = {
      valor_pago: valor_pago,
      data_pagamento: data_pagamento,
    };
    await vendaFetch.darBaixaParcela(id, dados);

    // Atualiza apenas a parcela no modal imediatamente
    setCrediarioSelecionado((prev) => ({
      ...prev,
      parcelas: prev.parcelas.map((p) =>
        p.id_parcela === id
          ? { ...p, status: "Pago", data_pagamento: data_pagamento }
          : p
      ),
    }));

    // Recarrega a lista principal
    buscarCrediarios();
  };

  const handleCancelarParcela = async (id) => {
      await vendaFetch.cancelarParela(id);
  
      // Atualiza apenas a parcela no modal imediatamente
      setCrediarioSelecionado((prev) => ({
        ...prev,
        parcelas: prev.parcelas.map((p) =>
          p.id_parcela === id
            ? { ...p, status: "Pendente", data_pagamento: null }
            : p
        ),
      }));
  
      // Recarrega a lista principal
      buscarCrediarios();
    }

  const Pendencias = ({ crediarios }) => {
    const columns = [
      { header: "Valor total de venda", key: "valor_venda" },
      { header: "Valor de entrada", key: "entrada" },
      { header: "Numero de parcelas", key: "numero_parcelas" },
      { header: "Parcelas pagas", key: "parcelas_pagas" },
      { header: "Status", key: "status" },
    ];

    const actions = [
      {
        label: "Detalhes",
        type: "details",
        onClick: abrirModal,
      },
    ];
    return (
      <div style={styles.ContainerGeral}>
        <Table columns={columns} data={crediarios} actions={actions} />

        <ModalCrediario
          crediario={crediarioSelecionado}
          isOpen={modalAberta}
          onClose={fecharModal}
          onPagarParcela={handlePagarParcela}
          onCancelarParcela={handleCancelarParcela}
        />
      </div>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <div style={styles.DetalhesCliente}>
        <HeaderBack route={"/clientes/lista"} title={"Detalhes do Cliente"} />
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label="Informações gerais" sx={styles.TablePages} />
          <Tab label="Histórico de compras" sx={styles.TablePages} />
          <Tab label="Pendencias" sx={styles.TablePages} />
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 && <InformacoesGerais dados={clienteData} />}
          {value === 1 && <HistoricoCompras vendas={dataVendas} />}
          {value === 2 && <Pendencias crediarios={crediariosData} />}
        </Box>
      </div>
    </Box>
  );
}

export default DetalhesCliente;
