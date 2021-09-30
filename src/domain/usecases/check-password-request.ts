export interface CheckPasswordRequest {
  check: (token: string) => Promise<boolean>
}
