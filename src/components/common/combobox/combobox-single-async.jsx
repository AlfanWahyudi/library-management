'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { useMemo, useState, useTransition } from "react"


export default function ComboboxSingleAsync({
  placeholder = 'Cari item...',
  inputDisabled = false,
  invalid = false,
  className = '',
  itemKey,
  resourceHttp,
  objLabel,
  customItem = (item) => null,
}) {
  const classes = className

  const [searchResults, setSearchResults] = useState([])
  const [selectedValue, setSelectedValue] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()

  const trimmedSearchValue = searchValue.trim()
  
  const items = useMemo(() => {
    const result = []

    if (!selectedValue) {
      result.push(...searchResults)
    } else {
      const updated = searchResults.filter((item) => item[itemKey] !== selectedValue[itemKey])
      result.push(selectedValue, ...updated)
    }

    return result
  }, [searchResults, selectedValue])

  const getLabel = () => {
    if (trimmedSearchValue === '') {
      return selectedValue ? null : 'Mulai mengetik untuk mencari...'
    }

    if (isPending) {
      return (
        <Item className='p-0 ' size="sm">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className='font-normal'>Searching...</ItemTitle>
          </ItemContent>
        </Item>
      )
    }

    if (error) {
      return (<p className="text-destructive">{error}</p>)
    }

    if (searchResults.length === 0) {
      return `Tidak ada kecocokan untuk "${trimmedSearchValue}"`
    }

    return null
  }

  return (
    <Combobox 
      items={items}
      itemToStringLabel={(item) => item[objLabel]}
      filter={null}
      onOpenChangeComplete={(open) => {
        if (!open && selectedValue) {
          setSearchResults([selectedValue])
        }
      }}
      onValueChange={(nextSelectedValue) => {
        setSelectedValue(nextSelectedValue)
        setSearchValue('')
        setError(null)
      }}
      onInputValueChange={
        async (
          nextSearchValue, 
          { allowPropagation, reason, cancel, event, isCanceled, isPropagationAllowed, trigger }
        ) => {
          setSearchValue(nextSearchValue)

          if (nextSearchValue === '') {
            setSearchResults([])
            setError(null)
            return
          }

          if (reason === 'item-press') {
            return
          }

          startTransition(async () => {
            setError(null)

            try {
              const results = await resourceHttp(nextSearchValue)
  
              // note: using startTransition again is recommend by react.
              // link_docs: https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-as-a-transition
              startTransition(() => {
                setSearchResults(results || [])
              })
            } catch (error) {
              setError(error.message)
            }
          })
        }
      }
    >
      <ComboboxInput 
        placeholder={items.length === 0 ? placeholder : ''} 
        aria-invalid={invalid ? 'true' : ''}
        disabled={inputDisabled}
        className={classes}
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty className='px-3'>{getLabel()}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            customItem(item) || 
            (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
  
}