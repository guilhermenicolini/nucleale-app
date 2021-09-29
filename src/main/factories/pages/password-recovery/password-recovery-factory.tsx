import { makePasswordRecoveryValidation } from '@/main/factories/pages'
import { makeRemoteRecoverAccount } from '@/main/factories/usecases'
import { PasswordRecovery } from '@/presentation/pages'
import React from 'react'

export const makePasswordRecovery: React.FC = () => {
  return (
    <PasswordRecovery
      validation={makePasswordRecoveryValidation()}
      recoverAccount={makeRemoteRecoverAccount()}
    />
  )
}
