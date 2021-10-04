import { makeChangePasswordValidation } from '@/main/factories/pages'
import { ChangePassword } from '@/presentation/pages'
import React from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteCheckPasswordRequest, makeRemoteUpdatePassword } from '@/main/factories/usecases'

export const makeChangePassword: React.FC = () => {
  const { token } = useParams<{ token: string}>()
  return (
    <ChangePassword
      validation={makeChangePasswordValidation()}
      checkPasswordRequest={makeRemoteCheckPasswordRequest(token)}
      updatePassword={makeRemoteUpdatePassword(token)}
    />
  )
}
