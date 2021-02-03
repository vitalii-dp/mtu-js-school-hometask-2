class InputValidationError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 422
    this.name = 'InputValidationError'
  }
}

module.exports = InputValidationError