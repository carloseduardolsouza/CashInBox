import React, { useState, useContext } from "react";
import AppContext from "../../../context/AppContext";
import funcionariosFetch from "../../../services/api/funcionariosFetch";
import {
  FaEdit,
  FaCheckCircle,
  FaUserAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBirthdayCake,
  FaVenusMars,
  FaTimes,
  FaBriefcase,
  FaCalendarAlt,
  FaStickyNote,
} from "react-icons/fa";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "var(--background-color)",
  },
  mainCard: {
    maxWidth: "1200px",
    margin: "0 auto",
    background: "var(--background-soft)",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
  },
  header: {
    background:
      "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)",
    padding: "40px 30px",
    color: "var(--text-secondary)",
    position: "relative",
    overflow: "hidden",
  },
  headerBefore: {
    position: "absolute",
    top: "-50%",
    right: "-10%",
    width: "300px",
    height: "300px",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    background: "var(--text-secondary)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    color: "var(--primary-color)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  headerText: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
  },
  headerSubtitle: {
    margin: 0,
    opacity: 0.95,
    fontSize: "15px",
  },
  content: {
    padding: "35px 30px",
  },
  section: {
    marginBottom: "30px",
  },
  sectionLast: {
    marginBottom: 0,
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "18px",
    fontWeight: "700",
    color: "var(--text-secondary)",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "3px solid var(--primary-color)",
  },
  sectionIcon: {
    fontSize: "20px",
    color: "var(--primary-color)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },
  infoCard: {
    background: "var(--background-soft)",
    border: "2px solid var(--surface-border)",
    borderRadius: "12px",
    padding: "16px",
    transition: "all 0.3s ease",
  },
  infoCardHover: {
    background: "var(--background-soft)",
    border: "2px solid var(--primary-color)",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(26, 143, 255, 0.15)",
    transform: "translateY(-2px)",
    transition: "all 0.3s ease",
  },
  infoCardFull: {
    gridColumn: "1 / -1",
  },
  infoLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    fontWeight: "700",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  labelIcon: {
    fontSize: "14px",
    color: "var(--primary-color)",
  },
  infoValue: {
    fontSize: "16px",
    color: "var(--text-primary)",
    fontWeight: "600",
  },
  infoInput: {
    width: "100%",
    fontSize: "16px",
    padding: "10px 12px",
    border: "2px solid var(--surface-border)",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "var(--background-soft)",
    color: "var(--text-secondary)",
    fontWeight: "500",
    boxSizing: "border-box",
  },
  infoInputFocus: {
    borderColor: "var(--primary-color)",
    boxShadow: "0 0 0 3px rgba(26, 143, 255, 0.1)",
  },
  infoTextarea: {
    width: "100%",
    fontSize: "16px",
    padding: "10px 12px",
    border: "2px solid var(--surface-border)",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "var(--background-soft)",
    color: "var(--text-secondary)",
    fontWeight: "500",
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  actions: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "20px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "180px",
    justifyContent: "center",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)",
    color: "var(--text-secondary)",
    boxShadow: "0 4px 12px rgba(26, 143, 255, 0.3)",
  },
  btnSuccess: {
    background: "linear-gradient(135deg, #28a745 0%, #1d7a34 100%)",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
  },
  btnSecondary: {
    background: "var(--surface)",
    color: "var(--text-primary)",
    border: "2px solid var(--surface-border)",
  },
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
  field,
  type = "text",
  options,
  cardId,
  isEditing,
  hoveredCard,
  focusedInput,
  setHoveredCard,
  setFocusedInput,
  handleChange,
  fullWidth = false,
  isTextarea = false,
}) => (
  <div
    style={{
      ...(hoveredCard === cardId && !isEditing ? styles.infoCardHover : styles.infoCard),
      ...(fullWidth ? styles.infoCardFull : {}),
    }}
    onMouseEnter={() => setHoveredCard(cardId)}
    onMouseLeave={() => setHoveredCard(null)}
  >
    <div style={styles.infoLabel}>
      <Icon style={styles.labelIcon} />
      {label}
    </div>
    {isEditing ? (
      options ? (
        <select
          style={{
            ...styles.infoInput,
            ...(focusedInput === cardId ? styles.infoInputFocus : {}),
          }}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          onFocus={() => setFocusedInput(cardId)}
          onBlur={() => setFocusedInput(null)}
        >
          <option value="">Selecione</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          style={{
            ...styles.infoTextarea,
            ...(focusedInput === cardId ? styles.infoInputFocus : {}),
          }}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          onFocus={() => setFocusedInput(cardId)}
          onBlur={() => setFocusedInput(null)}
          placeholder="Digite observações adicionais (opcional)"
        />
      ) : (
        <input
          style={{
            ...styles.infoInput,
            ...(focusedInput === cardId ? styles.infoInputFocus : {}),
          }}
          type={type}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          onFocus={() => setFocusedInput(cardId)}
          onBlur={() => setFocusedInput(null)}
        />
      )
    ) : (
      <div style={styles.infoValue}>{value || "—"}</div>
    )}
  </div>
);

