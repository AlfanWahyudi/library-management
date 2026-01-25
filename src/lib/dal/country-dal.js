import 'server-only'

import { createCountry } from '../models/country-model'

const tableName = 'countries'

const CountryDAL = {
  getByCode: async(sql, code) => {
    code = code.toString().toUpperCase()

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      WHERE code = ${code}
    `
  },

  getAll: async (
    sql,
    data = { 
      orderDir: '',
      orderBy: ''
    }
  ) => {
    const {
      orderDir = 'ASC',
      orderBy = 'name'
    } = data

    return await sql`
      SELECT * FROM ${ sql(tableName) }
      ORDER BY ${ sql(orderBy) } ${orderDir.toUpperCase() === 'ASC' ? sql`ASC` : sql`DESC`}
      `
  }
}

export default CountryDAL

export {
  tableName
}