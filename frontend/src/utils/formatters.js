const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  // Corrigir o deslocamento
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset());

  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


const formatCPF = (cpf) => {
  if (!cpf) return "";

  // transforma em string
  const str = String(cpf);

  // remove tudo que não for número
  const numeros = str.replace(/\D/g, "");

  // garante que tem 11 dígitos
  if (numeros.length !== 11) return numeros; // ou "" se preferir

  // aplica a máscara
  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};


const formatCNPJ = (cnpj) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

const formatarTelefone = (tel) => {
  if (!tel) return "";
  return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const formatarCEP = (cep) => {
  if (!cep) return "";

  // força pra string e remove tudo que não for número
  const somenteNumeros = String(cep).replace(/\D/g, "");

  if (somenteNumeros.length !== 8) return somenteNumeros; // evita formatar CEP quebrado

  return somenteNumeros.replace(/(\d{5})(\d{3})/, "$1-$2");
};


const formatarCurrency = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

const formatarHora = (data) => {
  return new Date(data).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default {
  formatDate,
  formatCPF,
  formatCNPJ,
  formatarTelefone,
  formatarCEP,
  formatarCurrency,
  formatarHora
};
