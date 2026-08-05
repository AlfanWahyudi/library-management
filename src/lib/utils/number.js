const formatNumber = (value) => {
  return new Intl.NumberFormat().format(value);
}

export {
  formatNumber
}