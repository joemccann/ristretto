// A Better Error object for RESTful APIs

function BetterError(message, name, code) {
  this.message = message || "BetterError Message";
  this.name = name || "BetterError"
  this.code = code || 0
}
BetterError.prototype = new Error()
BetterError.prototype.constructor = BetterError

exports.BetterError = BetterError