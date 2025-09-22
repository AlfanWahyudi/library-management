import 'server-only'
import CountryDAL from '../dal/country-dal';
import { createCountryDto } from '../dto/country-dto';


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