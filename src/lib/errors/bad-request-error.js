export class BadRequestError extends Error {
  constructor(prop = null, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError)
    }
    
    this.name = 'BadRequestError'
    this.statusCode = 400
    this.prop = prop
  }
}
