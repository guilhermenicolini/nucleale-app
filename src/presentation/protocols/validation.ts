export interface Validation {
  validate: (field: string, input: object) => Error
}
