"use client"

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AppInputErrorList from "../app-input-error-list";

export default function AppInputControl({ 
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
        (hasError) && <AppInputErrorList messages={[...errorMsg]} />
      }
    </div>
  )
}