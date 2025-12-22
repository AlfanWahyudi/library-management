export class UnauthorizeError extends Error {
  constructor(...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizeError)
    }
    
    this.name = 'UnauthorizeError'
    this.statusCode = 401
  }
}
