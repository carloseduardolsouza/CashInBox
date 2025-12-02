const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatCPF = (cpf) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export default {
  formatDate,
  formatCPF,
  formatCNPJ,
  formatarTelefone,
  formatarCEP
};
