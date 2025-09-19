import 'server-only'
import CountryDAL from '../dal/country-dal';
import { createCountryDto } from '../dto/country-dto';


const CountryService = {
  getByCode: async ({ code }) => {
    const country = await CountryDAL.getByCode({ code })

    return country !== null
      ? createCountryDto({...country})
      : null
  },

  getAll: async ({
    orderDir = 'ASC',
    orderBy = 'name'
  }) => {
    const countries = await CountryDAL.getAll({ orderBy, orderDir })
    return countries.map((country) => createCountryDto({...country}))
  }
}

export default CountryService;