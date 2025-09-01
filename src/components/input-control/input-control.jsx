"use client"

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import InputErrorList from "./input-error-list";

export default function InputControl({ 
  name, 
  label, 
  hasError = false,
  errorMsg = [], 
  ...props 
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} {...props} />
      {
        (hasError) && <InputErrorList messages={[...errorMsg]} />
      }
    </div>
  )
}