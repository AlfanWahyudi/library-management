export const createSuccessRes = ({ message, data = null, ...otherProp }) => {
  if (typeof(message) !== 'string') throw new Error('message property must be a string')
  if (typeof(data) !== null && typeof(data) !== 'object') throw new Error('data property can only be null and object')

  return {
    success: true,
    message,
    data,
    ...otherProp
  }

}


export const createErrorRes = ({ error, details = [] }) => {
  if (typeof(error) !== 'string') throw new Error('error property must be a string')
  if (typeof(details) !== 'object') throw new Error('details property must be an object')

  return {
    success: false,
    error,
    details
  }
}