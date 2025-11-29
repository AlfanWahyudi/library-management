'use client'

export default function DashMainContent({ children }) {
  return (
    <section className="flex flex-1 flex-col gap-4 p-4 px-8">
      {children}
    </section>
  )
}