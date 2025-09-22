"use client"

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InputErrorList from "./input-error-list";

export default function InputControl({ 
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
        <span>{label} {isRequired && requiredSymbol}</span>
      </Label>
      <Input name={name} {...props} />
      {
        (hasError) && <InputErrorList messages={[...errorMsg]} />
      }
    </div>
  )
}