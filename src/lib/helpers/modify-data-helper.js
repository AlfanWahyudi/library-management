import 'server-only'

import CountryDAL from '../dal/country-dal'
import sql from '../config/db'

export const attachCountryToAuthor = async (author) => {
  const [country] = await CountryDAL.getByCode(sql, author.countryCode)

  return {
    ...author,
    country
  }
}
