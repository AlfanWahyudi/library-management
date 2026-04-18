'use client'

export default function InfoItem({ className, title, children, ...props }) {
  const classes = "flex flex-col gap-1 text-xs" + className
  return (
    <article className={classes} {...props}>
      <p className="text-muted-foreground">{title}</p>
      {children}
    </article>
  )
}