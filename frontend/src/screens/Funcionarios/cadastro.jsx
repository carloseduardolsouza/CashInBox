import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import funcionariosFetch from "../../services/api/funcionariosFetch";
import HeaderBack from "../../components/ui/HeaderBack"

const styles = {
  container: {
    minHeight: "100vh",
    marginLeft: "44px",
    backgroundColor: "var(--background-color)",
    padding: "20px",
  },
  formWrapper: {
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "var(--surface-strong)",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "32px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    marginBottom: "24px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-secondary)",
    marginBottom: "8px",
  },
  input: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
  },
  select: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  textarea: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid var(--surface-border)",
    borderRadius: "8px",
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
    outline: "none",
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
  },
  button: {
    padding: "14px 48px",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text-inverse)",
    backgroundColor: "var(--primary-color)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default function CadastroFuncionario() {
  const { adicionarAviso } = useContext(AppContext);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    cpf: "",
    cargo: "",
    data_admissao: "",
    endereco: "",
    data_nascimento: "",
    genero: "",
    observacoes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cadastrarFuncionario = async () => {
    console.log("Dados do funcionário:", formData);
    await funcionariosFetch.cadastro(formData);

    setFormData({
      nome: "",
      telefone: "",
      email: "",
      cpf: "",
      cargo: "",
      data_admissao: "",
      endereco: "",
      data_nascimento: "",
      genero: "",
      observacoes: "",
    });
    adicionarAviso("sucesso", "Funcionário cadastrado com sucesso!");
  };

  return (
    <div style={styles.container}>
      <HeaderBack route={"/funcionarios/lista"} title={"Cadastro de Funcionário"}/>
      <div style={styles.formWrapper}>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              style={styles.input}
              placeholder="Digite o nome completo"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              style={styles.input}
              placeholder="000.000.000-00"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="email@exemplo.com"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              style={styles.input}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Gênero</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
              <option value="prefiro_nao_informar">Prefiro não informar</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cargo</label>
            <select
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Selecione</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Gerente">Gerente</option>
              <option value="Entregador">Entregador</option>
              <option value="Colaborador">Colaborador</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Data de Admissão</label>
            <input
              type="date"
              name="data_admissao"
              value={formData.data_admissao}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.label}>Endereço</label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              style={styles.input}
              placeholder="Digite o endereço completo"
            />
          </div>

          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label style={styles.label}>Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Digite observações adicionais (opcional)"
            />
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={cadastrarFuncionario}
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--primary-color)")
            }
          >
            Cadastrar Funcionário
          </button>
        </div>
      </div>
    </div>
  );
}
