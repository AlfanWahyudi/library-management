'use client'

export default function TitlePage({ className, children, ...props }) {
  const classes = 'text-2xl font-semibold mb-7 ' + className

  return (
    <h2 className={classes} {...props}>{children}</h2>
  )
}