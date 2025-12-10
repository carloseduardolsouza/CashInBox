import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import vendaFetch from "../../services/api/vendaFetch";
import format from "../../utils/formatters"

//components
import Table from "../../components/ui/tabelas/Table";

const styles = {
  Orcamentos: {
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

function OrcamentosVendas() {
  const [orcamentoData, setOrcamentoData] = useState([]);

  const buscarOrcamento = async () => {
    const res = await vendaFetch.listaOrcamento();

    const resFormated = res.map((dados) => {
      return {
        id_venda: dados.id_venda,
        cliente: dados?.cliente?.nome || "Cliente desconhecido",
        desconto: `${format.formatarCurrency(dados.desconto_real)} / ${
          dados.desconto_porcentagem
        } %`,
        acrescimos: `${format.formatarCurrency(dados.acrescimo_real)} / ${
          dados.acrescimo_porcentagem
        } %`,
        total: format.formatarCurrency(dados.valor_liquido),
        status: dados.status,
        data: format.formatDate(dados.data),
      };
    });
    setOrcamentoData(resFormated);
  };

  useEffect(() => {
    buscarOrcamento()
  }, [])

  // Exemplo de uso
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
        navigate(`/vendas/detalhes/${row.id_venda}`);
      },
    },
  ];

  return (
    <div style={styles.Orcamentos}>
      <h2 style={styles.titleHeader}>Histórico de orçamentos</h2>

      <Table columns={columns} data={orcamentoData} actions={actions} />
    </div>
  );
}

export default OrcamentosVendas;
