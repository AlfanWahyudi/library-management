import 'server-only'

export const createCountryDto = ({
  code,
  name
}) => {

  if (!code) throw new Error('code property is invalid.')
  if (!name) throw new Error('name property is invalid.')
  
  return {
    code,
    name,
  }
}
