import { useState } from "react";

import AppContext from "./AppContext";
import PropTypes from "prop-types";

export function AppProvider({ children }) {
  const [avisos, setAvisos] = useState([]);
  // Função para adicionar um aviso
  const adicionarAviso = (tipo, texto) => {
    const novoAviso = {
      id: Date.now(), // ID único
      tipo,
      texto,
    };
    setAvisos((prev) => [...prev, novoAviso]);
    
    // Remover automaticamente depois de 5 segundos (opcional)
    setTimeout(() => {
      setAvisos((prev) => prev.filter((a) => a.id !== novoAviso.id));
    }, 10000);
  };
  
  const deletarAviso = (id) => setAvisos((prev) => prev.filter((a) => a.id !== id));
  const valores = {
    adicionarAviso,
    avisos,
    deletarAviso
  };

  return <AppContext.Provider value={valores}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
