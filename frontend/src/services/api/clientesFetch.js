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

export default {
  lista,
};
