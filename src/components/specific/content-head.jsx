"use client"

import { Children } from "react"
import TitlePage from "../common/title-page"

export default function ContentHead({ pageTitle, children }) {
  return (
    <section className="grid gap-1 mb-3">
      <section className="flex flex-wrap align-middle justify-between gap-y-6">
        <TitlePage className="mb-0!">{pageTitle}</TitlePage>
        {Children.count(children) > 0 && (
          <div className='flex flex-wrap gap-3'>
            {children}
          </div>
        )}
      </section>
    </section>
  )
}