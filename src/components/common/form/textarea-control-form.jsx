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
        <FormItem className="block">
          <FormLabel className="mb-2">
            {label} {isRequired && <span className="text-destructive">*</span>} 
          </FormLabel>
          <FormControl className="mb-1.5">
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