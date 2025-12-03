import { useState, useCallback, useMemo, useRef } from "react";
import {
  FaBuilding,
  FaPhone,
  FaIdCard,
  FaMapMarkerAlt,
  FaFileAlt,
  FaKey,
  FaCheck,
  FaExclamationTriangle,
  FaSave,
  FaImage,
} from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";

// Estilos
const styles = {
  container: {
    marginLeft: '44px',
    padding: '24px 16px',
    minHeight: '100vh',
  },
  pageHeader: {
    marginBottom: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: '0',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    margin: '0',
  },
  credentialsButton: {
    padding: '10px 20px',
    background: 'var(--background-soft)',
    color: 'var(--text-primary)',
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  logoSection: {
    background: 'var(--surface-strong)',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid var(--surface-border)',
    position: 'sticky',
    top: '16px',
  },
  logoTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: '0 0 16px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoUploadArea: {
    width: '100%',
    height: '200px',
    border: '2px dashed var(--surface-border)',
    borderRadius: '12px',
    background: 'var(--background-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  uploadIcon: {
    fontSize: '48px',
    color: 'var(--neutral-500)',
    marginBottom: '12px',
  },
  uploadText: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textAlign: 'center',
    lineHeight: '1.4',
    fontWeight: '500',
  },
  logoPreview: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  logoActions: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  logoChangeButton: {
    padding: '10px 20px',
    background: 'var(--primary-color)',
    color: 'var(--text-inverse)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  formSection: {
    background: 'var(--background-color)',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid var(--surface-border)',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: 'var(--text-primary)',
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--surface-border)',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  inputLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  requiredIndicator: {
    color: 'var(--error-500)',
    fontSize: '11px',
  },
  inputWrapper: {
    position: 'relative',
  },
  formInput: {
    width: '100%',
    padding: '12px 40px 12px 14px',
    border: '1px solid var(--surface-border)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    background: 'var(--background-color)',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  },
  formInputInvalid: {
    borderColor: 'var(--error-500)',
    background: 'var(--error-100)',
  },
  inputIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '14px',
    pointerEvents: 'none',
  },
  validationMessage: {
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--error-500)',
  },
  submitSection: {
    marginTop: '24px',
    paddingTop: '16px',
    borderTop: '1px solid var(--surface-border)',
    display: 'flex',
    justifyContent: 'center',
  },
  submitButton: {
    padding: '12px 32px',
    background: 'var(--primary-color)',
    color: 'var(--text-inverse)',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  submitButtonDisabled: {
    background: 'var(--neutral-400)',
    cursor: 'not-allowed',
    opacity: '0.6',
  },
  changesIndicator: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'var(--warning-500)',
    color: 'var(--text-primary)',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: '1000',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  loadingState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    fontSize: '16px',
    color: 'var(--text-muted)',
    background: 'var(--surface-strong)',
    borderRadius: '8px',
    border: '1px solid var(--surface-border)',
  },
  uploadOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    borderRadius: '12px',
    color: 'var(--text-inverse)',
    fontSize: '14px',
    fontWeight: '500',
  },
};

// Configuração dos campos
const FORM_FIELDS = {
  NOME_ESTABELECIMENTO: "nomeEstabelecimento",
  CNPJ: "cnpj",
  TELEFONE: "telefone",
  ENDERECO: "endereco",
  INSCRICAO_ESTADUAL: "inscricaoEstadual",
};

const FIELD_CONFIG = {
  [FORM_FIELDS.NOME_ESTABELECIMENTO]: {
    label: "Nome do Estabelecimento",
    icon: FaBuilding,
    placeholder: "Digite o nome da empresa",
    maxLength: 100,
    minLength: 3,
    type: "text",
  },
  [FORM_FIELDS.TELEFONE]: {
    label: "Telefone",
    icon: FaPhone,
    placeholder: "(00) 00000-0000",
    maxLength: 15,
    minLength: 10,
    type: "tel",
  },
  [FORM_FIELDS.CNPJ]: {
    label: "CNPJ",
    icon: FaIdCard,
    placeholder: "00.000.000/0000-00",
    maxLength: 18,
    minLength: 14,
    type: "text",
  },
  [FORM_FIELDS.ENDERECO]: {
    label: "Endereço da Loja",
    icon: FaMapMarkerAlt,
    placeholder: "Digite o endereço completo",
    maxLength: 200,
    minLength: 10,
    type: "text",
  },
  [FORM_FIELDS.INSCRICAO_ESTADUAL]: {
    label: "Inscrição Estadual",
    icon: FaFileAlt,
    placeholder: "Digite a inscrição estadual",
    maxLength: 20,
    minLength: 5,
    type: "text",
  },
};

