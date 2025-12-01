import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import MenuLateral from "./components/layout/MenuLateral";
import { useState, useEffect } from "react";

//imports de telas
import Home from "./screens/Home";

//Vendas
import HistoricoVendas from "./screens/Vendas/Historico";
import OrcamentosVendas from "./screens/Vendas/Orcamento";
import CrediariosVendas from "./screens/Vendas/Crediario";

//Clientes
import ListaClientes from "./screens/Clientes/Lista";

//Produtos
import ListaProdutos from "./screens/Produtos/Lista";

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
        <Route path="/" element={<Home theme={theme} setTheme={setTheme}/>} />

        <Route path="/vendas" element={<h1>Vendas</h1>} />
        <Route path="/vendas/historico" element={<HistoricoVendas />} />
        <Route path="/vendas/orcamentos" element={<OrcamentosVendas />} />
        <Route path="/vendas/crediarios" element={<CrediariosVendas />} />

        <Route path="/clientes" element={<h1>Clientes</h1>} />
        <Route path="/clientes/lista" element={<ListaClientes />} />
        <Route path="/clientes/aniversariantes" element={<h1>Clientes</h1>} />
        <Route path="/clientes/mensagens" element={<h1>Clientes</h1>} />

        <Route path="/produtos" element={<h1>Produtos</h1>} />
        <Route path="/produtos/lista" element={<ListaProdutos/>} />
        <Route path="/produtos/categorias" element={<h1>Produtos</h1>} />
        <Route path="/produtos/promocoes" element={<h1>Produtos</h1>} />

        <Route path="/estoque" element={<h1>Produtos</h1>} />
        <Route path="/estoque/inventario" element={<h1>Produtos</h1>} />
        <Route path="/estoque/minimo" element={<h1>Produtos</h1>} />

        <Route path="/contasPagar" element={<h1>Produtos</h1>} />
        <Route path="/contasPagar/lista" element={<h1>Produtos</h1>} />
        <Route path="/contasPagar/pagas" element={<h1>Produtos</h1>} />
        <Route path="/contasPagar/categorias" element={<h1>Produtos</h1>} />

        <Route path="/fluxoDeCaixa" element={<h1>Produtos</h1>} />
        <Route path="/fluxoDeCaixa/movimentacoes" element={<h1>Produtos</h1>} />

        <Route path="/relatorios" element={<h1>Produtos</h1>} />
        <Route path="/relatorios/geral" element={<h1>Produtos</h1>} />
        <Route path="/relatorios/vendas" element={<h1>Produtos</h1>} />
        <Route path="/relatorios/fluxo" element={<h1>Produtos</h1>} />
        <Route path="/relatorios/estoque" element={<h1>Produtos</h1>} />
        <Route path="/relatorios/despesas" element={<h1>Produtos</h1>} />
        <Route path="/relatorios/clientes" element={<h1>Produtos</h1>} />

        <Route path="/funcionarios" element={<h1>Produtos</h1>} />
        <Route path="/funcionarios/lista" element={<h1>Produtos</h1>} />
      </Routes>
    </>
  );
}

export default App;
