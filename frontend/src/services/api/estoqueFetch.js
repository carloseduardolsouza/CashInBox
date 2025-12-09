// frontend/src/services/api/estoqueFetch.js

const API_URL = "http://localhost:1122";

const estoqueFetch = {
  // Listar todos os produtos
  lista: async () => {
    try {
      const response = await fetch(`${API_URL}/produto/lista`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      }
      throw new Error(data.message || "Erro ao listar produtos");
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      throw error;
    }
  },

  // Buscar produto por ID
  produtoID: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produto/lista`);
      const data = await response.json();
      
      if (data.success) {
        const produto = data.data.find(p => p.id_produto === parseInt(id));
        if (produto) {
          return produto;
        }
        throw new Error("Produto não encontrado");
      }
      throw new Error(data.message || "Erro ao buscar produto");
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    }
  },

  // Cadastrar novo produto
  cadastro: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/produto/cadastro`, {
        method: "POST",
        body: formData,
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

  // 🆕 Adicionar imagens a um produto existente
  adicionarImagens: async (id_produto, files) => {
    try {
      const formData = new FormData();
      formData.append("id_produto", id_produto);
      
      // Adiciona os arquivos
      for (const file of files) {
        formData.append("images", file);
      }

      const response = await fetch(`${API_URL}/produto/imagem/nova`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.data; // Retorna as imagens salvas com seus IDs
      }
      throw new Error(data.message || "Erro ao adicionar imagens");
    } catch (error) {
      console.error("Erro ao adicionar imagens:", error);
      throw error;
    }
  },

  // 🆕 Deletar uma imagem específica
  deletarImagem: async (id_imagem) => {
    try {
      const response = await fetch(`${API_URL}/produto/imagem/deletar/${id_imagem}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao deletar imagem");
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
      throw error;
    }
  },

  deletarVariacao : async (id_variacao) => {
    try {
      const response = await fetch(`${API_URL}/produto/variacao/deletar/${id_variacao}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao deletar variacao");
    } catch (error) {
      console.error("Erro ao deletar variacao:", error);
      throw error;
    }
  },

  // Editar produto (SEM imagens, apenas dados)
  editar: async (id, dadosProduto) => {
    try {
      const response = await fetch(`${API_URL}/produto/editar/${id}`, {
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

  // Deletar produto
  deletar: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produto/deletar/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        return data;
      }
      throw new Error(data.message || "Erro ao deletar produto");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      throw error;
    }
  },

  // Categorias
  listaCategoria: async () => {
    try {
      const response = await fetch(`${API_URL}/produto/categoria/lista`);
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
      const response = await fetch(`${API_URL}/produto/categoria/cadastro`, {
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
      const response = await fetch(`${API_URL}/produto/categoria/editar/${id}`, {
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
      const response = await fetch(`${API_URL}/produto/categoria/deletar/${id}`, {
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
      const response = await fetch(`${API_URL}/produto/subcategoria/cadastro`, {
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
      const response = await fetch(`${API_URL}/produto/subcategoria/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subcategoriaData),
      });

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
      const response = await fetch(`${API_URL}/produto/subcategoria/deletar/${id}`, {
        method: "DELETE",
      });

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

export default estoqueFetch;