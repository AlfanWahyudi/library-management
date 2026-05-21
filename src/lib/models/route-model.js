import { HTTP } from "../constants/http"

const isMethodCorrect = (method) => HTTP.METHOD[method.toUpperCase()] !== undefined

const isRouteModelValid = (obj) => {
  if (typeof(obj) !== 'object') return false

  return (Object.hasOwn(obj, 'url') && Object.hasOwn(obj, 'title') && Object.hasOwn(obj, 'method')) || 
    Object.hasOwn(obj, 'params')
}

function createRouteModel({ url, title, method, params = null}) {

  if (typeof(url) !== 'string') throw new Error('url property must be a string')
  if (typeof(title) !== 'string') throw new Error('title property must be a string')
  if (typeof(method) !== 'string') throw new Error('method property must be a string')
    
  const methods = Object.getOwnPropertyNames(HTTP.METHOD).join(', ')
  if (!isMethodCorrect(method)) throw new Error(`http method can only ${methods}`)

  if (params !== null || params?.length > 0) {
    params.forEach((param) => {
      const found = url.includes(param)
      if (!found) {
        throw new Error(`param:${param} - Is not in the url`)
      }

      const updatedUrl = url.replace(param, "")
      const foundSec = updatedUrl.includes(param)
      if (foundSec) {
        throw new Error(`param:${param} - no duplicates allowed`)
      }
      
      const urlSplitted = url.split(param)
      const prefix = urlSplitted[0][urlSplitted[0].length - 1]
      const postfix = urlSplitted[1][0]
      if (prefix !== '{' || postfix !== '}') {
        throw new Error(`param:${param} - format is invalid, must be use {}`)
      }
    })
  }

  return {
    url,
    params,
    title,
    method: method.toUpperCase(),
  }
}

export {
  createRouteModel,
  isRouteModelValid,
}
