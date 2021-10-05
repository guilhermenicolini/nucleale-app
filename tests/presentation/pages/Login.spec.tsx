import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Login } from '@/presentation/pages'
import { ValidationSpy, AuthenticationSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import faker from 'faker'
import { ApiContext } from '@/presentation/contexts'

const form = {
  email: 'Informe seu e-mail',
  password: 'Informe sua senha',
  status: 'status',
  enter: 'Entrar',
  signup: 'Criar Conta',
  recovery: 'Esqueceu sua senha?'
}

type SutParams = {
  validationField: string
  validationError: Error
}

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AuthenticationSpy.Params) => void
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy(params?.validationField)
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.result = params?.validationError
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <Login
            validation={validationSpy}
            authentication={authenticationSpy} />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (email = faker.internet.email(), password = faker.internet.password()): void => {
  Helper.populateField(form.email, email)
  Helper.populateField(form.password, password)
  Helper.submitButton(form.enter)
}

describe('Login Component', () => {
  test('Should start with initial values', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getField(form.email)).toHaveValue('')
      expect(Helper.getField(form.password)).toHaveValue('')
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should show e-mail error if validation fails', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.email)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should show password error if validation fails', async () => {
    const validationField = 'password'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })
    await waitFor(() => {
      Helper.populateField(form.password)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.enter)).toBeDisabled()
    })
  })

  test('Should not show form errors if validation succeds', async () => {
    const validationField = 'field'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.email)
      Helper.populateField(form.password)
      Helper.testErrorMessage(validationError.message, false)
      expect(Helper.getButton(form.enter)).not.toBeDisabled()
    })
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await waitFor(() => {
      Helper.populateField(form.email, faker.internet.email())
      Helper.populateField(form.password, faker.internet.password())
      expect(Helper.getButton(form.enter)).toBeEnabled()
    })
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValidSubmit(email, password)

    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({ email, password })
    })
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    const spy = jest.spyOn(authenticationSpy, 'auth')

    simulateValidSubmit()
    simulateValidSubmit()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    const { authenticationSpy } = makeSut({ validationError, validationField })
    const spy = jest.spyOn(authenticationSpy, 'auth')

    simulateValidSubmit()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(new Error())

    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.testErrorMessage('Usuário ou senha inválida'))
    })
  })

  test('Should call SetCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.result)
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/')
    })
  })

  test('Should go to sign-up page', async () => {
    makeSut()
    Helper.clickLink(form.signup)

    await waitFor(() => {
      expect(history.length).toBe(2)
      expect(history.location.pathname).toBe('/sign-up')
    })
  })

  test('Should go to password-recovery page', async () => {
    makeSut()
    Helper.clickLink(form.recovery)

    await waitFor(() => {
      expect(history.length).toBe(3)
      expect(history.location.pathname).toBe('/password-recovery')
    })
  })
})
