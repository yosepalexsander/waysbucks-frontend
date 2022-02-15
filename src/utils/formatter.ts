export const currencyFormat = (value: number, format = 'IDR') => {
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: format });
  return formatter.format(value);
};