export default function InformacoesGerais({ dados }) {
  const { adicionarAviso } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState(
    dados || {
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
    }
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const salvarEdicao = async () => {
    const dadosAtualizados = {
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email,
      cpf: formData.cpf,
      cargo: formData.cargo,
      data_admissao: formData.data_admissao,
      endereco: formData.endereco,
      data_nascimento: formData.data_nascimento,
      genero: formData.genero,
      observacoes: formData.observacoes,
    };

    console.log("Dados atualizados:", dadosAtualizados);

    await funcionariosFetch.editar(dados.id_funcionario, dadosAtualizados);

    setIsEditing(false);
    adicionarAviso("sucesso", "Funcionário atualizado com sucesso!");
  };

  const cancelarEdicao = () => {
    setFormData(dados);
    setIsEditing(false);
  };

  const generoOptions = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "outro", label: "Outro" },
    { value: "prefiro_nao_informar", label: "Prefiro não informar" },
  ];

  const cargoOptions = [
    { value: "Vendedor", label: "Vendedor" },
    { value: "Gerente", label: "Gerente" },
    { value: "Entregador", label: "Entregador" },
    { value: "Colaborador", label: "Colaborador" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <div style={styles.header}>
          <div style={styles.headerBefore} />
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <div style={styles.avatar}>
                <FaUserAlt />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.headerTitle}>{formData.nome || "Funcionário"}</h1>
                <p style={styles.headerSubtitle}>
                  {formData.cargo || "Cargo não informado"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <FaUserAlt style={styles.sectionIcon} />
              Informações Pessoais
            </div>
            <div style={styles.grid}>
              <InfoCard
                icon={FaUserAlt}
                label="Nome Completo"
                value={formData.nome}
                field="nome"
                cardId="nome"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
              <InfoCard
                icon={FaIdCard}
                label="CPF"
                value={formData.cpf}
                field="cpf"
                cardId="cpf"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
              <InfoCard
                icon={FaBirthdayCake}
                label="Data de Nascimento"
                value={formData.data_nascimento}
                field="data_nascimento"
                type="date"
                cardId="nascimento"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
              <InfoCard
                icon={FaVenusMars}
                label="Gênero"
                value={formData.genero}
                field="genero"
                options={generoOptions}
                cardId="genero"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <FaPhone style={styles.sectionIcon} />
              Contato
            </div>
            <div style={styles.grid}>
              <InfoCard
                icon={FaPhone}
                label="Telefone"
                value={formData.telefone}
                field="telefone"
                type="tel"
                cardId="telefone"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
              <InfoCard
                icon={FaEnvelope}
                label="E-mail"
                value={formData.email}
                field="email"
                type="email"
                cardId="email"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <FaBriefcase style={styles.sectionIcon} />
              Informações Profissionais
            </div>
            <div style={styles.grid}>
              <InfoCard
                icon={FaBriefcase}
                label="Cargo"
                value={formData.cargo}
                field="cargo"
                options={cargoOptions}
                cardId="cargo"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
              <InfoCard
                icon={FaCalendarAlt}
                label="Data de Admissão"
                value={formData.data_admissao}
                field="data_admissao"
                type="date"
                cardId="admissao"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
              />
            </div>
          </div>

          <div style={{ ...styles.section, ...styles.sectionLast }}>
            <div style={styles.sectionTitle}>
              <FaMapMarkerAlt style={styles.sectionIcon} />
              Endereço e Observações
            </div>
            <div style={styles.grid}>
              <InfoCard
                icon={FaMapMarkerAlt}
                label="Endereço"
                value={formData.endereco}
                field="endereco"
                cardId="endereco"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                fullWidth={true}
              />
              <InfoCard
                icon={FaStickyNote}
                label="Observações"
                value={formData.observacoes}
                field="observacoes"
                cardId="observacoes"
                isEditing={isEditing}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                fullWidth={true}
                isTextarea={true}
              />
            </div>
          </div>

          <div style={styles.actions}>
            {isEditing ? (
              <>
                <button
                  style={{ ...styles.btn, ...styles.btnSuccess }}
                  onClick={salvarEdicao}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 16px rgba(40, 167, 69, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)";
                  }}
                >
                  <FaCheckCircle />
                  Salvar Alterações
                </button>
                <button
                  style={{ ...styles.btn, ...styles.btnSecondary }}
                  onClick={cancelarEdicao}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = "var(--background-soft)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "var(--surface)";
                  }}
                >
                  <FaTimes />
                  Cancelar
                </button>
              </>
            ) : (
              <button
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onClick={() => setIsEditing(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(26, 143, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(26, 143, 255, 0.3)";
                }}
              >
                <FaEdit />
                Editar Informações
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}