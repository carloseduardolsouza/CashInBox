import { useReducer, useState } from "react";
import {
  FaUserAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaCalendar,
  FaVenusMars,
  FaGlobeAmericas,
  FaCity,
  FaHome,
  FaMailBulk,
} from "react-icons/fa";

const styles = {
  container: {
    minHeight: "100vh",
    background: "var(--background-color)",
  },
  centralizar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "15px",
  },
  main: {
    display: "flex",
    gap: "30px",
    maxWidth: "1200px",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fotoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  foto: {
    width: "220px",
    height: "220px",
    background: "var(--surface)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "80px",
    color: "var(--text-secondary)",
    boxShadow: "0 0px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease",
  },
  fotoHover: {
    transform: "scale(1.05)",
  },
  formContainer: {
    backgroundColor: "var(--surface)",
    padding: "20px 25px",
    maxWidth: "100%",
    borderRadius: "20px",
    boxShadow: "0 0px 10px rgba(0,0,0,0.2)",
    flex: "1",
    minWidth: "320px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "var(--primary-color)",
    marginTop: "25px",
    marginBottom: "15px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "2px solid var(--primary-color)",
    paddingBottom: "8px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  formGridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  formGridThree: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
  },
  formGridFour: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
  },
  inputGroup: {
    position: "relative",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-secondary)",
    marginBottom: "5px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: "15px",
    color: "var(--primary-color)",
    fontSize: "16px",
    zIndex: 1,
  },
  input: {
    width: "100%",
    fontSize: "16px",
    padding: "10px 10px 10px 45px",
    borderRadius: "12px",
    boxSizing: "border-box",
    border: "2px solid var(--surface-border)",
    color: "var(--text-secondary)",
    transition: "all 0.3s ease",
    backgroundColor: "var(--background-soft)",
    outline: "none",
  },
  inputFocus: {
    border: "2px solid var(--primary-color)",
    backgroundColor: "var(-surface)",
    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
  },
  select: {
    width: "100%",
    fontSize: "16px",
    padding: "14px 14px 14px 45px",
    borderRadius: "12px",
    boxSizing: "border-box",
    border: "2px solid var(--surface-border)",
    color: "var(--text-secondary)",
    transition: "all 0.3s ease",
    backgroundColor: "var(--background-soft)",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
  button: {
    padding: "10px 30px",
    borderRadius: "50px",
    fontWeight: "bold",
    fontSize: "15px",
    background: "var(--primary-color)",
    color: "white",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(102, 126, 234, 0.3)",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 20px rgba(102, 126, 234, 0.4)",
  },
};

const initialState = {
  nome: "",
  numero: "",
  cpf: "",
  email: "",
  genero: "",
  nascimento: "",
  pais: "",
  estado: "",
  cidade: "",
  bairro: "",
  rua: "",
  complemento: "",
  cep: "",
};

function formReducer(state, action) {
  if (action.type === "RESET") return initialState;
  return { ...state, [action.name]: action.value };
}

