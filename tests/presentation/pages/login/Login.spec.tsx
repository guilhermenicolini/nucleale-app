import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Login } from '@/presentation/pages/login/Login'
import App from '@/main/config/App'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const fields = {
  email: 'Informe seu e-mail',
  password: 'Informe sua senha',
  status: 'status',
  enter: 'Entrar'
}

type SutParams = {
  validationError: Error
}

const makeSut = (params?: SutParams): any => {
  const validationSpy = new ValidationSpy()
  validationSpy.result = params?.validationError
  return render(<App><Login validation={validationSpy} /></App>)
}

describe('Login Component', () => {
  test('Should start with initial values', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(fields.status)).not.toBeInTheDocument()
      expect(Helper.getPlaceholder(fields.email)).toHaveValue('')
      expect(Helper.getPlaceholder(fields.password)).toHaveValue('')
      expect(Helper.getButton(fields.enter)).toBeDisabled()
    })
  })

  test('Should show e-mail error if validation fails', async () => {
    const validationError = new Error(faker.random.words())
    makeSut({ validationError })

    await waitFor(() => {
      Helper.setPlaceholder(fields.email)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(fields.enter)).toBeDisabled()
    })
  })

  test('Should show password error if validation fails', async () => {
    const validationError = new Error(faker.random.words())
    makeSut({ validationError })
    await waitFor(() => {
      Helper.setPlaceholder(fields.password)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(fields.enter)).toBeDisabled()
    })
  })
})
