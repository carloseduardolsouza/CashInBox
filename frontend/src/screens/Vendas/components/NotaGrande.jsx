// NotaGrandeDetalhesVendaPdf.jsx
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import format from "../../../utils/formatters";

// Estilos otimizados para caber 2 vias em 1 página
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  cabecalhoNotaGrande: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    width: "100%",
    alignItems: "center",
    paddingTop: 5,
  },
  cabecalhoNotaGrande2: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "black",
    borderTopStyle: "dashed",
    justifyContent: "space-around",
    marginTop: 8,
    width: "100%",
    alignItems: "center",
    paddingTop: 5,
  },
  infoEmpresa: {
    fontSize: 9,
  },
  boxInfo: {
    borderWidth: 1,
    borderColor: "black",
    padding: 4,
    marginVertical: 3,
  },
  boxInfoLinha: {
    marginVertical: 1,
    fontSize: 10,
  },
  logoImpresa: {
    width: 60,
    objectFit: "contain",
  },
  resumoFinanceiro: {
    marginTop: 3,
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#F9F9F9",
  },
  resumoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 1,
  },
  resumoTextoLabel: {
    fontSize: 10,
  },
  resumoTextoValor: {
    fontSize: 10,
    textAlign: "right",
  },
  resumoLinhaDestaque: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
    paddingTop: 2,
    borderTopWidth: 1,
    borderTopColor: "black",
  },
  resumoTextoDestaque: {
    fontSize: 11,
    fontWeight: "bold",
  },
  footer: {
    borderWidth: 1,
    borderColor: "black",
    height: 35,
    marginTop: 3,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerText: {
    width: 150,
    textAlign: "center",
    height: 15,
    borderTopWidth: 1,
    borderTopColor: "black",
    fontSize: 8,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 3,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeaderProduto: {
    width: "45%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#EEE",
    padding: 3,
  },
  tableColHeaderQtd: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#EEE",
    padding: 3,
  },
  tableColHeaderPreco: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#EEE",
    padding: 3,
  },
  tableColHeaderTotal: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#EEE",
    padding: 3,
  },
  tableColProduto: {
    width: "45%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    fontSize: 9,
  },
  tableColQtd: {
    width: "15%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    fontSize: 9,
    textAlign: "center",
  },
  tableColPreco: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    fontSize: 9,
  },
  tableColTotal: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    fontSize: 9,
  },
  tableCellHeader: {
    fontWeight: "bold",
    fontSize: 10,
  },
  pagamentoInfo: {
    marginVertical: 3,
    padding: 3,
    backgroundColor: "#F5F5F5",
    fontSize: 10,
  },
});

