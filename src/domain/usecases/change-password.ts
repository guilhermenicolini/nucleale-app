export interface ChangePassword {
  change: (params: ChangePassword.Params) => Promise<void>
}

export namespace ChangePassword {
  export type Params = {
    password: string
    passwordConfirmation: string
  }
}
