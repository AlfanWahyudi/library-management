import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";

export default function FilteringSelect({ placeHolder }) {
  return (
    <Select>
      <SelectTrigger className="rounded-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}