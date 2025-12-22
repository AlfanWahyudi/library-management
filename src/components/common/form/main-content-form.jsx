'use client'

import { Form } from "@/components/ui/form"

export default function MainContentForm({ 
  useFormProp, 
  onSubmitForm = (data, e) => {}, 
  onErrorForm = (errors, e) => {},
  children, 
  ...props  
}) {
  return (
    <Form {...useFormProp}>
      <form onSubmit={useFormProp.handleSubmit(onSubmitForm, onErrorForm)} {...props}>

        {children}
      </form>
    </Form>
  )
}