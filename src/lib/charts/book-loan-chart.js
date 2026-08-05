'use client'

const bookLoanTotalChart = (data = []) => {
  return {
    config: {
      year: {
        label: "Tahun",
      },
      total: {
        label: "Total Peminjaman",
        color: "var(--chart-1)", //TODO: change the color
      },
    },
    data
  }
}

export {
  bookLoanTotalChart
}