// Componente reutilizável para cada nota
const NotaContent = ({ venda, isSecondCopy }) => (
  <View>
    {/* Cabeçalho */}
    <View style={isSecondCopy ? styles.cabecalhoNotaGrande2 : styles.cabecalhoNotaGrande}>
      <Image src={""} style={styles.logoImpresa} />
      <View style={styles.infoEmpresa}>
        <Text>CNPJ: {format.formatCNPJ("00000000000000")}</Text>
        <Text>{"Endereço não cadastrado"}</Text>
        <Text>{format.formatarTelefone("00000000000")}</Text>
      </View>
    </View>

    {/* Informações de Pagamento */}
    <View style={styles.pagamentoInfo}>
      <Text>
        Pagamento:{" "}
        {venda.pagamentos && venda.pagamentos.length > 0
          ? venda.pagamentos
              .map((p) => `${format.formatarCurrency(p.valor)} (${p.forma})`)
              .join(", ")
          : "Não informado"}
      </Text>
    </View>

    {/* Informações do Cliente - APENAS 4 CAMPOS */}
    <View style={styles.boxInfo}>
      <View style={styles.boxInfoLinha}>
        <Text>Cliente: {venda.cliente?.nome || "Desconhecido"}</Text>
      </View>
      <View style={styles.boxInfoLinha}>
        <Text>
          Telefone:{" "}
          {venda.cliente?.telefone
            ? format.formatarTelefone(venda.cliente.telefone)
            : "Desconhecido"}
        </Text>
      </View>
      <View style={styles.boxInfoLinha}>
        <Text>Endereço: Desconhecido</Text>
      </View>
      <View style={styles.boxInfoLinha}>
        <Text>Data: {format.formatDate(venda.data) || "Desconhecido"}</Text>
      </View>
    </View>

    {/* Tabela de Produtos */}
    <View style={styles.table}>
      {/* Cabeçalho da tabela */}
      <View style={styles.tableRow}>
        <Text style={[styles.tableColHeaderProduto, styles.tableCellHeader]}>
          Produto
        </Text>
        <Text style={[styles.tableColHeaderQtd, styles.tableCellHeader]}>
          Qtd.
        </Text>
        <Text style={[styles.tableColHeaderPreco, styles.tableCellHeader]}>
          Vl. unitário
        </Text>
        <Text style={[styles.tableColHeaderTotal, styles.tableCellHeader]}>
          Total
        </Text>
      </View>

      {/* Linhas da tabela */}
      {venda.itens?.map((product, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.tableColProduto}>
            {product.nome_produto}
            {product.nome_variacao ? ` - ${product.nome_variacao}` : ""}
          </Text>
          <Text style={styles.tableColQtd}>{product.quantidade}</Text>
          <Text style={styles.tableColPreco}>
            {format.formatarCurrency(product.preco_unitario)}
          </Text>
          <Text style={styles.tableColTotal}>
            {format.formatarCurrency(product.subtotal)}
          </Text>
        </View>
      ))}
    </View>

    {/* Resumo Financeiro */}
    <View style={styles.resumoFinanceiro}>
      <View style={styles.resumoLinha}>
        <Text style={styles.resumoTextoLabel}>Qtde. de itens:</Text>
        <Text style={styles.resumoTextoValor}>{venda.total_itens || venda.itens?.length || 0}</Text>
      </View>
      
      <View style={styles.resumoLinha}>
        <Text style={styles.resumoTextoLabel}>Valor Bruto:</Text>
        <Text style={styles.resumoTextoValor}>
          {format.formatarCurrency(venda.valor_bruto || 0)}
        </Text>
      </View>

      {venda.desconto_real > 0 && (
        <View style={styles.resumoLinha}>
          <Text style={styles.resumoTextoLabel}>
            Desconto ({venda.desconto_porcentagem}%):
          </Text>
          <Text style={styles.resumoTextoValor}>
            - {format.formatarCurrency(venda.desconto_real)}
          </Text>
        </View>
      )}

      {venda.acrescimo_real > 0 && (
        <View style={styles.resumoLinha}>
          <Text style={styles.resumoTextoLabel}>
            Acréscimo ({venda.acrescimo_porcentagem}%):
          </Text>
          <Text style={styles.resumoTextoValor}>
            + {format.formatarCurrency(venda.acrescimo_real)}
          </Text>
        </View>
      )}

      <View style={styles.resumoLinhaDestaque}>
        <Text style={styles.resumoTextoDestaque}>Valor Líquido:</Text>
        <Text style={styles.resumoTextoDestaque}>
          {format.formatarCurrency(venda.valor_liquido || 0)}
        </Text>
      </View>
    </View>

    {/* Rodapé com Assinaturas */}
    <View style={styles.footer}>
      <View style={{ height: 25 }}></View>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>assinatura do responsável</Text>
        <Text style={styles.footerText}>assinatura do cliente</Text>
      </View>
    </View>
  </View>
);

const NotaGrande = ({ venda }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* PRIMEIRA NOTA - Via Cliente */}
      <NotaContent venda={venda} isSecondCopy={false} />

      {/* SEGUNDA NOTA - Via Estabelecimento */}
      <NotaContent venda={venda} isSecondCopy={true} />
    </Page>
  </Document>
);

export default NotaGrande;