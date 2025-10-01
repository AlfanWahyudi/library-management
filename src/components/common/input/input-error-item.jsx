"use client"

export default function InputErrorItem({ text, className = '', ...props }) {
  const classes = `text-destructive text-sm ${className}`
  return <p {...props} className={classes}>{text}</p>
}