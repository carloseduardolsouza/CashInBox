import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import format from "../../../utils/formatters";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 9,
    lineHeight: 1.4,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1 solid #000",
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    maxHeight: "8cm",
    overflow: "hidden",
    position: "relative",
  },
  logo: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  blocoEsquerdo: {
    width: "30%",
    paddingRight: 10,
    borderRight: "1 dashed #ccc",
  },
  blocoDireito: {
    width: "68%",
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  fieldText: {
    fontSize: 9,
    padding: 2,
    borderBottom: "0.5 solid #ddd",
    marginBottom: 3,
  },
  fieldTextNoBorder: {
    fontSize: 9,
    padding: 2,
    marginBottom: 3,
    color: "#666",
  },
  titleCode: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  box: {
    width: "48%",
  },
  valorParcela: {
    width: "100%",
  },
  codigoBarras: {
    marginTop: 5,
    padding: 5,
    backgroundColor: "#fff",
    border: "1 solid #ddd",
    borderRadius: 2,
    textAlign: "center",
    fontSize: 8,
    fontFamily: "Courier",
  },
  valorDestaque: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  separador: {
    marginTop: 4,
    marginBottom: 4,
  },
});

const CarnePagamento = ({ dados }) => {
  // Validação de dados
  if (!dados || !dados.crediario || !dados.crediario.parcelas) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Erro: Dados inválidos ou incompletos</Text>
        </Page>
      </Document>
    );
  }

  /**
   * Agrupa parcelas em grupos do tamanho especificado
   * @param {Array} parcelas - Array de parcelas
   * @param {number} tamanhoGrupo - Quantidade de parcelas por grupo
   * @returns {Array} Array de grupos de parcelas
   */
  const agruparParcelas = (parcelas, tamanhoGrupo = 3) => {
    const grupos = [];
    for (let i = 0; i < parcelas.length; i += tamanhoGrupo) {
      grupos.push(parcelas.slice(i, i + tamanhoGrupo));
    }
    return grupos;
  };

  /**
   * Formata o número da parcela com zeros à esquerda
   * @param {number} numeroParcela - Número da parcela atual
   * @param {number} totalParcelas - Total de parcelas
   * @returns {string} Número formatado (ex: "001/012")
   */
  const formatarNumeroParcela = (numeroParcela, totalParcelas) => {
    const numero = String(numeroParcela).padStart(3, "0");
    const total = String(totalParcelas).padStart(3, "0");
    return `${numero}/${total}`;
  };

  /**
   * Gera código de barras simulado (implementar integração real conforme necessário)
   * @param {object} parcela - Dados da parcela
   * @returns {string} Código de barras formatado
   */
  const gerarCodigoBarras = (parcela) => {
    // Implementar lógica real de geração de código de barras
    // Por enquanto retorna um código fictício formatado
    const codigo = `${parcela.id || "00000"}`.padStart(47, "0");
    return codigo.match(/.{1,5}/g)?.join(" ") || "";
  };

  const gruposParcelas = agruparParcelas(dados.crediario.parcelas);
  const totalParcelas = dados.crediario.parcelas.length;

  return (
    <Document>
      {gruposParcelas.map((grupo, pageIndex) => (
        <Page size="A4" style={styles.page} key={`page-${pageIndex}`}>
          {grupo.map((parcela, index) => {
            const numeroParcela = pageIndex * 3 + index + 1;
            const codigoBarras = gerarCodigoBarras(parcela);

            return (
              <View style={styles.container} key={`parcela-${numeroParcela}`}>
                {/* LOGO NO CANTO SUPERIOR DIREITO */}
                {dados.logo && <Image style={styles.logo} src={dados.logo} />}

                {/* BLOCO ESQUERDO - CANHOTO */}
                <View style={styles.blocoEsquerdo}>
                  <Text style={styles.sectionTitle}>Documento</Text>
                  <Text style={styles.fieldText}>
                    {formatarNumeroParcela(numeroParcela, totalParcelas)}
                  </Text>

                  <View style={styles.separador} />

                  <Text style={styles.sectionTitle}>Pagador</Text>
                  <Text style={styles.fieldText}>
                    {dados.cliente?.nome || "Não informado"}
                  </Text>

                  <View style={styles.separador} />

                  <Text style={styles.sectionTitle}>Beneficiário</Text>
                  <Text style={styles.fieldText}>
                    {dados.emitente || "Não informado"}
                  </Text>

                  <View style={styles.separador} />

                  <View style={styles.row}>
                    <View style={styles.box}>
                      <Text style={styles.sectionTitle}>Vencimento</Text>
                      <Text style={styles.valorDestaque}>
                        {format.formatDate(parcela.data_vencimento)}
                      </Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.sectionTitle}>Valor</Text>
                      <Text style={styles.valorDestaque}>
                        {format.formatarCurrency(parcela.valor)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.separador} />

                  <Text style={styles.fieldTextNoBorder}>(-) Desconto/Abatimento</Text>
                  <Text style={styles.fieldTextNoBorder}>(-) Outras Deduções</Text>
                  <Text style={styles.fieldTextNoBorder}>(+) Mora/Juros/Multa</Text>
                  <Text style={styles.fieldTextNoBorder}>(+) Outros Acréscimos</Text>
                  <Text style={styles.sectionTitle}>(=) Valor Cobrado</Text>
                </View>

                {/* BLOCO DIREITO - FICHA DE COMPENSAÇÃO */}
                <View style={styles.blocoDireito}>

                  <Text style={styles.sectionTitle}>Local de Pagamento</Text>
                  <Text style={styles.fieldText}>
                    Preferencialmente por PIX ou nas Casas Lotéricas
                  </Text>

                  <View style={styles.row}>
                    <View style={styles.box}>
                      <Text style={styles.sectionTitle}>Valor do Documento</Text>
                      <Text style={styles.valorDestaque}>
                        {format.formatarCurrency(parcela.valor)}
                      </Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.sectionTitle}>Data de Vencimento</Text>
                      <Text style={styles.valorDestaque}>
                        {format.formatDate(parcela.data_vencimento)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.valorParcela}>
                      <Text style={styles.sectionTitle}>Beneficiário/Cedente</Text>
                      <Text style={styles.fieldText}>
                        {dados.emitente || "Não informado"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row}>
                    <View style={styles.box}>
                      <Text style={styles.sectionTitle}>Sacado/Pagador</Text>
                      <Text style={styles.fieldText}>
                        {dados.cliente?.nome || "Não informado"}
                      </Text>
                    </View>
                    <View style={styles.box}>
                      <Text style={styles.sectionTitle}>CPF/CNPJ</Text>
                      <Text style={styles.fieldText}>
                        {dados.cliente?.cpfCNPJ 
                          ? format.formatCPF(dados.cliente.cpfCNPJ)
                          : "Não informado"}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.sectionTitle}>Código de Barras</Text>
                  <Text style={styles.codigoBarras}>{codigoBarras}</Text>
                </View>
              </View>
            );
          })}
        </Page>
      ))}
    </Document>
  );
};

export default CarnePagamento;