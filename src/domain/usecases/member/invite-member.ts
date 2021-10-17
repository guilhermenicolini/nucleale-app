export interface InviteMember {
  invite: (email: string) => Promise<void>
}
