import { Input } from "../ui/input";

export default function SearchDataTable({ searchingFieldItems, table }) {
  const searchingFields = searchingFieldItems.map((item) => item.name.toLowerCase()).join(', ')

  return <Input 
    className="w-100" 
    placeholder={`Cari ${searchingFields}...`}
    value={table.getState().globalFilter}
    onChange={(e) => table.setGlobalFilter(String(e.target.value))}
  />
}