export interface UpdatePassword {
  update: (params: UpdatePassword.Params) => Promise<void>
}

export namespace UpdatePassword {
  export type Params = {
    password: string
    passwordConfirmation: string
  }
}
