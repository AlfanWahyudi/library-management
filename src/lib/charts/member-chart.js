'use client'

const memberTopTenLoanChart = (data = []) => {
  return {
    config: {
      val: {
        label: "Total pinjam",
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
  memberTopTenLoanChart,
}
