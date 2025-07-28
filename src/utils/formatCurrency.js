export const formatCurrency = (value) => {
  if (
    typeof value !== "number" ||
    isNaN(value) ||
    value === null ||
    value === undefined
  ) {
    return "R$ --";
  }

  const valueInReais = value / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valueInReais);
};