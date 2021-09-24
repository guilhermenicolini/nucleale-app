import { makeLoginValidation } from '@/main/factories/pages'
import { Login } from '@/presentation/pages'
import React from 'react'

export const makeLogin: React.FC = () => {
  return (
    <Login
      validation={makeLoginValidation()}
    />
  )
}
