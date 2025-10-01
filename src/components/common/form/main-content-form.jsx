'use client'

import { Form } from "@/components/ui/form"

export default function MainContentForm({ 
  useFormProp, 
  onSubmitForm, 
  children, 
  ...props  
}) {
  return (
    <Form {...useFormProp}>
      <form onSubmit={useFormProp.handleSubmit(onSubmitForm)} {...props}>

        {children}
      </form>
    </Form>
  )
}