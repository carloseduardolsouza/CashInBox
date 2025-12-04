const formatNome = (nome) => {
  if (!nome) return "";

  return nome
    .toLowerCase()
    .split(" ")
    .filter(p => p.trim() !== "") // evita espaços duplos
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
};

const normalize = (valor) => {
  if (!valor) return "";
  return valor
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " "); // remove espaços duplos
};

module.exports = {
    formatNome,
    normalize
}