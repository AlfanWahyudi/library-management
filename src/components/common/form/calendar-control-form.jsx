"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function CalendarControlForm({
  control,
  name,
  label,
  rules,
  placeholder = 'Pilih tanggal',
  isRequired,
}) {


  return (
    <FormField 
      control={control}
      name={name}
      rules={rules}
      render={({ field, formState, fieldState }) => {
        const [open, setOpen] = useState(false)

        const date = field.value

        return (
          <FormItem className="flex flex-col gap-3">
            <FormLabel htmlFor="date">
              {label} {isRequired && <span className="text-destructive">*</span>} 
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" id="date" className={`${ fieldState.invalid ? 'border-destructive' : ''} justify-between font-normal`}>
                  {date ? date.toLocaleDateString() : placeholder}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    field.onChange(date)
                    setOpen(false)
                  }} />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  );
}