const Configuracoes = () => {
  const fileInputRef = useRef(null);

  // Estados consolidados
  const [state, setState] = useState({
    loading: false,
    saving: false,
    uploadingLogo: false,
    logoPreview: null,
    originalData: {
      [FORM_FIELDS.NOME_ESTABELECIMENTO]: "Minha Empresa LTDA",
      [FORM_FIELDS.CNPJ]: "12345678000190",
      [FORM_FIELDS.TELEFONE]: "11987654321",
      [FORM_FIELDS.ENDERECO]: "Rua Exemplo, 123 - Centro",
      [FORM_FIELDS.INSCRICAO_ESTADUAL]: "123456789",
    },
    companyData: {
      [FORM_FIELDS.NOME_ESTABELECIMENTO]: "Minha Empresa LTDA",
      [FORM_FIELDS.CNPJ]: "12345678000190",
      [FORM_FIELDS.TELEFONE]: "11987654321",
      [FORM_FIELDS.ENDERECO]: "Rua Exemplo, 123 - Centro",
      [FORM_FIELDS.INSCRICAO_ESTADUAL]: "123456789",
    },
  });

  // Formatadores
  const formatters = useMemo(
    () => ({
      phone: (value) => {
        const digits = value.replace(/\D/g, "");
        if (digits.length <= 10) {
          return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      },
      cnpj: (value) => {
        const digits = value.replace(/\D/g, "");
        return digits.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5"
        );
      },
      numbersOnly: (value) => value.replace(/\D/g, ""),
    }),
    []
  );

  // Validadores
  const validators = useMemo(
    () => ({
      [FORM_FIELDS.NOME_ESTABELECIMENTO]: (value) => value.trim().length >= 3,
      [FORM_FIELDS.ENDERECO]: (value) => value.trim().length >= 10,
      [FORM_FIELDS.CNPJ]: (value) =>
        formatters.numbersOnly(value).length === 14,
      [FORM_FIELDS.TELEFONE]: (value) =>
        formatters.numbersOnly(value).length >= 10,
      [FORM_FIELDS.INSCRICAO_ESTADUAL]: (value) =>
        formatters.numbersOnly(value).length >= 5,
    }),
    [formatters]
  );

  // Verificar mudanças
  const hasChanges = useMemo(() => {
    return Object.keys(state.companyData).some(
      (key) => state.companyData[key] !== state.originalData[key]
    );
  }, [state.companyData, state.originalData]);

  // Verificar validade
  const isFormValid = useMemo(() => {
    return Object.entries(state.companyData).every(([field, value]) =>
      validators[field] ? validators[field](value) : true
    );
  }, [state.companyData, validators]);

  // Atualizar estado
  const updateState = useCallback((updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Atualizar campo
  const updateField = useCallback((field, value) => {
    setState((prev) => ({
      ...prev,
      companyData: {
        ...prev.companyData,
        [field]: value,
      },
    }));
  }, []);

  // Handlers dos campos
  const fieldHandlers = useMemo(
    () => ({
      [FORM_FIELDS.NOME_ESTABELECIMENTO]: (e) =>
        updateField(FORM_FIELDS.NOME_ESTABELECIMENTO, e.target.value),
      [FORM_FIELDS.ENDERECO]: (e) =>
        updateField(FORM_FIELDS.ENDERECO, e.target.value),
      [FORM_FIELDS.TELEFONE]: (e) =>
        updateField(
          FORM_FIELDS.TELEFONE,
          formatters.numbersOnly(e.target.value)
        ),
      [FORM_FIELDS.CNPJ]: (e) =>
        updateField(FORM_FIELDS.CNPJ, formatters.numbersOnly(e.target.value)),
      [FORM_FIELDS.INSCRICAO_ESTADUAL]: (e) =>
        updateField(
          FORM_FIELDS.INSCRICAO_ESTADUAL,
          formatters.numbersOnly(e.target.value)
        ),
    }),
    [updateField, formatters]
  );

  // Upload de logo
  const handleLogoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Formato inválido. Use PNG, JPG, GIF ou WebP");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Arquivo muito grande. Máximo 5MB");
      return;
    }

    updateState({ uploadingLogo: true });

    const reader = new FileReader();
    reader.onload = (event) => {
      setTimeout(() => {
        updateState({
          logoPreview: event.target?.result,
          uploadingLogo: false,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    };

    reader.readAsDataURL(file);
  }, []);

  // Submit
  const handleSubmit = useCallback(() => {
    if (!isFormValid) {
      alert("Por favor, verifique se todos os campos estão corretos");
      return;
    }

    if (!hasChanges) {
      alert("Nenhuma alteração foi detectada");
      return;
    }

    updateState({ saving: true });

    setTimeout(() => {
      updateState({
        originalData: { ...state.companyData },
        saving: false,
      });
      alert("Dados da empresa atualizados com sucesso! ✅");
    }, 1500);
  }, [isFormValid, hasChanges, state.companyData]);

  // Componente de input
  const InputField = useCallback(
    ({ fieldKey, value }) => {
      const config = FIELD_CONFIG[fieldKey];
      const Icon = config.icon;
      const isValid = validators[fieldKey] ? validators[fieldKey](value) : true;

      let displayValue = value;
      if (fieldKey === FORM_FIELDS.TELEFONE) {
        displayValue = formatters.phone(value);
      } else if (fieldKey === FORM_FIELDS.CNPJ) {
        displayValue = formatters.cnpj(value);
      }

      return (
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>
            <Icon />
            {config.label}
            <span style={styles.requiredIndicator}>*</span>
          </label>
          <div style={styles.inputWrapper}>
            <input
              type={config.type}
              style={{
                ...styles.formInput,
                ...((!isValid) && styles.formInputInvalid),
              }}
              value={displayValue}
              onChange={fieldHandlers[fieldKey]}
              placeholder={config.placeholder}
              maxLength={config.maxLength}
              required
            />
            <div style={styles.inputIcon}>
              {isValid ? (
                <FaCheck color="var(--success-500)" />
              ) : (
                <FaExclamationTriangle color="var(--error-500)" />
              )}
            </div>
          </div>
          {!isValid && (
            <div style={styles.validationMessage}>
              <FaExclamationTriangle />
              Campo obrigatório com formato inválido
            </div>
          )}
        </div>
      );
    },
    [validators, formatters, fieldHandlers]
  );

  if (state.loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingState}>Carregando configurações...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div style={styles.headerTitle}>
          <h1 style={styles.pageTitle}>Configurações Gerais</h1>
          <p style={styles.pageSubtitle}>
            Gerencie as informações da sua empresa
          </p>
        </div>
        <button
          style={styles.credentialsButton}
          onClick={() => alert("Alterar credenciais")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--surface)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--background-soft)";
          }}
        >
          <FaKey />
          Alterar Credenciais
        </button>
      </div>

      <div style={styles.mainContent}>
        {/* Seção do Logo */}
        <div style={styles.logoSection}>
          <h3 style={styles.logoTitle}>
            <FaImage />
            Logo da Empresa
          </h3>

          <label
            htmlFor="logoInput"
            style={{
              ...styles.logoUploadArea,
              ...(state.uploadingLogo && { opacity: 0.7, pointerEvents: 'none' }),
            }}
            onMouseEnter={(e) => {
              if (!state.uploadingLogo) {
                e.currentTarget.style.borderColor = "var(--primary-color)";
                e.currentTarget.style.background = "var(--info-100)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--surface-border)";
              e.currentTarget.style.background = "var(--background-color)";
            }}
          >
            {state.logoPreview ? (
              <img
                src={state.logoPreview}
                alt="Logo da empresa"
                style={styles.logoPreview}
              />
            ) : (
              <>
                <MdAddPhotoAlternate style={styles.uploadIcon} />
                <div style={styles.uploadText}>
                  Clique aqui para
                  <br />
                  adicionar o logo
                </div>
              </>
            )}
            {state.uploadingLogo && (
              <div style={styles.uploadOverlay}>Enviando...</div>
            )}
          </label>

          <input
            ref={fileInputRef}
            id="logoInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleLogoUpload}
            disabled={state.uploadingLogo}
          />

          {state.logoPreview && (
            <div style={styles.logoActions}>
              <button
                type="button"
                style={{
                  ...styles.logoChangeButton,
                  ...(state.uploadingLogo && styles.submitButtonDisabled),
                }}
                onClick={() => fileInputRef.current?.click()}
                disabled={state.uploadingLogo}
                onMouseEnter={(e) => {
                  if (!state.uploadingLogo) {
                    e.currentTarget.style.background = "var(--primary-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--primary-color)";
                }}
              >
                <FaImage />
                Trocar Logo
              </button>
            </div>
          )}
        </div>

        {/* Formulário */}
        <div style={styles.formSection}>
          <h3 style={styles.formTitle}>
            <FaBuilding />
            Dados da Empresa
          </h3>

          <div>
            <div style={styles.formGrid}>
              {Object.keys(FIELD_CONFIG).map((fieldKey) => (
                <InputField
                  key={fieldKey}
                  fieldKey={fieldKey}
                  value={state.companyData[fieldKey]}
                />
              ))}
            </div>

            <div style={styles.submitSection}>
              <button
                onClick={handleSubmit}
                style={{
                  ...styles.submitButton,
                  ...((!hasChanges || !isFormValid || state.saving) && styles.submitButtonDisabled),
                  ...(state.saving && { background: 'var(--success-500)' }),
                }}
                disabled={!hasChanges || !isFormValid || state.saving}
                onMouseEnter={(e) => {
                  if (hasChanges && isFormValid && !state.saving) {
                    e.currentTarget.style.background = "var(--primary-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!state.saving) {
                    e.currentTarget.style.background = "var(--primary-color)";
                  }
                }}
              >
                {state.saving ? (
                  <>Salvando...</>
                ) : (
                  <>
                    <FaSave />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de mudanças */}
      {hasChanges && (
        <div style={styles.changesIndicator}>
          <FaExclamationTriangle />
          Você tem alterações não salvas
        </div>
      )}
    </div>
  );
};

export default Configuracoes;