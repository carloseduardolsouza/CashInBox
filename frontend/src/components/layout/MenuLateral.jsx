import { useState, useEffect } from "react";

// Icons
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsGear, BsGearFill } from "react-icons/bs";
import { RiMenu2Fill } from "react-icons/ri";
import { RiMoneyDollarCircleFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaUser, FaRegUser } from "react-icons/fa6";
import { MdSell, MdOutlineSell } from "react-icons/md";
import { BsBox2Fill, BsBox2 } from "react-icons/bs";
import { FaMoneyBill1 } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiCashRegisterFill, PiCashRegisterLight } from "react-icons/pi";
import { MdInsertChartOutlined, MdInsertChart } from "react-icons/md";
import { MdWork , MdWorkOutline } from "react-icons/md";

const MenuLateral = ({ currentPath = "/", onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return currentPath === path;
  };

  // Verifica se alguma subcategoria está ativa
  const hasActiveSubcategory = (item) => {
    if (!item.subcategories) return false;
    return item.subcategories.some(sub => isActive(sub.path));
  };

  // Verifica se a categoria ou alguma subcategoria está ativa
  const isCategoryActive = (item) => {
    return isActive(item.path) || hasActiveSubcategory(item);
  };

  const handleClick = (item) => {
    if (item.subcategories && item.subcategories.length > 0) {
      // Se tem subcategorias, navega para a primeira subcategoria
      if (onNavigate) {
        onNavigate(item.subcategories[0].path);
      }
    } else {
      // Se não tem subcategorias, navega normalmente
      if (onNavigate) {
        onNavigate(item.path);
      }
    }
  };

  const menuItems = [
    {
      path: "/",
      label: "Home",
      iconFilled: GoHomeFill,
      iconOutline: GoHome,
    },
    {
      path: "/vendas",
      label: "Vendas",
      iconFilled: RiMoneyDollarCircleFill,
      iconOutline: RiMoneyDollarCircleLine,
      subcategories: [
        { path: "/vendas/historico", label: "Histórico de vendas" },
        { path: "/vendas/orcamentos", label: "Orçamentos" },
        { path: "/vendas/crediarios", label: "Crediários" }
      ]
    },
    {
      path: "/clientes",
      label: "Clientes",
      iconFilled: FaUser,
      iconOutline: FaRegUser,
      subcategories: [
        { path: "/clientes/lista", label: "Lista de clientes" },
      ]
    },
    {
      path: "/produtos",
      label: "Produtos",
      iconFilled: MdSell,
      iconOutline: MdOutlineSell,
      subcategories: [
        { path: "/produtos/lista", label: "Lista de Produtos" },
        { path: "/produtos/categorias", label: "Categorias" },
      ]
    },
    {
      path: "/estoque",
      label: "Estoque",
      iconFilled: BsBox2Fill,
      iconOutline: BsBox2,
      subcategories: [
        { path: "/estoque/inventario", label: "Inventário" },
        { path: "/estoque/minimo", label: "Estoque Mínimo" }
      ]
    },
    {
      path: "/contasPagar",
      label: "Contas a pagar",
      iconFilled: FaMoneyBill1,
      iconOutline: FaRegMoneyBillAlt,
      subcategories: [
        { path: "/contasPagar/lista", label: "Lista de Contas" },
        { path: "/contasPagar/pagas", label: "Contas pagas" },
        { path: "/contasPagar/categorias", label: "Categorias de Despesa" }
      ]
    },
    {
      path: "/fluxoDeCaixa",
      label: "Caixa",
      iconFilled: PiCashRegisterFill,
      iconOutline: PiCashRegisterLight,
      subcategories: [
        { path: "/fluxoDeCaixa/movimentacoes", label: "Movimentações" }
      ]
    },
    {
      path: "/funcionarios",
      label: "Funcionarios",
      iconFilled: MdWork,
      iconOutline: MdWorkOutline,
      subcategories: [
        { path: "/funcionarios/lista", label: "lista de funcionarios" }
      ]
    },
    {
      path: "/relatorios",
      label: "Relatórios",
      iconFilled: MdInsertChart,
      iconOutline: MdInsertChartOutlined,
      subcategories: [
        { path: "/relatorios/geral", label: "Geral" },
        { path: "/relatorios/vendas", label: "Vendas" },
        { path: "/relatorios/fluxo", label: "Fluxo de Caixa" },
        { path: "/relatorios/estoque", label: "Estoque" },
        { path: "/relatorios/despesas", label: "Despesas" },
        { path: "/relatorios/clientes", label: "Clientes" },
      ]
    },
  ];

  // Estilos
  const styles = {
    menuLateralBoxArea: {
      backgroundColor: 'var(--surface)',
      backdropFilter: 'blur(5px)',
      width: isOpen ? '230px' : '45px',
      height: '100vh',
      position: 'fixed',
      zIndex: 5,
      transition: 'width 0.3s ease-in-out',
    },
    menuLateralBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px',
      marginBottom: '5px',
      fontSize: '13px',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none',
      background: 'transparent',
      width: '100%',
      textAlign: 'left',
    },
    menuLateralBoxOutline: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      marginBottom: '10px',
      fontSize: '13px',
      cursor: 'pointer',
      textDecoration: 'none',
      borderBottom: '2px solid black',
      background: 'transparent',
      width: '100%',
      border: 'none',
    },
    menuText: {
      marginLeft: '5px',
      flex: 1,
      textAlign: 'left',
      textDecoration: 'none',
      color: 'var(--text-primary)',
      fontWeight: 500,
      display: isOpen ? 'block' : 'none',
      opacity: isOpen ? 1 : 0,
      transition: 'opacity 0.19s ease-in-out',
    },
    subcategoryContainer: {
      overflow: 'hidden',
    },
    subcategoryButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 8px 6px 35px',
      marginBottom: '3px',
      fontSize: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none',
      background: 'transparent',
      width: '100%',
      textAlign: 'left',
      color: 'var(--text-primary)',
      opacity: 0.8,
    },
    subcategoryButtonActive: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 8px 6px 35px',
      marginBottom: '3px',
      fontSize: '12px',
      cursor: 'pointer',
      textDecoration: 'none',
      border: 'none',
      background: 'rgba(0, 0, 0, 0.1)',
      width: '100%',
      textAlign: 'left',
      color: 'var(--text-primary)',
      fontWeight: 600,
    },
    iconsMenuLateral: {
      fontSize: '20px',
      color: 'var(--text-primary)',
      flexShrink: 0,
    },
    preferencias: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      marginBottom: '10px',
      fontSize: '13px',
      cursor: 'pointer',
      textDecoration: 'none',
      position: 'absolute',
      bottom: '10px',
      border: 'none',
      background: 'transparent',
      width: '100%',
      textAlign: 'left',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 30px)',
      overflowY: 'auto',
      position: 'relative',
    },
    mainIconContainer: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    },
  };

  return (
    <aside style={styles.menuLateralBoxArea}>
      {/* Menu Toggle Button */}
      <button
        onClick={toggleMenu}
        style={styles.menuLateralBoxOutline}
        aria-label="Toggle menu"
      >
        <RiMenu2Fill style={styles.iconsMenuLateral} />
      </button>

      {/* Menu Items */}
      <nav style={styles.nav}>
        <div style={{ flex: 1 }}>
          {menuItems.map((item) => {
            const categoryActive = isCategoryActive(item);
            const IconComponent = categoryActive ? item.iconFilled : item.iconOutline;
            const hasSubcategories = item.subcategories && item.subcategories.length > 0;

            return (
              <div key={item.path}>
                <button
                  onClick={() => handleClick(item)}
                  style={styles.menuLateralBox}
                >
                  <div style={styles.mainIconContainer}>
                    <IconComponent style={styles.iconsMenuLateral} />
                    <p style={styles.menuText}>{item.label}</p>
                  </div>
                </button>

                {/* Subcategories - aparecem automaticamente quando a categoria está ativa */}
                {hasSubcategories && categoryActive && isOpen && (
                  <div style={styles.subcategoryContainer}>
                    {item.subcategories.map((sub) => (
                      <button
                        key={sub.path}
                        onClick={() => onNavigate && onNavigate(sub.path)}
                        style={isActive(sub.path) ? styles.subcategoryButtonActive : styles.subcategoryButton}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Settings Button (Fixed at Bottom) */}
        <button
          onClick={() => onNavigate && onNavigate("/configuracoes")}
          style={styles.preferencias}
        >
          {isActive("/configuracoes") ? (
            <BsGearFill style={styles.iconsMenuLateral} />
          ) : (
            <BsGear style={styles.iconsMenuLateral} />
          )}
          <p style={styles.menuText}>Preferências</p>
        </button>
      </nav>
    </aside>
  );
};

export default MenuLateral;