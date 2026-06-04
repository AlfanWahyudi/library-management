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
  const pClasses = `text-xs font-base ${labelClasses}`

  return (
    <section className={secClasses}>
      <Button variant={variant} disabled={true} {...props}>{children}</Button>
      <p className={pClasses}>{desc}</p>
    </section>
  )
}