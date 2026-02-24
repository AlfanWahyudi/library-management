import { format } from "date-fns"
import { DATE_PATTERN } from "../constants/date-pattern"

const formatDate = ({ date, pattern = DATE_PATTERN.DEFAULT }) => format(date, pattern)

export {
  formatDate
}