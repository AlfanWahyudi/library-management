import 'server-only'

export const createUserDTO = ({
  id,
  fullName,
  username,
  email,
  address,
  gender,
  createdAt = null,
  updatedAt = null
}) => {
  return {
    id,
    fullName,
    username, 
    email, 
    address, 
    gender,
    createdAt, 
    updatedAt, 
  }
}

export const createArrUserDTO = (userArr = []) => {
  return userArr.map((user) => createUserDTO(user))
}