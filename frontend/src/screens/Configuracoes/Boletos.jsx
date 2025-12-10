import { GoGear } from "react-icons/go";
import { useState } from "react";
import { FiDownload, FiCreditCard, FiCalendar, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import HeaderBack from "../../components/ui/HeaderBack"

function Boletos() {
  // Dados simulados da API
  const [infoPlanos] = useState({
    plano: "Premium",
    valor: 149.90,
    vencimento_em: "2024-12-15",
    status_pagamento: "Pendente"
  });

  const [dadosLoja] = useState({
    nomeEstabelecimento: "Loja Exemplo LTDA",
    cnpj: "12345678000190"
  });

  const formatarCurrency = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarDataCurta = (data) => {
    if (!data) return "";
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatarCNPJ = (cnpj) => {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const calcularDiasRestantes = (dataVencimento) => {
    if (!dataVencimento) return null;
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento - hoje;
    const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDias;
  };

  const pegarBoleto = () => {
    alert("Gerando boleto...");
  };

  const diasRestantes = calcularDiasRestantes(infoPlanos.vencimento_em);
  const isPago = infoPlanos.status_pagamento === "Pagamento recebido";
  const isVencido = infoPlanos.status_pagamento === "Assinatura vencida";

  const styles = {
    container: {
      marginLeft: "55px",
      padding: "30px",
      maxWidth: "1400px"
    },
    header: {
      marginBottom: "32px"
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      color: "var(--text-primary)",
      marginBottom: "8px"
    },
    subtitle: {
      fontSize: "15px",
      color: "var(--text-muted)",
      marginBottom: "0"
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
      alignItems: "start"
    },
    planCard: {
      background: "linear-gradient(135deg, var(--primary-color), var(--info-500))",
      borderRadius: "16px",
      padding: "28px",
      color: "var(--text-inverse)",
      boxShadow: "0 4px 16px rgba(26, 143, 255, 0.15)"
    },
    dataCard: {
      background: "var(--background)",
      border: "1px solid var(--surface-border)",
      borderRadius: "16px",
      padding: "28px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    infoRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "16px",
      paddingBottom: "16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.15)"
    },
    infoLabel: {
      fontSize: "14px",
      opacity: "0.9"
    },
    infoValue: {
      fontSize: "16px",
      fontWeight: "600"
    },
    daysRemaining: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(255, 255, 255, 0.2)",
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600"
    },
    changePlanLink: {
      display: "inline-block",
      color: "var(--text-inverse)",
      fontSize: "14px",
      fontWeight: "600",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: "8px",
      marginBottom: "20px",
      opacity: "0.95",
      transition: "opacity 0.2s"
    },
    actionsRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      marginTop: "24px"
    },
    downloadButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      background: "var(--text-inverse)",
      color: "var(--primary-color)",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    },
    downloadButtonDisabled: {
      opacity: "0.5",
      cursor: "not-allowed"
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "10px 16px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: "600",
      whiteSpace: "nowrap"
    },
    dataRow: {
      marginBottom: "16px",
      padding: "12px 0",
      borderBottom: "1px solid var(--surface-border)"
    },
    dataLabel: {
      fontSize: "13px",
      color: "var(--text-muted)",
      marginBottom: "4px",
      fontWeight: "500"
    },
    dataValue: {
      fontSize: "15px",
      color: "var(--text-secondary)",
      fontWeight: "500"
    },
    editButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "16px",
      padding: "10px 18px",
      background: "var(--surface-strong)",
      borderRadius: "10px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "600",
      color: "var(--text-secondary)",
      transition: "all 0.2s",
      border: "1px solid var(--surface-border)"
    }
  };

  const getStatusStyle = () => {
    if (isPago) {
      return {
        ...styles.statusBadge,
        background: "var(--success-100)",
        color: "var(--success-700)"
      };
    }
    if (isVencido) {
      return {
        ...styles.statusBadge,
        background: "var(--error-100)",
        color: "var(--error-700)"
      };
    }
    return {
      ...styles.statusBadge,
      background: "var(--warning-100)",
      color: "var(--warning-700)"
    };
  };

  const getStatusIcon = () => {
    if (isPago) return <FiCheckCircle />;
    if (isVencido) return <FiAlertCircle />;
    return <FiAlertCircle />;
  };

  return (
    <div style={styles.container}>
      <HeaderBack route={"/"} title={"Planos e Boletos"}/>
      <div style={styles.header}>
        <p style={styles.subtitle}>
          Gerencie pagamentos, assinaturas e vencimentos dos serviços da CashInBox
        </p>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.planCard}>
          <h3 style={{...styles.cardTitle, color: "var(--text-inverse)"}}>
            <FiCreditCard size={22} />
            Boleto Mensal
          </h3>
          
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Plano Contratado</span>
            <span style={styles.infoValue}>{infoPlanos.plano}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Valor Mensal</span>
            <span style={styles.infoValue}>{formatarCurrency(infoPlanos.valor)}</span>
          </div>

          <div style={{...styles.infoRow, borderBottom: "none"}}>
            <span style={styles.infoLabel}>
              <FiCalendar size={14} style={{verticalAlign: "middle", marginRight: "4px"}} />
              Data de Vencimento
            </span>
            <span style={styles.infoValue}>{formatarDataCurta(infoPlanos.vencimento_em)}</span>
          </div>

          {diasRestantes !== null && diasRestantes >= 0 && (
            <div style={{marginTop: "12px", marginBottom: "12px"}}>
              <span style={styles.daysRemaining}>
                Vence em {diasRestantes} dia{diasRestantes !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <a 
            style={styles.changePlanLink}
            onMouseOver={(e) => e.target.style.opacity = "1"}
            onMouseOut={(e) => e.target.style.opacity = "0.95"}
          >
            Alterar Plano
          </a>

          <div style={styles.actionsRow}>
            <button
              style={{
                ...styles.downloadButton,
                ...(isPago || !infoPlanos.status_pagamento ? styles.downloadButtonDisabled : {})
              }}
              onClick={pegarBoleto}
              disabled={isPago || !infoPlanos.status_pagamento}
              onMouseOver={(e) => !e.target.disabled && (e.target.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
            >
              <FiDownload size={16} />
              Download Boleto
            </button>
            
            <span style={getStatusStyle()}>
              {getStatusIcon()}
              {infoPlanos.status_pagamento || "Sem status"}
            </span>
          </div>
        </div>

        <div style={styles.dataCard}>
          <h3 style={{...styles.cardTitle, color: "var(--text-primary)"}}>
            Dados da Conta
          </h3>
          
          <div style={styles.dataRow}>
            <div style={styles.dataLabel}>Nome do Estabelecimento</div>
            <div style={styles.dataValue}>{dadosLoja.nomeEstabelecimento}</div>
          </div>

          <div style={{...styles.dataRow, borderBottom: "none"}}>
            <div style={styles.dataLabel}>CNPJ</div>
            <div style={styles.dataValue}>
              {dadosLoja?.cnpj ? formatarCNPJ(dadosLoja.cnpj) : "Não informado"}
            </div>
          </div>

          <a
            href="/configurações"
            style={styles.editButton}
            onMouseOver={(e) => {
              e.target.style.background = "var(--surface)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "var(--surface-strong)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <GoGear size={16} />
            Editar Dados
          </a>
        </div>
      </div>
    </div>
  );
}

export default Boletos;