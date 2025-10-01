'use client'

import InputErrorList from "@/components/common/input/input-error-list"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaControl({ 
  name, 
  label, 
  hasError = false,
  errorMsg = [], 
  key,
  isRequired = false,
  ...props 
}) {

  const requiredSymbol = <span className="text-destructive">*</span>

  return (
    <div className="grid w-full gap-2" key={key}>
      <Label htmlFor={name}>
        <span>{label}{isRequired && requiredSymbol}</span>
      </Label>
      <Textarea name={name} {...props} />
      {
        (hasError) && <InputErrorList messages={[...errorMsg]} />
      }
    </div>
  )
}