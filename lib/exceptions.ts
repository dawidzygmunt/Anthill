export class IdRequiredError extends Error {
  constructor(message = "ID is required") {
    super(message)
    this.name = "IdRequiredError"
  }
}
