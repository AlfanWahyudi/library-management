'use client'

import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

import ComboboxMultiple from "../combobox/combobox-multiple";
import { useEffect, useState } from "react";

export default function ComboboxMultiControlForm({
  control, 
  name, 
  label,
  items,
  rules = null, 
  isRequired = false, 
  emptyLabel = 'No items found.',
  placeholder = 'Select and item',
  disabled = false,
  children,
}) {

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState, fieldState }) => {
        const invalid = fieldState.invalid

        const defaultVals = new Set(formState.defaultValues[name].map(item => item.val))
        const defaultValue = items.filter((item) => defaultVals.has(item.val))

        const [value, setValue] = useState(defaultValue)

        useEffect(() => {
          const handleResetField = () => {
            const fieldVals = field.value.map((item) => item.val)

            if (defaultVals.size === fieldVals.length) {
              let fieldEqualDefault = false
              for (let val of defaultVals) {
                fieldEqualDefault = fieldVals.includes(val)
              }
        
              if (fieldEqualDefault) {
                const valueVals = value.map((item) => item.val)
        
                let fieldNotEqualValue = false
                if (valueVals.length !== fieldVals.length) {
                  fieldNotEqualValue = true
                } else {
                  for (let val of valueVals) {
                    if (!fieldVals.includes(val)) {
                      fieldNotEqualValue = true
                      break
                    }
                  }
                }
        
                if (fieldNotEqualValue) {
                  setValue(defaultValue)
                }
              }
            }
          }

          handleResetField()

        }, [field])

        const handleValueChange = (val) => {
          setValue(val)
          field.onChange(val)
          field.onBlur()
        }
                
        return (
          <FormItem className="block">
            <FormLabel className="mb-2">
              {label} {isRequired && <span className="text-destructive">*</span>} 
            </FormLabel>
            <FormControl className="mb-1.5">
              <ComboboxMultiple 
                name={name}
                items={items}
                value={value}
                onValueChange={handleValueChange}
                disabled={disabled}
                emptyLabel={emptyLabel}
                placeholder={placeholder}
                inputDisabled={disabled}
                invalid={invalid}
              />
            </FormControl>
            {children && (
              <FormDescription>
                {children}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}