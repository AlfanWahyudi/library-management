'use client'

export default function ColHeader({ className, children }) {
  const classes = `w-full ${className}`

  return (
    <p className={classes}>
      {children}
    </p>
  )
}