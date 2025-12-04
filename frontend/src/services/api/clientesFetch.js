const API_URL = "http://localhost:1122";

const lista = async () => {
  try {
    const res = await fetch(API_URL + "/cliente/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    throw err;
  }
};

const clienteID = async (id) => { 
  try {
    const res = await fetch(API_URL + "/cliente/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // Se o backend retorna { success, data }, mantenho isso
    const lista = data.data || data;

    // Filtra o cliente certo
    const cliente = lista.find((c) => Number(c.id_cliente) === Number(id));

    return cliente || null;

  } catch (err) {
    console.error("Erro ao buscar cliente por ID:", err);
    throw err;
  }
};

const cadastro = async (dados) => {
  try {
    const res = await fetch(API_URL + "/cliente/cadastro", {
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
    console.error("Erro ao cadastrar cliente:", err);
    throw err;
  }
};

const deletar = async (id) => {
  try {
    const res = await fetch(API_URL + `/cliente/deletar/${id}`, {
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
    console.error("Erro ao deletar cliente:", err);
    throw err;
  }
};

const editar = async (id , dados) => {
  try {
    const res = await fetch(API_URL + `/cliente/editar/${id}`, {
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
    console.error("Erro ao editar cliente:", err);
    throw err;
  }
};

export default {
  lista,
  clienteID,
  cadastro,
  deletar,
  editar
};
