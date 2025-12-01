import { Link } from "react-router-dom";

//components
import Table from "../../components/ui/tabelas/Table";

function OrcamentosVendas() {
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
      cliente: "João Silva",
      desconto: 10,
      acrescimos: 5,
      total: 150,
      status: "Orçamento",
      data: "2025-12-01",
    },
    {
      cliente: "Maria Santos",
      desconto: 0,
      acrescimos: 0,
      total: 230,
      status: "Orçamento",
      data: "2025-12-02",
    },
    {
      cliente: "Pedro Costa",
      desconto: 15,
      acrescimos: 0,
      total: 120,
      status: "Orçamento",
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
  }
];

  return (
    <div style={styles.Orcamentos}>
      <h2 style={styles.titleHeader}>Histórico de orçamentos</h2>

      <Table columns={columns} data={data} actions={actions}/>
    </div>
  );
}

export default OrcamentosVendas;
