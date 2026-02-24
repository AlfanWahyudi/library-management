import { format } from "date-fns"
import { id } from "date-fns/locale"
import { DATETIME_PATTERN } from "../constants/datetime-pattern"

const defaultOptions = {
  locale: id
}

const formatDateTime = ({ datetime, pattern = DATETIME_PATTERN.DEFAULT }) => format(new Date(datetime), pattern, {
  ...defaultOptions
})

export {
  formatDateTime
}