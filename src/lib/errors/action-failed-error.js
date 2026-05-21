export class ActionFailedError extends Error {
  constructor(...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ActionFailedError)
    }
    
    this.name = 'ActionFailedError'
    this.statusCode = 500
  }
}
