import { Link , useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import vendaFetch from "../../services/api/vendaFetch"
import format from "../../utils/formatters"

//icones
import { FaComputer } from "react-icons/fa6";

//components
import Table from "../../components/ui/tabelas/Table";

const styles = {
  Vendas: {
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

function HistoricoVendas() {
  const [dataVendas , setDataVendas] = useState([])

  const buscarVendas = async () => {
    const res = await vendaFetch.lista()

    const resFormated = res.map((dados) => {
      return {
      id_venda: dados.id_venda,
      cliente: dados.cliente.nome,
      desconto: `${format.formatarCurrency(dados.desconto_real)} / ${dados.desconto_porcentagem} %`,
      acrescimos: `${format.formatarCurrency(dados.acrescimo_real)} / ${dados.acrescimo_porcentagem} %`,
      total: format.formatarCurrency(dados.valor_liquido),
      status: dados.status,
      data: format.formatDate(dados.data),
    }
    })
    setDataVendas(resFormated)
  }

  useEffect(() => {
    buscarVendas()
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

  const navigate = useNavigate();

  const actions = [
  {
    label: "Detalhes",
    type: "details",
    onClick: (row, index) => {
        navigate(`/vendas/detalhes/${row.id_venda}`);
      },
  }
];

  return (
    <div style={styles.Vendas}>
      <h2 style={styles.titleHeader}>Histórico de vendas</h2>

      <Link to={"/vendas/pdv"} style={styles.buttonNovaVenda}>
        <FaComputer /> Nova Venda
      </Link>

      <Table columns={columns} data={dataVendas} actions={actions}/>
    </div>
  );
}

export default HistoricoVendas;
