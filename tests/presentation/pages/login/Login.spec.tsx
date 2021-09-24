import { render, waitFor, fireEvent } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Login } from '@/presentation/pages/login/Login'
import App from '@/main/config/App'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const form = {
  email: 'Informe seu e-mail',
  password: 'Informe sua senha',
  status: 'status',
  enter: 'Entrar'
}

type SutParams = {
  validationField: string
  validationError: Error
}

const makeSut = (params?: SutParams): any => {
  const validationSpy = new ValidationSpy(params?.validationField)
  validationSpy.result = params?.validationError
  return render(<App><Login validation={validationSpy} /></App>)
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  Helper.setPlaceholder(form.email, email)
  Helper.setPlaceholder(form.password, password)

  const button = Helper.getButton(form.enter)
  fireEvent.click(button)
}

describe('Login Component', () => {
  test('Should start with initial values', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getPlaceholder(form.email)).toHaveValue('')
      expect(Helper.getPlaceholder(form.password)).toHaveValue('')
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should show e-mail error if validation fails', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.setPlaceholder(form.email)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should show password error if validation fails', async () => {
    const validationField = 'password'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })
    await waitFor(() => {
      Helper.setPlaceholder(form.password)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should not show form errors if validation succeds', async () => {
    const validationField = 'field'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.setPlaceholder(form.email)
      Helper.setPlaceholder(form.password)
      Helper.testErrorMessage(validationError.message, false)
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await waitFor(() => {
      Helper.setPlaceholder(form.password, faker.internet.email())
      Helper.setPlaceholder(form.password, faker.internet.password())
      expect(Helper.getButton(form.enter)).toBeEnabled()
    })
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await waitFor(() => {
      simulateValidSubmit()
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })
})