function CadastrarCliente() {
  const [form, dispatch] = useReducer(formReducer, initialState);
  const [focusedField, setFocusedField] = useState(null);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ name, value });
  };

  const cadastrarCliente = () => {
    console.log("Dados do cliente:", form);
    //json para enviar para cadastro do cliente
    const clienteData = {
      nome: form.nome,
      telefone: form.numero,
      email: form.email,
      cpfCNPJ: form.cpf,
      data_nascimento: form.nascimento,
      genero: form.genero,
      endereco: {
        pais: form.pais,
        estado: form.estado,
        cidade: form.cidade,
        bairro: form.bairro,
        rua: form.rua,
        cep: form.cep,
        complemento: form.complemento,
      },
    };
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.centralizar}>
          <div style={styles.main}>
            <div style={styles.fotoContainer}>
              <div
                style={{
                  ...styles.foto,
                  ...(isHoveringPhoto ? styles.fotoHover : {}),
                }}
                onMouseEnter={() => setIsHoveringPhoto(true)}
                onMouseLeave={() => setIsHoveringPhoto(false)}
              >
                <FaUserAlt />
              </div>
            </div>

            <div style={styles.formContainer}>
              <div style={styles.formGrid}>
                <div style={styles.formGridThree}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Nome Completo *</label>
                    <div style={styles.inputWrapper}>
                      <FaUserAlt style={styles.icon} />
                      <input
                        type="text"
                        name="nome"
                        style={{
                          ...styles.input,
                          ...(focusedField === "nome" ? styles.inputFocus : {}),
                        }}
                        value={form.nome}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("nome")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Digite o nome completo"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Telefone *</label>
                    <div style={styles.inputWrapper}>
                      <FaPhone style={styles.icon} />
                      <input
                        type="tel"
                        name="numero"
                        style={{
                          ...styles.input,
                          ...(focusedField === "numero"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.numero}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("numero")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>CPF</label>
                    <div style={styles.inputWrapper}>
                      <FaIdCard style={styles.icon} />
                      <input
                        type="text"
                        name="cpf"
                        style={{
                          ...styles.input,
                          ...(focusedField === "cpf" ? styles.inputFocus : {}),
                        }}
                        value={form.cpf}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("cpf")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.formGridThree}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <div style={styles.inputWrapper}>
                      <FaEnvelope style={styles.icon} />
                      <input
                        type="email"
                        name="email"
                        style={{
                          ...styles.input,
                          ...(focusedField === "email"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="seuemail@exemplo.com"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Gênero *</label>
                    <div style={styles.inputWrapper}>
                      <FaVenusMars style={styles.icon} />
                      <select
                        name="genero"
                        style={{
                          ...styles.select,
                          ...(focusedField === "genero"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.genero}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("genero")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Nascimento</label>
                    <div style={styles.inputWrapper}>
                      <FaCalendar style={styles.icon} />
                      <input
                        type="date"
                        name="nascimento"
                        style={{
                          ...styles.input,
                          ...(focusedField === "nascimento"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.nascimento}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("nascimento")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.sectionTitle}>
                  <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                  Endereço
                </div>

                <div style={styles.formGridFour}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>País</label>
                    <div style={styles.inputWrapper}>
                      <FaGlobeAmericas style={styles.icon} />
                      <input
                        type="text"
                        name="pais"
                        style={{
                          ...styles.input,
                          ...(focusedField === "pais" ? styles.inputFocus : {}),
                        }}
                        value={form.pais}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("pais")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ex: Brasil"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Estado</label>
                    <div style={styles.inputWrapper}>
                      <FaMapMarkerAlt style={styles.icon} />
                      <input
                        type="text"
                        name="estado"
                        style={{
                          ...styles.input,
                          ...(focusedField === "estado"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.estado}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("estado")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ex: São Paulo"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Cidade</label>
                    <div style={styles.inputWrapper}>
                      <FaCity style={styles.icon} />
                      <input
                        type="text"
                        name="cidade"
                        style={{
                          ...styles.input,
                          ...(focusedField === "cidade"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.cidade}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("cidade")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ex: São Paulo"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Bairro</label>
                    <div style={styles.inputWrapper}>
                      <FaHome style={styles.icon} />
                      <input
                        type="text"
                        name="bairro"
                        style={{
                          ...styles.input,
                          ...(focusedField === "bairro"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.bairro}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("bairro")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ex: Centro"
                      />
                    </div>
                  </div>
                </div>

                <div style={styles.formGridThree}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Rua</label>
                    <div style={styles.inputWrapper}>
                      <FaMapMarkerAlt style={styles.icon} />
                      <input
                        type="text"
                        name="rua"
                        style={{
                          ...styles.input,
                          ...(focusedField === "rua" ? styles.inputFocus : {}),
                        }}
                        value={form.rua}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("rua")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ex: Rua das Flores, 123"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Complemento</label>
                    <div style={styles.inputWrapper}>
                      <FaHome style={styles.icon} />
                      <input
                        type="text"
                        name="complemento"
                        style={{
                          ...styles.input,
                          ...(focusedField === "complemento"
                            ? styles.inputFocus
                            : {}),
                        }}
                        value={form.complemento}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("complemento")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Ex: Apto 101"
                      />
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <label style={styles.label}>CEP</label>
                    <div style={styles.inputWrapper}>
                      <FaMailBulk style={styles.icon} />
                      <input
                        type="text"
                        name="cep"
                        style={{
                          ...styles.input,
                          ...(focusedField === "cep" ? styles.inputFocus : {}),
                        }}
                        value={form.cep}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("cep")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.buttonContainer}>
                <button
                  style={{
                    ...styles.button,
                    ...(isHoveringButton ? styles.buttonHover : {}),
                  }}
                  onClick={cadastrarCliente}
                  onMouseEnter={() => setIsHoveringButton(true)}
                  onMouseLeave={() => setIsHoveringButton(false)}
                >
                  Cadastrar Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CadastrarCliente;
