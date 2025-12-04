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


export default {
  lista,
  clienteID
};
