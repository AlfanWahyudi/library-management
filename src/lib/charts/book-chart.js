'use client'


const bookTopTenLoanedChart = (data = []) => {
  return {
    config: {
      val: {
        label: "Total dipinjam",
        color: "var(--chart-1)",
      },
      label: {
        color: "var(--background)",
      },
    },
    data
  }
}

export {
  bookTopTenLoanedChart,
}
