import 'server-only'
import sql from '../config/db'
import { createCountry } from '../models/country-model'

const tableName = 'countries'

const CountryDAL = {
  //TODO: jangan menampilkan data yang telah di softdeleted
  getByCode: async({ code }) => {
    code = code.toString().toUpperCase()

    const countries = await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE code = ${code}
    `

    return countries.length === 0 
      ? null
      : createCountry({...countries[0]})
  },

  getAll: async ({ 
    orderDir = 'ASC',
    orderBy = 'name'
  }) => {
    const countries = await sql`
      SELECT * FROM ${ sql(tableName) }
      ORDER BY ${ sql(orderBy) } ${orderDir.toUpperCase() === 'ASC' ? sql`ASC` : sql`DESC`}
      `

    return countries.map((country) => createCountry({...country}))
  }
}

export default CountryDAL

export {
  tableName
}