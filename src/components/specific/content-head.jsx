"use client"

import { Children } from "react"

export default function ContentHead({ pageTitle, children }) {
  return (
    <section className="grid gap-1 mb-3">
      <section className="flex flex-wrap align-middle justify-between gap-y-6">
        <h2 className="text-2xl font-semibold ">{pageTitle}</h2>
        {Children.count(children) > 0 && (
          <div className='flex flex-wrap gap-3'>
            {children}
          </div>
        )}
      </section>
    </section>
  )
}