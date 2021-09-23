export class InvalidFieldError extends Error {
  constructor (message: string = 'Valor inválido') {
    super(message)
    this.name = 'InvalidFieldError'
  }
}
