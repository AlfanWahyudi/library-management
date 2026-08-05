'use client'


const bookTopTenLoanedChart = (data = []) => {
  return {
    config: {
      val: {
        label: "Total yang dipinjam",
        color: "var(--chart-1)", //TODO: change color
      },
      label: {
        color: "var(--background)", //TODO: change color
      },
    },
    data
  }
}

export {
  bookTopTenLoanedChart,
}
