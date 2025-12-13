const API_URL = "http://localhost:1122";

const contaFetch = {
  // Listar todos as contas
  lista: async () => {
    try {
      const response = await fetch(`${API_URL}/conta/lista`);
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      throw new Error(data.message || "Erro ao listar contas");
    } catch (error) {
      console.error("Erro ao listar contas:", error);
      throw error;
    }
  },

  // Cadastrar novo produto
  cadastro: async (dados) => {
    try {
      const response = await fetch(`${API_URL}/conta/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao cadastrar produto");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      throw error;
    }
  },

  // Editar conta
  editar: async (id, dadosProduto) => {
    try {
      const response = await fetch(`${API_URL}/conta/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosProduto),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao editar produto");
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      throw error;
    }
  },

  // Deletar conta
  deletar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/conta/deletar/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao deletar conta");
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      throw error;
    }
  },

  pagarConta: async (id , dadosConta) => {
    try {
      const response = await fetch(`${API_URL}/conta/pagar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosConta),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao pagar conta");
    } catch (error) {
      console.error("Erro ao pagar conta:", error);
      throw error;
    }
  },

  // Categorias
  listaCategoria: async () => {
    try {
      const response = await fetch(`${API_URL}/conta/categoria/lista`);
      const data = await response.json();

      if (data.success) {
        return data.data;
      }
      throw new Error(data.message || "Erro ao listar categorias");
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      throw error;
    }
  },

  cadastroCategoria: async (categoriaData) => {
    try {
      const response = await fetch(`${API_URL}/conta/categoria/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaData),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao cadastrar categoria");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      throw error;
    }
  },

  editarCategoria: async (id, categoriaData) => {
    try {
      const response = await fetch(`${API_URL}/conta/categoria/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaData),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao editar categoria");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      throw error;
    }
  },

  deletarCategoria: async (id) => {
    try {
      const response = await fetch(`${API_URL}/conta/categoria/deletar/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao deletar categoria");
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      throw error;
    }
  },

  // Subcategorias
  cadastroSubcategoria: async (subcategoriaData) => {
    try {
      const response = await fetch(`${API_URL}/conta/subcategoria/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subcategoriaData),
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao cadastrar subcategoria");
    } catch (error) {
      console.error("Erro ao cadastrar subcategoria:", error);
      throw error;
    }
  },

  editarSubcategoria: async (id, subcategoriaData) => {
    try {
      const response = await fetch(
        `${API_URL}/conta/subcategoria/editar/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subcategoriaData),
        }
      );

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao editar subcategoria");
    } catch (error) {
      console.error("Erro ao editar subcategoria:", error);
      throw error;
    }
  },

  deletarSubcategoria: async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/conta/subcategoria/deletar/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao deletar subcategoria");
    } catch (error) {
      console.error("Erro ao deletar subcategoria:", error);
      throw error;
    }
  },
};

export default contaFetch;
