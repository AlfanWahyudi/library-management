import 'server-only'
import { GENDER } from '../constants/gender'

export const createMemberDTO = ({
  id, 
  fullName, 
  email, 
  phone, 
  address, 
  birthDate, 
  gender, 
  createdAt = null, 
  updatedAt = null,
}) => {

  if (typeof(fullName) !== 'string') throw new TypeError('fullName property must be a string')
  if (typeof(email) !== 'string') throw new TypeError('email property must be an string')
  if (typeof(phone) !== 'string') throw new TypeError('phone property must be an string')
  if (typeof(address) !== 'string') throw new TypeError('address property must be an string')
  
  if (typeof(gender) !== 'string') throw new TypeError('gender property must be an string')
  if (GENDER[gender] === undefined) throw new Error(`Invalid gender: can only be ${Object.getOwnPropertyNames(GENDER)}`)

  return {
    id,
    fullName, 
    email, 
    phone, 
    address, 
    birthDate, 
    gender, 
    createdAt, 
    updatedAt, 
  }
}

export const createArrMemberDTO = (memberArr = []) => {
  return memberArr.map((member) => createMemberDTO(member))
}