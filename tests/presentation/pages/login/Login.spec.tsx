import { render, waitFor, fireEvent } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Login } from '@/presentation/pages/login/Login'
import App from '@/main/config/App'
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'

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

type SutTypes = {
  authenticationSpy: AuthenticationSpy
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy(params?.validationField)
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.result = params?.validationError
  render(
    <App>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy} />
    </App>
  )
  return {
    authenticationSpy
  }
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

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await waitFor(() => {
      simulateValidSubmit(email, password)
      expect(authenticationSpy.params).toEqual({ email, password })
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    const spy = jest.spyOn(authenticationSpy, 'auth')
    await waitFor(() => {
      simulateValidSubmit()
      simulateValidSubmit()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    const { authenticationSpy } = makeSut({ validationError, validationField })
    const spy = jest.spyOn(authenticationSpy, 'auth')

    await waitFor(() => {
      simulateValidSubmit()
      simulateValidSubmit()
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })
})
