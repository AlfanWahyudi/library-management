import { HTTP } from "../constants/http"

const isMethodCorrect = (method) => HTTP.METHOD[method.toUpperCase()] !== undefined

const isRouteModelValid = (obj) => {
  if (typeof(obj) !== 'object') return false

  return Object.hasOwn(obj, 'url') || Object.hasOwn(obj, 'title') || Object.hasOwn(obj, 'method') || Object.hasOwn(obj, 'path')
}

function createRouteModel({ url, title, method, path = null }) {

  if (typeof(url) !== 'string') throw new Error('url property must be a string')
  if (typeof(title) !== 'string') throw new Error('title property must be a string')
  if (typeof(method) !== 'string') throw new Error('method property must be a string')
    
  const methods = Object.getOwnPropertyNames(HTTP.METHOD).join(', ')
  if (!isMethodCorrect(method)) throw new Error(`http method can only ${methods}`)

  return {
    url,
    title,
    method: method.toUpperCase(),
    path,
  }
}


export {
  createRouteModel,
  isRouteModelValid,
}
