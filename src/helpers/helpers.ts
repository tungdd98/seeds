export const formatCurrency = (value: number, minimumFractionDigits = 2) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits,
  });
};
