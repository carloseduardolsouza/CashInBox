import { useState } from "react";

//biblioteca de paginas
import { Tabs, Tab, Box } from "@mui/material";

//components
import InformacoesGerais from "./Components/InformacoesGerais";

// Dados simulados
const clienteSimulado = {
  id: 123,
  nome: "Carlos eduardo lourenço de souza",
  cpf_cnpj: "71247814181",
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
  DetalhesCliente : {
    marginLeft: "40px",
    background: "var(--background-color)"
  }
}

const HistoricoCompras = () => {
  return <div></div>;
};

const Pendencias = () => {
  return <div></div>;
};

function DetalhesCliente() {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <div style={styles.DetalhesCliente}>
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label="Informações gerais" />
          <Tab label="Histórico de compras" />
          <Tab label="Pendencias" />
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 && <InformacoesGerais dados={clienteSimulado} />}
          {value === 1 && <div>Conteúdo da Aba 2</div>}
          {value === 2 && <div>Conteúdo da Aba 3</div>}
        </Box>
      </div>
    </Box>
  );
}

export default DetalhesCliente;
