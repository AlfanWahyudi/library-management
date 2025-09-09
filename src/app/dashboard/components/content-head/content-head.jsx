"use client"

export default function ContentHead({ pageTitle, rightContentItem  }) {
  return (
    <section className="grid gap-1 mb-3">
      <section className="md:flex md:flex-row-reverse md:align-middle">
        <div className='mb-3 md:m-0 flex gap-3'>
          {rightContentItem}
        </div>
        <h2 className="text-2xl font-semibold md:flex-1">{pageTitle}</h2>
      </section>
    </section>
  )
}