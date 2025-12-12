const API_URL = "http://localhost:1122";

const lista = async () => {
  try {
    const res = await fetch(API_URL + "/venda/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    const lista = data.data || data;

    // Todas que não forem orçamento
    const vendas = lista.filter((c) => c.status != "Orçamento");

    return vendas;
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    throw err;
  }
};

const listaOrcamento = async () => {
  try {
    const res = await fetch(API_URL + "/venda/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // Se o backend retorna { success, data }, mantenho isso
    const lista = data.data || data;

    // Filtra a venda certo
    const orecamentos = lista.filter((c) => c.status === "Orçamento");

    return orecamentos || null;
  } catch (err) {
    console.error("Erro ao buscar orçamentos:", err);
    throw err;
  }
};

const listaCrediarios = async () => {
  try {
    const res = await fetch(API_URL + "/venda/lista/crediarios");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    const lista = data.data || data;

    return lista.reverse();
  } catch (err) {
    console.error("Erro ao buscar crediarios:", err);
    throw err;
  }
}

const vendaID = async (id) => {
  try {
    const res = await fetch(API_URL + "/venda/lista");

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();

    // Se o backend retorna { success, data }, mantenho isso
    const lista = data.data || data;

    // Filtra a venda certo
    const venda = lista.find((c) => Number(c.id_venda) === Number(id));

    return venda || null;
  } catch (err) {
    console.error("Erro ao buscar venda por ID:", err);
    throw err;
  }
};

const cadastro = async (dados) => {
  try {
    const res = await fetch(API_URL + "/venda/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao cadastrar venda:", err);
    throw err;
  }
};

const darBaixaParcela = async (id , dados) => {
  try {
    const res = await fetch(API_URL + `/venda/faturar/parcela/${id}`, {
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
    console.error("Erro ao dar baixa na parcela:", err);
    throw err;
  }
}

const amortizarParcela = async (id , dados) => {
  try {
    const res = await fetch(API_URL + `/venda/amortizar/parcela/${id}`, {
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
    console.error("Erro ao amortizar parcelas:", err);
    throw err;
  }
}

const cancelarParela = async (id) => {
  try {
    const res = await fetch(API_URL + `/venda/cancelar/parcela/${id}`, {
      method: "PUT",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Erro HTTP ${res.status}: ${errorText}`);
    }

    return await res.json(); // retorna o JSON da API
  } catch (err) {
    console.error("Erro ao cancelar parcela:", err);
    throw err;
  }
}

const deletar = async (id) => {
  try {
    const res = await fetch(API_URL + `/venda/deletar/${id}`, {
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
    console.error("Erro ao deletar venda:", err);
    throw err;
  }
};

export default {
  lista,
  listaOrcamento,
  listaCrediarios,
  darBaixaParcela,
  amortizarParcela,
  cancelarParela,
  vendaID,
  cadastro,
  deletar,
};
