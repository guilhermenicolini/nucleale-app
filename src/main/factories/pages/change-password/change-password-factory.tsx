import { makeChangePasswordValidation } from '@/main/factories/pages'
import { ChangePassword } from '@/presentation/pages'
import React from 'react'

export const makeChangePassword: React.FC = () => {
  return (
    <ChangePassword
      validation={makeChangePasswordValidation()}
    />
  )
}
