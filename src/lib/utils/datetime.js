import { format } from "date-fns"
import { id } from "date-fns/locale"

const defaultDateTimePattern = 'dd MMM yyyy k:m:s'
const defaultOptions = {
  locale: id
}

const formatDateTime = ({ datetime, pattern = defaultDateTimePattern }) => format(new Date(datetime), pattern, {
  ...defaultOptions
})

export {
  formatDateTime
}