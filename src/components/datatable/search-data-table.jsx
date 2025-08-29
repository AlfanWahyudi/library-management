import { useInput } from "@/hooks/use-input";
import { Input } from "../ui/input";

export default function SearchDataTable({ searchingFieldItems, table }) {
  const {
    value,
    handleInputChange
  } = useInput(table.getState().globalFilter)

  const searchingFields = searchingFieldItems.map((item) => item.name.toLowerCase()).join(', ')

  return <Input 
    className="w-100" 
    placeholder={`Cari ${searchingFields}...`}
    value={value}
    onChange={(e) => {
      table.setGlobalFilter(e.target.value)
      handleInputChange(e)
    }}
  />
}
