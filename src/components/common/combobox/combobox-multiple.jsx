'use client'

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"

export default function ComboboxMultiple({ 
  items, 
  className, 
  placeholder = 'Pilih salah satu opsi',
  emptyLabel = 'Opsi tidak ditemukan.',
  inputDisabled = false,
  invalid = false,
  ...props 
}) {
  const anchor = useComboboxAnchor()

  const classes = `w-full ${className}`

  return (
    <Combobox 
      multiple
      items={items}
      {...props}
    >
      {
        !invalid && !inputDisabled
          ? (
            <ComboboxChips ref={anchor} className={classes}>
              <ComboboxValue>
                {(items) => (
                  <>
                    {items.map((item) => (
                      <ComboboxChip key={item.val}>{item.label}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput 
                      placeholder={items.length === 0 ? placeholder : ''} 
                    />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
          )
          : (
            <ComboboxInput 
              placeholder={placeholder}
              aria-invalid={invalid ? 'true' : ''}
              disabled={inputDisabled}
            />
          )
      }

      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>{emptyLabel}</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            if (!item['label'] || !item['val']) throw new Error(`item obj must contain label and val prop`)

            return (
              <ComboboxItem 
                key={item.val} 
                value={item}
              >
                {item.label}
              </ComboboxItem>
            )
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}