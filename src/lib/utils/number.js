import { LOCALE } from "../constants/locale";

const formatNumber = (value) => {
  return new Intl.NumberFormat(LOCALE.default).format(value);
}

export {
  formatNumber
}