export class NotFoundError extends Error {
  constructor(prop = null, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError)
    }
    
    this.name = 'NotFoundError'
    this.statusCode = 404
    this.prop = prop
  }
}
