export class ServerError extends Error {
  constructor () {
    super('Something wrong happened. Please try again later.')
    this.name = 'ServerError'
  }
}
