import { format } from "date-fns"

const defaultDatePattern = 'yyyy-MM-dd'

const formatDate = ({ date, pattern = defaultDatePattern }) => format(date, pattern)

export {
  formatDate
}