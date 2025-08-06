export const formatCents = (cents: number) => {
  return new Intl.NumberFormat("pt-PT-u-cu-eur-co-phonebk", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
};
