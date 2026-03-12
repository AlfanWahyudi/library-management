'use client'

import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import ComboboxSingleAsync from "../combobox/combobox-single-async";
import { useEffect, useState } from "react";


export default function ComboboxSingleAsyncControlForm({
  control, 
  name, 
  label,
  rules = null, 
  isRequired = false, 
  placeholder = 'Cari item...',
  disabled = false,
  itemKey,
  resourceHttp,
  objLabel,
  customItem = (item) => null,
  children,
}) {

  return (
    <FormField 
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState, fieldState }) => {
        const [selectedValue, setSelectedValue] = useState(formState.defaultValues[name] || null)
        
        const invalid = fieldState.invalid

        useEffect(() => {
          const handleResetField = () => {
            const defaultVal = formState.defaultValues[name]
            const currVal = field.value

            if (defaultVal && currVal) {
              if (defaultVal[itemKey] === currVal[itemKey]) {
                let fieldNotEqualSelectedValue = true
                if (selectedValue && (currVal[itemKey] === selectedValue[itemKey])) {
                  fieldNotEqualSelectedValue = false
                }

                if (fieldNotEqualSelectedValue) {
                  setSelectedValue(defaultVal)
                }
              }
            }

            if (defaultVal === null && currVal === null && selectedValue !== null) {
              setSelectedValue(null)
            }
          }

          handleResetField()

        }, [field])

        const onSelectedValueChange = (val) => {
          setSelectedValue(val)

          field.onChange(val)
          field.onBlur()
        }

        return (
          <FormItem className="block">
            <FormLabel className="mb-2">
              {label} {isRequired && <span className="text-destructive">*</span>} 
            </FormLabel>
            <FormControl className="mb-1.5">
              <ComboboxSingleAsync 
                selectedValue={selectedValue}
                onSelectedValueChange={onSelectedValueChange}
                disabled={disabled}
                placeholder={placeholder}
                inputDisabled={disabled}
                invalid={invalid}
                itemKey={itemKey}
                resourceHttp={resourceHttp}
                objLabel={objLabel}
                customItem={customItem}
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