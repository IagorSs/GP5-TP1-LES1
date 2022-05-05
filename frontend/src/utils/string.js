export const convertToMoney = (floatMoney) =>
  floatMoney.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
