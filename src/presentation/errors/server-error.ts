export class ServerError extends Error {
  constructor () {
    super('Ocorreu um erro ao processar sua solicitação. Por favor tente novamente')
    this.name = 'ServerError'
  }
}
