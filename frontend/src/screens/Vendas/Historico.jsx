import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//icones
import { FaComputer } from "react-icons/fa6";

//components
import Table from "../../components/ui/tabelas/Table";

function HistoricoVendas() {
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

  // Exemplo de uso
  const columns = [
    { header: "Cliente", key: "cliente" },
    { header: "Desconto", key: "desconto" },
    { header: "Acréscimos", key: "acrescimos" },
    { header: "Total", key: "total" },
    { header: "Status", key: "status" },
    { header: "Data", key: "data" },
  ];

  const data = [
    {
      id: 2,
      cliente: "João Silva",
      desconto: 10,
      acrescimos: 5,
      total: 150,
      status: "Pago",
      data: "2025-12-01",
    },
    {
      id: 2,
      cliente: "Maria Santos",
      desconto: 0,
      acrescimos: 0,
      total: 230,
      status: "Pendente",
      data: "2025-12-02",
    },
    {
      id: 2,
      cliente: "Pedro Costa",
      desconto: 15,
      acrescimos: 0,
      total: 120,
      status: "Pago",
      data: "2025-12-02",
    },
  ];

  const navigate = useNavigate();

  const actions = [
  {
    label: "Detalhes",
    type: "details",
    onClick: (row, index) => {
        navigate(`/vendas/detalhes/${row.id}`);
      },
  }
];

  return (
    <div style={styles.Vendas}>
      <h2 style={styles.titleHeader}>Histórico de vendas</h2>

      <Link to={"/"} style={styles.buttonNovaVenda}>
        <FaComputer /> Nova Venda
      </Link>

      <Table columns={columns} data={data} actions={actions}/>
    </div>
  );
}

export default HistoricoVendas;
