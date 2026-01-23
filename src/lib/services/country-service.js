import 'server-only'

import sql from '../config/db';
import CountryDAL from '../dal/country-dal';


const CountryService = {
  getByCode: async ({ code }) => {
    const country = await CountryDAL.getByCode(sql, code)

    return country !== null
      ? country
      : null
  },

  getAll: async ({
    orderDir = 'ASC',
    orderBy = 'name'
  }) => {
    const data = { orderBy, orderDir }
    return await CountryDAL.getAll(sql, data)
  }
}

export default CountryService;