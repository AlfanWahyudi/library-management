import 'server-only'
import { VIOLATION_LEVEL } from '../constants/violation-level'

export const createViolationDTO = ({
  id, 
  title, 
  description, 
  level, 
  createdAt = null, 
  updatedAt = null,
}) => {

  if (typeof(title) !== 'string') throw new TypeError('title property must be a string')
  
  if (typeof(level) !== 'string') throw new TypeError('level property must be an string')
  if (VIOLATION_LEVEL[level] === undefined) throw new Error(`Invalid level: can only be ${Object.getOwnPropertyNames(VIOLATION_LEVEL)}`)

  return {
    id,
    title, 
    description, 
    level, 
    createdAt, 
    updatedAt, 
  }
}

export const createArrViolationDTO = (violationArr = []) => {
  return violationArr.map((violation) => createViolationDTO(violation))
}