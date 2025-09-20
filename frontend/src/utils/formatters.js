export const formatCurrency = (amount) =>
  amount ? `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00';
