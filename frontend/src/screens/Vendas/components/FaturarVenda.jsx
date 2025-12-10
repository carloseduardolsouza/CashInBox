import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import AppContext from "../../../context/AppContext";
import format from "../../../utils/formatters";
import {
  FaTrash,
  FaTimes,
  FaCheck,
  FaFileInvoice,
  FaReceipt,
} from "react-icons/fa";
import Select from "react-select";
import clientesFetch from "../../../services/api/clientesFetch";
import funcionariosFetch from "../../../services/api/funcionariosFetch";
import vendaFetch from "../../../services/api/vendaFetch";

const mockConfigCaixa = {
  formas_pagamentos: [
    "Dinheiro",
    "Cartão de Crédito",
    "Cartão de Débito",
    "PIX",
    "Crediário Próprio",
  ],
  limite_desconto: 20,
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "var(--background-color)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "1100px",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    scrollbarWidth: "thin",
    scrollbarColor: "var(--neutral-400) var(--surface)",
  },
  header: {
    padding: "24px 24px 16px",
    borderBottom: "1px solid var(--surface-border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    backgroundColor: "var(--background-color)",
    zIndex: 10,
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "var(--text-primary)",
    margin: 0,
  },
  closeButton: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "var(--error-100)",
    color: "var(--error-700)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    transition: "all 0.2s",
  },
  content: {
    padding: "24px",
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  },
  leftSection: {
    flex: "0 0 360px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  rightSection: {
    flex: "1",
    minWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    backgroundColor: "var(--surface-strong)",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid var(--surface-border)",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-secondary)",
    marginBottom: "16px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  label: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    fontSize: "14px",
    backgroundColor: "var(--background-color)",
    color: "var(--text-primary)",
    transition: "border-color 0.2s",
    outline: "none",
  },
  inputSmall: {
    width: "70px",
    padding: "8px",
    textAlign: "right",
  },
  inputMedium: {
    width: "140px",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--surface-border)",
    fontSize: "14px",
    backgroundColor: "var(--background-color)",
    color: "var(--text-primary)",
    cursor: "pointer",
    width: "100%",
    outline: "none",
  },
  totalDisplay: {
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--primary-color)",
    textAlign: "right",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: "var(--success-500)",
    color: "var(--text-inverse)",
  },
  buttonSecondary: {
    backgroundColor: "var(--primary-color)",
    color: "var(--text-inverse)",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid var(--surface-border)",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 4px",
  },
  th: {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  td: {
    padding: "12px",
    backgroundColor: "var(--background-color)",
    fontSize: "14px",
    color: "var(--text-primary)",
  },
  footer: {
    padding: "20px 24px",
    borderTop: "1px solid var(--surface-border)",
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    position: "sticky",
    bottom: 0,
    backgroundColor: "var(--background-color)",
  },
  alert: {
    backgroundColor: "var(--warning-100)",
    color: "var(--warning-700)",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid var(--warning-500)",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },
  deleteButton: {
    padding: "6px",
    backgroundColor: "transparent",
    border: "none",
    color: "var(--error-500)",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.2s",
  },
};

function FaturarVenda({ onClose, reset, produtos }) {
  const { adicionarAviso } = useContext(AppContext);
  const [configCaixa] = useState(mockConfigCaixa);
  const [venda] = useState(produtos);

  const [valorCompra, setValorCompra] = useState(0);
  const [descontoReais, setDescontoReais] = useState(0);
  const [descontoPorcentagem, setDescontoPorcentagem] = useState(0);
  const [acrescimoReais, setAcrescimoReais] = useState(0);
  const [acrescimoPorcentagem, setAcrescimoPorcentagem] = useState(0);
  const [totalPagar, setTotalPagar] = useState(0);

  const [formaPagementoAtual, setFormaPagementoAtual] = useState("Dinheiro");
  const [valorSendoPago, setValorSendoPago] = useState(0);
  const [formaPagemento, setFormaPagamento] = useState([]);
  const [faltaPagar, setFaltaPagar] = useState(0);
  const [troco, setTroco] = useState(0);

  const [id_cliente, setId_cliente] = useState("");
  const [id_vendedor, setId_vendedor] = useState("");

  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);

  const buscarClientes = async () => {
    const clientes = await clientesFetch.lista();
    setClientes(clientes);
  };

  const buscarFuncionarios = async () => {
    const funcionarios = await funcionariosFetch.lista();
    setVendedores(funcionarios);
  };

  useEffect(() => {
    buscarClientes();
    buscarFuncionarios();
  }, []);

  const [numParcelas, setNumParcelas] = useState(1);
  const [dataPrimeiraParcela, setDataPrimeiraParcela] = useState(() => {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() + 1);
    return hoje.toISOString().split("T")[0];
  });
  const [parcelasGeradas, setParcelasGeradas] = useState([]);
  const [alertaFormaPagamento, setAlertaFormaPagamento] = useState(false);

  const calcularTotais = useCallback(
    (novoDesconto = descontoReais, novoAcrescimo = acrescimoReais) => {
      const total = valorCompra - novoDesconto + novoAcrescimo;
      setTotalPagar(total);
      setFaltaPagar(total);
      setValorSendoPago(total);
    },
    [valorCompra, descontoReais, acrescimoReais]
  );

  const atualizarValores = (campo, valor) => {
    const v = parseFloat(valor) || 0;
    switch (campo) {
      case "descontoReais":
        setDescontoReais(v);
        setDescontoPorcentagem(valorCompra > 0 ? (v / valorCompra) * 100 : 0);
        calcularTotais(v, acrescimoReais);
        break;
      case "descontoPorcentagem":
        const desc = (valorCompra * v) / 100;
        setDescontoPorcentagem(v);
        setDescontoReais(desc);
        calcularTotais(desc, acrescimoReais);
        break;
      case "acrescimoReais":
        setAcrescimoReais(v);
        setAcrescimoPorcentagem(valorCompra > 0 ? (v / valorCompra) * 100 : 0);
        calcularTotais(descontoReais, v);
        break;
      case "acrescimoPorcentagem":
        const acre = (valorCompra * v) / 100;
        setAcrescimoPorcentagem(v);
        setAcrescimoReais(acre);
        calcularTotais(descontoReais, acre);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const total = parseFloat(
      venda.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)
    );

    setValorCompra(total);
    setTotalPagar(total);
    setFaltaPagar(total);
    setValorSendoPago(total);
  }, [venda]);

  const gerarParcelas = () => {
    if (!totalPagar || !numParcelas || !dataPrimeiraParcela) return;

    const valorParcela = +(totalPagar / numParcelas).toFixed(2);
    const base = new Date(dataPrimeiraParcela + "T00:00:00");

    const parcelas = Array.from({ length: Number(numParcelas) }, (_, i) => {
      const vencimento = new Date(base);
      vencimento.setMonth(base.getMonth() + i);
      return {
        numero_parcela: i + 1,
        valor_parcela: valorParcela,
        data_vencimento: vencimento.toISOString().split("T")[0],
      };
    });
    setParcelasGeradas(parcelas);
  };

  const addFormaPagamento = (e) => {
    e.preventDefault();
    if (faltaPagar <= 0) return;
    setAlertaFormaPagamento(false);

    const novaForma = {
      tipo_pagamento: formaPagementoAtual,
      valor: Number(valorSendoPago),
    };
    setFormaPagamento((prev) => [...prev, novaForma]);

    const novoFalta = faltaPagar - Number(valorSendoPago);
    if (novoFalta < 0) {
      setFaltaPagar(0);
      setValorSendoPago(0);
      setTroco(-novoFalta);
    } else {
      setFaltaPagar(novoFalta);
      setValorSendoPago(novoFalta);
    }
  };

  const deletarEstaFormaPagamento = (dados, index) => {
    setFormaPagamento((prev) => prev.filter((_, i) => i !== index));
    setFaltaPagar((prev) => prev + Number(dados.valor));
    setValorSendoPago((prev) => prev + Number(dados.valor));
  };

  const faturarVenda = (tipo) => {
    if (descontoPorcentagem > configCaixa.limite_desconto) {
      adicionarAviso("alert", "Desconto excede o limite permitido");
      return;
    }
    if (
      !formaPagemento.length &&
      tipo === "nota" &&
      formaPagementoAtual !== "Crediário Próprio"
    ) {
      setAlertaFormaPagamento(true);
      return;
    }
    if (formaPagementoAtual === "Crediário Próprio" && !id_cliente) {
      adicionarAviso("alert", "Escolha um cliente para venda no crediário");
      return;
    }
    if (
      formaPagementoAtual === "Crediário Próprio" &&
      parcelasGeradas.length === 0
    ) {
      adicionarAviso("alert", "Gere pelo menos 1 parcela");
      return;
    }

    switch (tipo) {
      case "nota":
        finalizarVenda("venda");
        break;
      case "orcamento":
        finalizarVenda("orcamento");
        break;
    }

    adicionarAviso(
      "sucesso",
      `${tipo === "nota" ? "Nota Fiscal" : "Orçamento"} gerado com sucesso!`
    );
  };

  const finalizarVenda = async (tipo) => {
    const vendaData = {
      data: new Date().toISOString(),
      valor_bruto: valorCompra,
      valor_liquido: totalPagar,
      status: tipo === "venda" ? "Finalizada" : "Orçamento",
      desconto_real: descontoReais,
      desconto_porcentagem: descontoPorcentagem.toFixed(3),
      acrescimo_real: acrescimoReais,
      acrescimo_porcentagem: acrescimoPorcentagem.toFixed(3),
      id_cliente: id_cliente || null,
      id_usuario: null,
      id_funcionario: id_vendedor || null,
      pagamento: formaPagemento.map((dados) => ({
        forma: dados.tipo_pagamento,
        valor: dados.valor,
        data_pagamento: new Date().toISOString(),
      })),
      produtos: venda.map((item) => ({
        id_produto: item.id_produto,
        id_variacao: item.id_variacao,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario,
        subtotal: item.subtotal,
      })),
    };

    const res = await vendaFetch.cadastro(vendaData)

    // Resetar tudo
    reset();
    onClose();
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "var(--background-color)",
      borderColor: "var(--surface-border)",
      padding: "6px",
      width: "450px",
      borderRadius: "12px",
      boxShadow: "none",
      ":hover": {
        borderColor: "var(--surface-border)",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "var(--surface-strong)",
      borderRadius: "10px",
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "var(--text-primary)",
      fontWeight: 600,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "var(--surface-strong)"
        : "transparent",
      color: "var(--text-primary)",
      cursor: "pointer",
    }),
  };

  const optionsClientes = clientes.map((resultClientes) => ({
    value: resultClientes.id_cliente,
    label: resultClientes.nome,
  }));

  const optionsVendedores = vendedores.map((resultVendedores) => ({
    value: resultVendedores.id_funcionario,
    label: resultVendedores.nome,
  }));

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Faturar Venda</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--error-500)";
              e.target.style.color = "var(--text-inverse)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--error-100)";
              e.target.style.color = "var(--error-700)";
            }}
          >
            <FaTimes />
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.leftSection}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Resumo Financeiro</div>

              <div style={styles.row}>
                <span style={styles.label}>Total Bruto:</span>
                <input
                  style={{
                    ...styles.input,
                    ...styles.inputMedium,
                    fontWeight: "600",
                  }}
                  readOnly
                  value={format.formatarCurrency(valorCompra)}
                />
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Desconto:</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    style={{ ...styles.input, ...styles.inputMedium }}
                    type="number"
                    placeholder="0,00"
                    value={descontoReais || ""}
                    onChange={(e) =>
                      atualizarValores("descontoReais", e.target.value)
                    }
                  />
                  <input
                    style={{ ...styles.input, ...styles.inputSmall }}
                    type="number"
                    placeholder="%"
                    value={descontoPorcentagem.toFixed(1) || ""}
                    onChange={(e) =>
                      atualizarValores("descontoPorcentagem", e.target.value)
                    }
                  />
                </div>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Acréscimo:</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    style={{ ...styles.input, ...styles.inputMedium }}
                    type="number"
                    placeholder="0,00"
                    value={acrescimoReais || ""}
                    onChange={(e) =>
                      atualizarValores("acrescimoReais", e.target.value)
                    }
                  />
                  <input
                    style={{ ...styles.input, ...styles.inputSmall }}
                    type="number"
                    placeholder="%"
                    value={acrescimoPorcentagem.toFixed(1) || ""}
                    onChange={(e) =>
                      atualizarValores("acrescimoPorcentagem", e.target.value)
                    }
                  />
                </div>
              </div>

              <div
                style={{
                  ...styles.row,
                  marginTop: "24px",
                  paddingTop: "16px",
                  borderTop: "2px solid var(--surface-border)",
                }}
              >
                <span
                  style={{
                    ...styles.label,
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Total a Pagar:
                </span>
                <div style={styles.totalDisplay}>
                  {format.formatarCurrency(totalPagar)}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.rightSection}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Informações da Venda</div>

              <div style={styles.row}>
                <span style={styles.label}>Cliente:</span>
                <Select
                  styles={customStyles}
                  placeholder="Cliente"
                  options={optionsClientes}
                  onChange={(e) => setId_cliente(e.value)}
                />
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Vendedor:</span>
                <Select
                  styles={customStyles}
                  options={optionsVendedores}
                  placeholder="Vendedor"
                  onChange={(e) => setId_vendedor(e.value)}
                />
              </div>

              <div style={{ marginTop: "20px" }}>
                <form onSubmit={addFormaPagamento}>
                  <div style={styles.row}>
                    <span style={styles.label}>Forma de Pagamento:</span>
                    <select
                      style={{ ...styles.select, flex: 1 }}
                      value={formaPagementoAtual}
                      onChange={(e) => setFormaPagementoAtual(e.target.value)}
                    >
                      {configCaixa.formas_pagamentos.map((forma, i) => (
                        <option key={i} value={forma}>
                          {forma}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formaPagementoAtual === "Crediário Próprio" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "12px",
                        alignItems: "flex-end",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label
                          style={{
                            ...styles.label,
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "12px",
                          }}
                        >
                          Nº Parcelas
                        </label>
                        <input
                          style={{ ...styles.input, width: "80%" }}
                          type="number"
                          min={1}
                          value={numParcelas}
                          onChange={(e) => setNumParcelas(e.target.value)}
                        />
                      </div>
                      <div style={{ flex: 2 }}>
                        <label
                          style={{
                            ...styles.label,
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "12px",
                          }}
                        >
                          Primeiro Vencimento
                        </label>
                        <input
                          style={{ ...styles.input, width: "90%" }}
                          type="date"
                          value={dataPrimeiraParcela}
                          onChange={(e) =>
                            setDataPrimeiraParcela(e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={gerarParcelas}
                        style={{ ...styles.button, ...styles.buttonPrimary }}
                      >
                        Gerar
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "12px",
                      }}
                    >
                      <input
                        style={{ ...styles.input, flex: 1 }}
                        type="number"
                        step="0.01"
                        placeholder="Valor"
                        value={valorSendoPago || ""}
                        onChange={(e) => setValorSendoPago(e.target.value)}
                      />
                      <button
                        type="submit"
                        style={{ ...styles.button, ...styles.buttonPrimary }}
                      >
                        <FaCheck /> Adicionar
                      </button>
                    </div>
                  )}
                </form>

                {alertaFormaPagamento && (
                  <div style={{ ...styles.alert, marginTop: "12px" }}>
                    ⚠️ Adicione pelo menos uma forma de pagamento
                  </div>
                )}
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>
                {formaPagementoAtual === "Crediário Próprio"
                  ? "Parcelas"
                  : "Formas de Pagamento"}
              </div>

              {formaPagementoAtual === "Crediário Próprio" ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Parcela</th>
                      <th style={styles.th}>Vencimento</th>
                      <th style={styles.th}>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parcelasGeradas.map((p, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            ...styles.td,
                            borderRadius: i === 0 ? "8px 0 0 8px" : "0",
                          }}
                        >
                          {p.numero_parcela}ª
                        </td>
                        <td style={styles.td}>
                          {formatarData(p.data_vencimento)}
                        </td>
                        <td
                          style={{
                            ...styles.td,
                            borderRadius:
                              i === parcelasGeradas.length - 1
                                ? "0 8px 8px 0"
                                : "0",
                            fontWeight: "600",
                          }}
                        >
                          {format.formatarCurrency(p.valor_parcela)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Tipo</th>
                        <th style={styles.th}>Valor</th>
                        <th style={{ ...styles.th, width: "50px" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formaPagemento.map((p, i) => (
                        <tr key={i}>
                          <td
                            style={{
                              ...styles.td,
                              borderRadius: "8px 0 0 8px",
                            }}
                          >
                            {p.tipo_pagamento}
                          </td>
                          <td style={{ ...styles.td, fontWeight: "600" }}>
                            {format.formatarCurrency(p.valor)}
                          </td>
                          <td
                            style={{
                              ...styles.td,
                              borderRadius: "0 8px 8px 0",
                              textAlign: "center",
                            }}
                          >
                            <button
                              style={styles.deleteButton}
                              onClick={() => deletarEstaFormaPagamento(p, i)}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor =
                                  "var(--error-100)")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginTop: "16px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ ...styles.label, marginBottom: "6px" }}>
                        Falta Pagar
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color:
                            faltaPagar > 0
                              ? "var(--error-500)"
                              : "var(--success-500)",
                        }}
                      >
                        {format.formatarCurrency(faltaPagar)}
                      </div>
                    </div>
                    <div>
                      <div style={{ ...styles.label, marginBottom: "6px" }}>
                        Troco
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "var(--success-500)",
                        }}
                      >
                        {format.formatarCurrency(troco)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button
            style={{ ...styles.button, ...styles.buttonOutline }}
            onClick={onClose}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--surface)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Cancelar (ESC)
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onClick={() => faturarVenda("orcamento")}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--primary-color)")
            }
          >
            <FaReceipt /> Gerar Orçamento
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={() => faturarVenda("nota")}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "var(--success-700)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "var(--success-500)")
            }
          >
            <FaFileInvoice /> Lançar venda
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaturarVenda;
