'use client'

const memberTopTenLoanChart = (data = []) => {
  return {
    config: {
      val: {
        label: "Total Pinjaman",
        color: "var(--chart-1)" //TODO: change color
      },
      label: {
        color: "var(--background)", //TODO: change color
      },
    },
    data
  }
}


export {
  memberTopTenLoanChart,
}
