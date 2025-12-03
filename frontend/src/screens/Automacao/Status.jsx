import React, { useState } from 'react';

const Status = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [qrCode, setQrCode] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-connection-demo');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      backgroundColor: 'var(--surface-strong)',
      borderRadius: '12px',
      padding: '40px',
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--surface-border)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '8px'
    },
    subtitle: {
      fontSize: '14px',
      color: 'var(--text-muted)'
    },
    statusContainer: {
      backgroundColor: 'var(--background)',
      borderRadius: '8px',
      padding: '24px',
      textAlign: 'center'
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '16px'
    },
    statusBadgeConnected: {
      backgroundColor: 'var(--success-100)',
      color: 'var(--success-700)'
    },
    statusBadgeDisconnected: {
      backgroundColor: 'var(--error-100)',
      color: 'var(--error-700)'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%'
    },
    statusDotConnected: {
      backgroundColor: 'var(--success-500)'
    },
    statusDotDisconnected: {
      backgroundColor: 'var(--error-500)'
    },
    statusText: {
      fontSize: '18px',
      fontWeight: '500',
      color: 'var(--text-primary)',
      marginBottom: '8px'
    },
    statusSubtext: {
      fontSize: '13px',
      color: 'var(--text-muted)'
    },
    qrContainer: {
      marginTop: '24px',
      textAlign: 'center'
    },
    qrLabel: {
      fontSize: '14px',
      color: 'var(--text-secondary)',
      marginBottom: '16px',
      fontWeight: '500'
    },
    qrImageWrapper: {
      backgroundColor: 'var(--background)',
      padding: '16px',
      borderRadius: '8px',
      display: 'inline-block',
      border: '2px solid var(--surface-border)'
    },
    qrImage: {
      width: '200px',
      height: '200px',
      display: 'block'
    },
    button: {
      marginTop: '24px',
      width: '100%',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonPrimary: {
      backgroundColor: 'var(--primary-color)',
      color: 'var(--text-inverse)'
    },
    buttonSecondary: {
      backgroundColor: 'var(--surface)',
      color: 'var(--text-primary)'
    },
    infoBox: {
      marginTop: '24px',
      padding: '12px 16px',
      backgroundColor: 'var(--info-100)',
      borderRadius: '6px',
      fontSize: '13px',
      color: 'var(--info-700)',
      textAlign: 'left'
    }
  };

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>WhatsApp Bot</h1>
          <p style={styles.subtitle}>Gerenciamento de Conexão</p>
        </div>

        <div style={styles.statusContainer}>
          <div style={{
            ...styles.statusBadge,
            ...(isConnected ? styles.statusBadgeConnected : styles.statusBadgeDisconnected)
          }}>
            <span style={{
              ...styles.statusDot,
              ...(isConnected ? styles.statusDotConnected : styles.statusDotDisconnected)
            }}></span>
            {isConnected ? 'Conectado' : 'Desconectado'}
          </div>

          <h2 style={styles.statusText}>
            {isConnected ? 'Bot Conectado' : 'Bot Desconectado'}
          </h2>
          <p style={styles.statusSubtext}>
            {isConnected 
              ? 'Seu bot está online e pronto para uso' 
              : 'Escaneie o QR Code para conectar'}
          </p>

          {!isConnected && (
            <div style={styles.qrContainer}>
              <p style={styles.qrLabel}>Escaneie com o WhatsApp</p>
              <div style={styles.qrImageWrapper}>
                <img 
                  src={qrCode} 
                  alt="QR Code" 
                  style={styles.qrImage}
                />
              </div>
            </div>
          )}
        </div>

        {!isConnected && (
          <div style={styles.infoBox}>
            <strong>Como conectar:</strong>
            <br />
            1. Abra o WhatsApp no seu celular
            <br />
            2. Toque em Menu → Aparelhos conectados
            <br />
            3. Escaneie o QR Code acima
          </div>
        )}

        <button
          onClick={handleToggleConnection}
          style={{
            ...styles.button,
            ...(isConnected ? styles.buttonSecondary : styles.buttonPrimary)
          }}
          onMouseOver={(e) => {
            if (isConnected) {
              e.target.style.backgroundColor = 'var(--surface-border)';
            } else {
              e.target.style.backgroundColor = 'var(--primary-hover)';
            }
          }}
          onMouseOut={(e) => {
            if (isConnected) {
              e.target.style.backgroundColor = 'var(--surface)';
            } else {
              e.target.style.backgroundColor = 'var(--primary-color)';
            }
          }}
        >
          {isConnected ? 'Desconectar' : 'Simular Conexão'}
        </button>
      </div>
    </div>
  );
};

export default Status;