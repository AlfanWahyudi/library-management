'use client'

const bookLoanTotalChart = (data = []) => {
  return {
    config: {
      year: {
        label: "Tahun",
      },
      total: {
        label: "Total peminjaman",
        color: "var(--chart-1)",
      },
    },
    data
  }
}

export {
  bookLoanTotalChart
}
