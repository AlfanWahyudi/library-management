import 'server-only'
import sql from '../config/db'
import { createCountry } from '../models/country-model'

const tableName = 'countries'

const CountryDAL = {
  getByCode: async({ code }) => {
    code = parseInt(code)

    const countries = await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE code = ${code}
    `

    return countries.length === 0 
      ? null
      : createCountry({...countries[0]})
  },
}

export default CountryDAL

export {
  tableName
}