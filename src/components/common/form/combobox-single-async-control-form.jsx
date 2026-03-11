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


// TODO: test validation
// TODO: 
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
        const invalid = fieldState.invalid

        // const defaultVals = new Set(formState.defaultValues[name].map(item => item.val))
        // const defaultValue = items.filter((item) => defaultVals.has(item.val))

        // const [value, setValue] = useState(defaultValue)

        const handleValueChange = (val) => {
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
                onComboValueChange={handleValueChange}
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