import React, { useState } from 'react';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { FiRefreshCw, FiClock, FiMessageSquare, FiBell, FiDollarSign, FiFileText } from 'react-icons/fi';

const AutomacaoWhatsApp = () => {
  const [girando, setGirando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  
  // Estados de configuração
  const [msgAniversario, setMsgAniversario] = useState(true);
  const [timeMsgAniversario, setTimeMsgAniversario] = useState('09:00');
  const [msgMsgAniversario, setMsgMsgAniversario] = useState(
    '🎉 Olá ${nome}! Feliz aniversário! 🎂🎈 Você ganha 10% de desconto na loja só hoje! 🛍🎁 Aproveite! 🥳'
  );
  
  const [msgNotificacao, setMsgNotificacao] = useState(true);
  const [numeroMsgNotificacao, setNumeroMsgNotificacao] = useState('5511999999999');
  
  const [msgCobranca, setMsgCobranca] = useState(false);
  
  const [msgLembreteOrcamento, setMsgLembreteOrcamento] = useState(true);
  const [msgLembreteOrcamentoIntervalo, setMsgLembreteOrcamentoIntervalo] = useState(30);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      marginBottom: '32px',
      maxWidth: '1200px',
      margin: '0 auto 32px'
    },
    pageTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    pageSubtitle: {
      fontSize: '15px',
      color: 'var(--text-muted)',
      marginLeft: '44px'
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    configGrid: {
      display: 'grid',
      gap: '20px'
    },
    configCard: {
      backgroundColor: 'var(--surface-strong)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--surface-border)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid var(--surface-border)'
    },
    cardTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '18px',
      fontWeight: '600',
      color: 'var(--text-primary)'
    },
    iconWrapper: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px'
    },
    switch: {
      position: 'relative',
      width: '48px',
      height: '26px',
      backgroundColor: 'var(--neutral-400)',
      borderRadius: '13px',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    switchActive: {
      backgroundColor: 'var(--primary-color)'
    },
    switchKnob: {
      position: 'absolute',
      top: '3px',
      left: '3px',
      width: '20px',
      height: '20px',
      backgroundColor: 'var(--text-inverse)',
      borderRadius: '50%',
      transition: 'transform 0.3s',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    switchKnobActive: {
      transform: 'translateX(22px)'
    },
    configContent: {
      padding: '20px',
      backgroundColor: 'var(--background-soft)',
      borderRadius: '8px',
      marginTop: '16px'
    },
    configContentHidden: {
      display: 'none'
    },
    inputGroup: {
      marginBottom: '16px'
    },
    inputGroupLast: {
      marginBottom: '0'
    },
    inputLabel: {
      display: 'block',
      fontSize: '13px',
      fontWeight: '500',
      color: 'var(--text-secondary)',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '14px',
      color: 'var(--text-primary)',
      backgroundColor: 'var(--background)',
      border: '1px solid var(--surface-border)',
      borderRadius: '6px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      fontSize: '14px',
      color: 'var(--text-primary)',
      backgroundColor: 'var(--background)',
      border: '1px solid var(--surface-border)',
      borderRadius: '6px',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
      lineHeight: '1.5'
    },
    infoBox: {
      padding: '10px 12px',
      backgroundColor: 'var(--info-100)',
      borderRadius: '6px',
      fontSize: '13px',
      color: 'var(--info-700)',
      marginTop: '12px',
      lineHeight: '1.5'
    },
    actionsBar: {
      position: 'sticky',
      bottom: '24px',
      display: 'flex',
      gap: '12px',
      maxWidth: '1200px',
      margin: '32px auto 0',
      padding: '20px',
      backgroundColor: 'var(--surface-strong)',
      borderRadius: '12px',
      border: '1px solid var(--surface-border)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    button: {
      padding: '12px 24px',
      fontSize: '15px',
      fontWeight: '500',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      justifyContent: 'center',
      transition: 'all 0.2s',
      flex: '1'
    },
    buttonSecondary: {
      backgroundColor: 'var(--surface)',
      color: 'var(--text-primary)',
      border: '1px solid var(--surface-border)',
      flex: '0 0 auto'
    },
    buttonSuccess: {
      backgroundColor: 'var(--success-500)',
      color: 'var(--text-inverse)'
    },
    spinner: {
      animation: 'spin 1s linear infinite'
    },
    cardDescription: {
      fontSize: '14px',
      color: 'var(--text-muted)',
      marginTop: '4px',
      lineHeight: '1.4'
    }
  };

  const handleCumprirRotinas = () => {
    setGirando(true);
    setTimeout(() => {
      setGirando(false);
      alert('✅ Rotinas cumpridas com sucesso!');
    }, 2000);
  };

  const handleSalvar = () => {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      alert('✅ Configurações salvas com sucesso!');
    }, 1500);
  };

  const renderSwitch = (isActive, onClick) => (
    <div 
      onClick={onClick}
      style={{
        ...styles.switch,
        ...(isActive ? styles.switchActive : {})
      }}
    >
      <div 
        style={{
          ...styles.switchKnob,
          ...(isActive ? styles.switchKnobActive : {})
        }}
      />
    </div>
  );

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          input:focus, textarea:focus {
            border-color: var(--primary-color) !important;
          }
          button:not(:disabled):hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
          button:not(:disabled):active {
            transform: translateY(0);
          }
          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}
      </style>

      <div style={styles.header}>
        <h1 style={styles.pageTitle}>
          <FaWhatsapp style={{ color: 'var(--success-500)' }} />
          Automação WhatsApp
        </h1>
        <p style={styles.pageSubtitle}>
          Configure mensagens automáticas e integre seu negócio com WhatsApp
        </p>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.configGrid}>
          
          {/* Mensagem de Aniversário */}
          <div style={styles.configCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>
                  <div style={{ ...styles.iconWrapper, backgroundColor: 'var(--chart-yellow)', color: 'var(--neutral-900)' }}>
                    🎉
                  </div>
                  Mensagem de Aniversário
                </div>
                <p style={styles.cardDescription}>
                  Envie parabéns automáticos aos clientes no dia do aniversário
                </p>
              </div>
              {renderSwitch(msgAniversario, () => setMsgAniversario(!msgAniversario))}
            </div>

            <div style={msgAniversario ? styles.configContent : styles.configContentHidden}>
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  <FiClock style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  Horário de envio
                </label>
                <input
                  type="time"
                  value={timeMsgAniversario}
                  onChange={(e) => setTimeMsgAniversario(e.target.value)}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.inputGroupLast}>
                <label style={styles.inputLabel}>Mensagem personalizada</label>
                <textarea
                  value={msgMsgAniversario}
                  onChange={(e) => setMsgMsgAniversario(e.target.value)}
                  style={styles.textarea}
                  placeholder="Use ${nome} para personalizar com o nome do cliente"
                />
                <div style={styles.infoBox}>
                  💡 Dica: Use <strong>{'${nome}'}</strong> para incluir o nome do cliente na mensagem
                </div>
              </div>
            </div>
          </div>

          {/* Notificações no Celular */}
          <div style={styles.configCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>
                  <div style={{ ...styles.iconWrapper, backgroundColor: 'var(--info-100)', color: 'var(--info-700)' }}>
                    <FiBell />
                  </div>
                  Notificações no Celular
                </div>
                <p style={styles.cardDescription}>
                  Receba alertas importantes sobre seu negócio via WhatsApp
                </p>
              </div>
              {renderSwitch(msgNotificacao, () => setMsgNotificacao(!msgNotificacao))}
            </div>

            <div style={msgNotificacao ? styles.configContent : styles.configContentHidden}>
              <div style={styles.inputGroupLast}>
                <label style={styles.inputLabel}>Número WhatsApp (com DDI e DDD)</label>
                <input
                  type="tel"
                  value={numeroMsgNotificacao}
                  onChange={(e) => setNumeroMsgNotificacao(e.target.value)}
                  style={styles.input}
                  placeholder="5511999999999"
                />
                <div style={styles.infoBox}>
                  📱 Você receberá notificações de novos pedidos, mensagens e eventos importantes
                </div>
              </div>
            </div>
          </div>

          {/* Mensagem de Cobrança */}
          <div style={styles.configCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>
                  <div style={{ ...styles.iconWrapper, backgroundColor: 'var(--warning-100)', color: 'var(--warning-700)' }}>
                    <FiDollarSign />
                  </div>
                  Mensagem de Cobrança
                </div>
                <p style={styles.cardDescription}>
                  Envie lembretes automáticos de pagamento para clientes com pendências
                </p>
              </div>
              {renderSwitch(msgCobranca, () => setMsgCobranca(!msgCobranca))}
            </div>

            {msgCobranca && (
              <div style={styles.configContent}>
                <div style={styles.infoBox}>
                  ⚠️ Mensagens de cobrança serão enviadas automaticamente para clientes com pagamentos atrasados
                </div>
              </div>
            )}
          </div>

          {/* Lembrete de Orçamento */}
          <div style={styles.configCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>
                  <div style={{ ...styles.iconWrapper, backgroundColor: 'var(--chart-purple)', color: 'var(--text-inverse)' }}>
                    <FiFileText />
                  </div>
                  Lembrete de Orçamento
                </div>
                <p style={styles.cardDescription}>
                  Reengaje clientes que receberam orçamento mas não finalizaram a compra
                </p>
              </div>
              {renderSwitch(msgLembreteOrcamento, () => setMsgLembreteOrcamento(!msgLembreteOrcamento))}
            </div>

            <div style={msgLembreteOrcamento ? styles.configContent : styles.configContentHidden}>
              <div style={styles.inputGroupLast}>
                <label style={styles.inputLabel}>Intervalo entre lembretes (dias)</label>
                <input
                  type="number"
                  value={msgLembreteOrcamentoIntervalo}
                  onChange={(e) => setMsgLembreteOrcamentoIntervalo(e.target.value)}
                  style={styles.input}
                  min="1"
                  max="90"
                  placeholder="30"
                />
                <div style={styles.infoBox}>
                  📝 Os clientes receberão um lembrete a cada {msgLembreteOrcamentoIntervalo} dias sobre orçamentos pendentes
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Barra de Ações */}
        <div style={styles.actionsBar}>
          <button
            onClick={handleCumprirRotinas}
            style={{
              ...styles.button,
              ...styles.buttonSecondary
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-border)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
          >
            <FiRefreshCw style={girando ? styles.spinner : {}} />
            Executar Rotinas Agora
          </button>

          <button
            onClick={handleSalvar}
            style={{
              ...styles.button,
              ...styles.buttonSuccess
            }}
            disabled={salvando}
            onMouseOver={(e) => !salvando && (e.currentTarget.style.backgroundColor = 'var(--success-700)')}
            onMouseOut={(e) => !salvando && (e.currentTarget.style.backgroundColor = 'var(--success-500)')}
          >
            <FaCheckCircle />
            {salvando ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutomacaoWhatsApp;