import { useState } from "react";
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
} from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import format from "../../../utils/formatters";
import clientesFetch from "../../../services/api/clientesFetch";
import CardConfirmacao from "../../../components/ui/modal/CardConfirmacao";
import { useNavigate } from "react-router-dom";

const styles = {
  mainCard: {
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
    content: '""',
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
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
  successBanner: {
    background: "linear-gradient(135deg, #28a745 0%, #1d7a34 100%)",
    color: "#ffffff",
    padding: "16px 30px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "600",
    animation: "slideDown 0.4s ease",
  },
  content: {
    padding: "35px 30px",
  },
  section: {
    marginBottom: "15px",
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
    marginBottom: "10px",
    paddingBottom: "12px",
    borderBottom: "3px solid var(--primary-color)",
  },
  sectionIcon: {
    fontSize: "20px",
    color: "var(--primary-color)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
    transition: "all 0.3s ease",
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
    width: "90%",
    fontSize: "16px",
    padding: "10px 12px",
    border: "2px solid var(--surface-border)",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "var(--background-soft)",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  infoInputFocus: {
    borderColor: "var(--primary-color)",
    boxShadow: "0 0 0 3px rgba(26, 143, 255, 0.1)",
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
    minWidth: "160px",
    justifyContent: "center",
  },
  btnHover: {
    transform: "translateY(-2px)",
  },
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
  field,
  enderecoField,
  type = "text",
  options,
  cardId,
  editar,
  hoveredCard,
  focusedInput,
  setHoveredCard,
  setFocusedInput,
  handleChange,
  handleEnderecoChange,
}) => (
  <div
    style={
      hoveredCard === cardId && !editar ? styles.infoCardHover : styles.infoCard
    }
    onMouseEnter={() => setHoveredCard(cardId)}
    onMouseLeave={() => setHoveredCard(null)}
  >
    <div style={styles.infoLabel}>
      <Icon style={styles.labelIcon} />
      {label}
    </div>
    {editar ? (
      options ? (
        <select
          style={{
            ...styles.infoInput,
            ...(focusedInput === cardId ? styles.infoInputFocus : {}),
          }}
          value={value}
          onChange={(e) =>
            enderecoField
              ? handleEnderecoChange(enderecoField, e.target.value)
              : handleChange(field, e.target.value)
          }
          onFocus={() => setFocusedInput(cardId)}
          onBlur={() => setFocusedInput(null)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          style={{
            ...styles.infoInput,
            ...(focusedInput === cardId ? styles.infoInputFocus : {}),
          }}
          type={type}
          value={value}
          onChange={(e) =>
            enderecoField
              ? handleEnderecoChange(enderecoField, e.target.value)
              : handleChange(field, e.target.value)
          }
          onFocus={() => setFocusedInput(cardId)}
          onBlur={() => setFocusedInput(null)}
          maxLength={
            type === "tel"
              ? "11"
              : type === "text" && field === "cpfCNPJ"
              ? "11"
              : undefined
          }
        />
      )
    ) : (
      <div style={styles.infoValue}>{value || "—"}</div>
    )}
  </div>
);

const InformacoesGerais = ({ dados }) => {
  const [editar, setEditar] = useState(false);
  const [cliente, setCliente] = useState(dados);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const [modalDelete, setModalDelete] = useState(false);

  const handleChange = (field, value) => {
    setCliente((prev) => ({ ...prev, [field]: value }));
  };

  const handleEnderecoChange = (field, value) => {
    setCliente((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [field]: value },
    }));
  };

  const editarCliente = async () => {
    const clienteData = {
      ...cliente,
      endereco: [
        cliente.endereco
      ]
    }
    console.log(clienteData);
    const res = await clientesFetch.editar(dados.id_cliente , clienteData)
    setEditar(false);
  };

  const cancelarEdicao = () => {
    setCliente(dados);
    setEditar(false);
  };

  const navigate = useNavigate();

  const deletarCliente = async () => {
    const res = await clientesFetch.deletar(dados.id_cliente);
    navigate("/clientes/lista");
  };

  return (
    <div style={styles.container}>
      {modalDelete && (
        <CardConfirmacao
          text={`Deseja confirma a exclusão de:  ${dados.nome} ?`}
          subText={"esses dados não poderam ser recuperados posteriormente"}
          onClose={() => setModalDelete(false)}
          action={deletarCliente}
        />
      )}
      <div style={styles.mainCard}>
        <div style={styles.header}>
          <div style={styles.headerBefore} />
          <div style={styles.headerContent}>
            <div style={styles.avatar}>
              <FaUserAlt />
            </div>
            <div style={styles.headerText}>
              <h1 style={styles.headerTitle}>{cliente.nome}</h1>
              <p style={styles.headerSubtitle}>
                {format.formatCPF(cliente.cpfCNPJ)}
              </p>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.section}>
            <div style={styles.grid}>
              <InfoCard
                icon={FaUserAlt}
                label="Nome Completo"
                value={cliente.nome}
                field="nome"
                cardId="nome"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaIdCard}
                label="CPF"
                value={
                  editar ? cliente.cpfCNPJ : format.formatCPF(cliente.cpfCNPJ)
                }
                field="cpfCNPJ"
                cardId="cpf"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaBirthdayCake}
                label="Data de Nascimento"
                value={
                  editar
                    ? cliente.data_nascimento
                    : format.formatDate(cliente.data_nascimento)
                }
                field="data_nascimento"
                type="date"
                cardId="nascimento"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaVenusMars}
                label="Gênero"
                value={cliente.genero}
                field="genero"
                options={[
                  "Masculino",
                  "Feminino",
                  "Outro",
                  "Prefiro não informar",
                ]}
                cardId="genero"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
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
                value={
                  editar
                    ? cliente.telefone
                    : format.formatarTelefone(cliente.telefone)
                }
                field="telefone"
                type="tel"
                cardId="telefone"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaEnvelope}
                label="E-mail"
                value={cliente.email}
                field="email"
                type="email"
                cardId="email"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
            </div>
          </div>

          <div style={{ ...styles.section, ...styles.sectionLast }}>
            <div style={styles.sectionTitle}>
              <FaMapMarkerAlt style={styles.sectionIcon} />
              Endereço
            </div>
            <div style={styles.grid}>
              <InfoCard
                icon={FaMapMarkerAlt}
                label="CEP"
                value={
                  editar
                    ? cliente.endereco.cep
                    : format.formatarCEP(cliente.endereco.cep)
                }
                enderecoField="cep"
                cardId="cep"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaMapMarkerAlt}
                label="Rua/Logradouro"
                value={cliente.endereco.rua}
                enderecoField="rua"
                cardId="rua"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaMapMarkerAlt}
                label="Bairro"
                value={cliente.endereco.bairro}
                enderecoField="bairro"
                cardId="bairro"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaMapMarkerAlt}
                label="Cidade"
                value={cliente.endereco.cidade}
                enderecoField="cidade"
                cardId="cidade"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaMapMarkerAlt}
                label="Estado"
                value={cliente.endereco.estado}
                enderecoField="estado"
                cardId="estado"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
              <InfoCard
                icon={FaMapMarkerAlt}
                label="Complemento"
                value={cliente.endereco.complemento}
                enderecoField="complemento"
                cardId="complemento"
                editar={editar}
                hoveredCard={hoveredCard}
                focusedInput={focusedInput}
                setHoveredCard={setHoveredCard}
                setFocusedInput={setFocusedInput}
                handleChange={handleChange}
                handleEnderecoChange={handleEnderecoChange}
              />
            </div>
          </div>

          <div style={styles.actions}>
            {editar ? (
              <>
                <button
                  style={{ ...styles.btn, ...styles.btnSuccess }}
                  onClick={editarCliente}
                >
                  <FaCheckCircle />
                  Salvar Alterações
                </button>
                <button
                  style={{ ...styles.btn, ...styles.btnSecondary }}
                  onClick={cancelarEdicao}
                >
                  <FaTimes />
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  style={{ ...styles.btn, ...styles.btnPrimary }}
                  onClick={() => setEditar(true)}
                >
                  <FaEdit />
                  Editar Informações
                </button>
                <button
                  style={{ ...styles.btn, ...styles.btnOutline }}
                  onClick={() => setModalDelete(true)}
                >
                  <MdDeleteOutline />
                  Excluir Cliente
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacoesGerais;
