import { useState, useEffect } from "react";
import vendaFetch from "../../services/api/vendaFetch";
import format from "../../utils/formatters";

//components
import Table from "../../components/ui/tabelas/Table";
import ModalCrediario from "../../components/shared/InfoCrediario";

const styles = {
  Crediarios: {
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
  buttonNovaVenda: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
    padding: "10px 35px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "15px",
    width: "130px",
  },
};

function CrediariosVendas() {
  const [crediariosData, setCrediariosData] = useState([]);
  const [crediariosRaw, setCrediariosRaw] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [crediarioSelecionado, setCrediarioSelecionado] = useState(null);

  const buscarCrediarios = async () => {
    const res = await vendaFetch.listaCrediarios();

    setCrediariosRaw(res);

    const resFormated = res.map((dados) => {
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
    buscarCrediarios();
  }, []);

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

  const columns = [
    { header: "Cliente", key: "cliente" },
    { header: "Valor total da venda", key: "valor_venda" },
    { header: "Valor de entrada", key: "entrada" },
    { header: "Numero de parcelas", key: "numero_parcelas" },
    { header: "Parcelas pagas", key: "parcelas_pagas" },
    { header: "Status", key: "status" },
  ];

  const actions = [
    {
      label: "Info",
      type: "details",
      onClick: abrirModal,
    },
  ];

  return (
    <div style={styles.Crediarios}>
      <h2 style={styles.titleHeader}>Resumo de crediários</h2>

      <Table columns={columns} data={crediariosData} actions={actions} />

      <ModalCrediario
        crediario={crediarioSelecionado}
        isOpen={modalAberta}
        onClose={fecharModal}
        onPagarParcela={handlePagarParcela}
        onCancelarParcela={handleCancelarParcela}
      />
    </div>
  );
}

export default CrediariosVendas;