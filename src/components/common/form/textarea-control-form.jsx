'use client';


import { Textarea } from "@/components/ui/textarea";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

export default function TextareaControlForm({
  control, 
  name, 
  label,
  rules = null, 
  isRequired = false, 
  children, 
  ...props  
}) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {isRequired && <span className="text-destructive">*</span>} 
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              {...props}
            />
          </FormControl>
          {children && (
            <FormDescription>
              {children}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}