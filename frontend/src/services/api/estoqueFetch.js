const API_URL = "http://localhost:1122";

const lista = async () => {
  try {
    const res = await fetch(API_URL + "/produto/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    throw err;
  }
};

const produtoID = async (id) => { 
  try {
    const res = await fetch(API_URL + "/produto/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // Se o backend retorna { success, data }, mantenho isso
    const lista = data.data || data;

    // Filtra o produto certo
    const produto = lista.find((c) => Number(c.id_produto) === Number(id));

    return produto || null;

  } catch (err) {
    console.error("Erro ao buscar produto por ID:", err);
    throw err;
  }
};

const cadastro = async (dados) => {
  try {
    const res = await fetch(API_URL + "/produto/cadastro", {
      method: "POST",
      body: dados
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    throw err;
  }
};

const deletar = async (id) => {
  try {
    const res = await fetch(API_URL + `/produto/deletar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    throw err;
  }
};

const editar = async (id , dados) => {
  try {
    const res = await fetch(API_URL + `/produto/editar/${id}`, {
      method: "PUT",
      body: dados
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao editar produto:", err);
    throw err;
  }
};

// Categorias

const listaCategoria = async () => {
  try {
    const res = await fetch(API_URL + "/produto/categoria/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    throw err;
  }
}

const cadastroCategoria = async (dados) => {
  try {
    const res = await fetch(API_URL + "/produto/categoria/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao cadastrar categoria:", err);
    throw err;
  }
}

const editarCategoria = async (id , dados) => {
  try {
    const res = await fetch(API_URL + `/produto/categoria/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao editar categoria:", err);
    throw err;
  }
}

const deletarCategoria = async (id) => {
  try {
    const res = await fetch(API_URL + `/produto/categoria/deletar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Erro ao deletar categoria:", err);
    throw err;
  }
}

// Subcategorias

const cadastroSubCategoria = async (dados) => {
  try {
    const res = await fetch(API_URL + "/produto/subcategoria/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao cadastrar subcategoria:", err);
    throw err;
  }
}

const editarSubcategoria = async (id , dados) => {
  try {
    const res = await fetch(API_URL + `/produto/subcategoria/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao editar subcategoria:", err);
    throw err;
  }
}

const deletarSubcategoria = async (id) => {
  try {
    const res = await fetch(API_URL + `/produto/subcategoria/deletar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Erro ao deletar subcategoria:", err);
    throw err;
  }
}

export default {
  lista,
  produtoID,
  cadastro,
  deletar,
  editar,

  listaCategoria,
  cadastroCategoria,
  editarCategoria,
  deletarCategoria,

  cadastroSubCategoria,
  editarSubcategoria,
  deletarSubcategoria
};
