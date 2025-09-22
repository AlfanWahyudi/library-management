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

//TODO: fix error `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.

//TODO: fix error A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components
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