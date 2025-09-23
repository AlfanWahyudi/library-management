'use client'

import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function SelectControlForm({
  useFormProp, 
  name, 
  label, 
  isRequired = false, 
  children, 
  placeholder = 'Pilih item',
  items = [],
  value = null,
  ...props  
}) {
  return (
    <FormField
      control={useFormProp.control}
      name={name}
      render={({ field }) => {
        const defaultValue = value !== null && field.value === '' 
          ? value 
          : field.value

        return (
          <FormItem>
            <FormLabel>
              {label} {isRequired && <span className="text-destructive">*</span>} 
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={defaultValue} {...props}>
              <FormControl>
                <SelectTrigger className='w-[100%]'>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem value={item.val} key={item.val}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              {children}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}