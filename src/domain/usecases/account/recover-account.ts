export interface RecoverAccount {
  recover: (email: string) => Promise<void>
}
