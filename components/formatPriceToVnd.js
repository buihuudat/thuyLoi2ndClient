export const formatPriceToVnd = (price) => {
  const vndPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return vndPrice;
};
