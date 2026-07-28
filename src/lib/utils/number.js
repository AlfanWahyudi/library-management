import { LOCALE } from "../constants/locale";

const formatNumber = (value) => {
  return new Intl.NumberFormat(LOCALE.default, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export {
  formatNumber
}