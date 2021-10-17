import { makeAddMemberValidation } from '@/main/factories/pages'
import { makeRemoteInviteMember } from '@/main/factories/usecases'
import { AddMember } from '@/presentation/pages'
import React from 'react'

export const makeAddMember: React.FC = () => {
  return (
    <AddMember
      validation={makeAddMemberValidation()}
      inviteMember={makeRemoteInviteMember()}
    />
  )
}
