'use client'

import { Button } from "@/components/ui/button"

export default function ButtonDisableDesc({
  desc,
  labelClasses,
  variant = 'default',
  contentClasses,
  children,
  ...props
}) {
  const secClasses = `flex flex-col gap-1 ${contentClasses}`
  const pClasses = `text-sm font-semibold ${labelClasses}`

  return (
    <section className={secClasses}>
      <p className={pClasses}>{desc}</p>
      <Button variant={variant} disabled={true} {...props}>{children}</Button>
    </section>
  )
}