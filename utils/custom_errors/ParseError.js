class ParseError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
    this.name = 'ParseError'
  }
}

module.exports = ParseError