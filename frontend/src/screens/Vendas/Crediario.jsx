import { Link } from "react-router-dom";

//components
import Table from "../../components/ui/tabelas/Table";

function CrediariosVendas() {
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

  // Exemplo de uso
  const columns = [
    { header: "Cliente", key: "cliente" },
    { header: "Vencimento", key: "vencimento" },
    { header: "Valor da parcela", key: "valor" },
    { header: "Status", key: "status" },
  ];

  const data = [
    {
      cliente: "João Silva",
      vencimento: "2025-12-01",
      valor: 150,
      status: "Pendente",
    },
    {
      cliente: "Maria Santos",
      vencimento: "2025-12-01",
      valor: 150,
      status: "Pendente",
    },
    {
      cliente: "Pedro Costa",
      vencimento: "2025-12-01",
      valor: 150,
      status: "Pendente",
    },
  ];

  const actions = [
  {
    label: "Dar Baixa",
    type: "faturar",
    onClick: (row, index) => {
      console.log(`Exibir detalhes:`, row);
    },
  }
];

  return (
    <div style={styles.Crediarios}>
      <h2 style={styles.titleHeader}>Resumo de crediários pendentes</h2>

      <Table columns={columns} data={data} actions={actions}/>
    </div>
  );
}

export default CrediariosVendas;
