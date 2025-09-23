'use client';

import { Input } from "@/components/ui/input";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

export default function InputControlForm({ 
  useFormProp, 
  name, 
  label, 
  isRequired = false, 
  children, 
  ...props  
}) {
  return (
    <FormField 
      control={useFormProp.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isRequired && <span className="text-destructive">*</span>} 
          </FormLabel>
          <FormControl>
            <Input {...field} {...props}  />
          </FormControl>
          <FormDescription>
            {children}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}