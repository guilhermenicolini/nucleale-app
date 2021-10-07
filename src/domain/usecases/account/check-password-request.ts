export interface CheckPasswordRequest {
  check: () => Promise<boolean>
}
