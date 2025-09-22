import 'server-only'
import CountryDAL from '../dal/country-dal';


const CountryService = {
  getByCode: async ({ code }) => {
    const country = await CountryDAL.getByCode({ code })

    return country !== null
      ? country
      : null
  },

  getAll: async ({
    orderDir = 'ASC',
    orderBy = 'name'
  }) => {
    return await CountryDAL.getAll({ orderBy, orderDir })
  }
}

export default CountryService;