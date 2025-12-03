import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MenuLateral from "./components/layout/MenuLateral";
import { useState, useEffect } from "react";

//import de components
import ApiDesconectada from "./components/shared/ApiDesconectada";
import AssinaturaVencida from "./components/shared/AssinaturaVencida";

//imports de telas
import Home from "./screens/Home";

//Funcionarios
import ListaFuncionarios from "./screens/Funcionarios/Lista";

//Vendas
import HistoricoVendas from "./screens/Vendas/Historico";
import OrcamentosVendas from "./screens/Vendas/Orcamento";
import CrediariosVendas from "./screens/Vendas/Crediario";
import DetalhesVenda from "./screens/Vendas/Detalhes";
import PontoDeVenda from "./screens/Vendas/Pdv"

//Clientes
import ListaClientes from "./screens/Clientes/Lista";
import CadastroCliente from "./screens/Clientes/CadastroCliente";
import DetalhesCliente from "./screens/Clientes/DetalhesCliente";

//Caixa
import FluxoCaixa from "./screens/FluxoCaixa"

//Contas
import ListaContas from "./screens/Contas/Lista"
import Categorias from "./screens/Contas/Categorias";
import ContasPagas from "./screens/Contas/ContasPagas";

//Produtos
import ListaProdutos from "./screens/Produtos/Lista";

//Estoque
import Inventario from "./screens/Estoque/Inventario";
import CadastrarProduto from "./screens/Estoque/Cadastro";
import Categoria from "./screens/Estoque/Categoria"

//Configuracoes
import Boletos from "./screens/Configuracoes/Boletos";
import Configuracoes from "./screens/Configuracoes";

//Automação
import Status from "./screens/Automacao/Status"
import ConfiguracoesAutomacao from "./screens/Automacao/Configuracao";

//Relatorios
import RelatorioGeral from "./screens/Relatorios/Geral";
import RelatorioClientes from "./screens/Relatorios/Clientes";
import RelatorioEstoque from "./screens/Relatorios/Estoque";
import RelatorioVendas from "./screens/Relatorios/Vendas";
import RelatorioFluxoCaixa from "./screens/Relatorios/Fluxo";
import RelatorioDespesas from "./screens/Relatorios/Despesas";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    //pega o tema atua no localStorage
    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  return (
    <>
      <MenuLateral
        onNavigate={(path) => navigate(path)}
        currentPath={location.pathname}
      />

      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />

        <Route path="/funcionarios/lista" element={<ListaFuncionarios/>} />

        <Route path="/vendas/historico" element={<HistoricoVendas />} />
        <Route path="/vendas/orcamentos" element={<OrcamentosVendas />} />
        <Route path="/vendas/crediarios" element={<CrediariosVendas />} />
        <Route path="/vendas/detalhes/:id" element={<DetalhesVenda />} />
        <Route path="/vendas/pdv" element={<PontoDeVenda />} />

        <Route path="/clientes/lista" element={<ListaClientes />} />
        <Route path="/clientes/cadastro" element={<CadastroCliente/>} />
        <Route path="/clientes/detalhes/:id" element={<DetalhesCliente/>} />

        <Route path="/produtos/lista" element={<ListaProdutos />} />

        <Route path="/estoque/inventario" element={<Inventario/>} />
        <Route path="/estoque/categorias" element={<Categoria/>} />
        <Route path="/estoque/cadastro" element={<CadastrarProduto/>} />
        <Route path="/estoque/minimo" element={<h1>Produtos</h1>} />

        <Route path="/contasPagar/lista" element={<ListaContas/>} />
        <Route path="/contasPagar/pagas" element={<ContasPagas/>} />
        <Route path="/contasPagar/categorias" element={<Categorias/>} />

        <Route path="/fluxoDeCaixa/movimentacoes" element={<FluxoCaixa/>} />

        <Route path="/automacao/configuracao" element={<ConfiguracoesAutomacao/>} />
        <Route path="/automacao/status" element={<Status/>} />

        <Route path="/relatorios/geral" element={<RelatorioGeral/>} />
        <Route path="/relatorios/vendas" element={<RelatorioVendas/>} />
        <Route path="/relatorios/fluxo" element={<RelatorioFluxoCaixa/>} />
        <Route path="/relatorios/estoque" element={<RelatorioEstoque/>} />
        <Route path="/relatorios/despesas" element={<RelatorioDespesas/>} />
        <Route path="/relatorios/clientes" element={<RelatorioClientes/>} />

        <Route path="/funcionarios" element={<h1>Produtos</h1>} />
        <Route path="/funcionarios/lista" element={<h1>Produtos</h1>} />

        <Route path="/configuracoes" element={<Configuracoes/>} />
        <Route path="/configuracoes/boletos" element={<Boletos/>} />
      </Routes>
    </>
  );
}

export default App;
