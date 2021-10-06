import { Members } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadMembers } from '@/main/factories/usecases'

export const makeMembers: React.FC = () => {
  return (
    <Members
      loadMembers={makeRemoteLoadMembers()} />
  )
}
