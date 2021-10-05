import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { PasswordRecovery } from '@/presentation/pages'
import { ValidationSpy, RecoverAccountSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import faker from 'faker'

const form = {
  email: 'Informe seu e-mail',
  status: 'status',
  enter: 'Recuperar senha',
  login: 'Voltar para login',
  message: 'message'
}

type SutParams = {
  validationField: string
  validationError: Error
}

type SutTypes = {
  recoverAccountSpy: RecoverAccountSpy
}

const history = createMemoryHistory({ initialEntries: ['/password-recovery'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy(params?.validationField)
  const recoverAccountSpy = new RecoverAccountSpy()
  validationSpy.result = params?.validationError
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <PasswordRecovery
          validation={validationSpy}
          recoverAccount={recoverAccountSpy} />
      </Router>
      <ToastContainer />
    </ThemeProvider>
  )
  return {
    recoverAccountSpy
  }
}

const simulateValidSubmit = (email = faker.internet.email()): void => {
  Helper.populateField(form.email, email)
  Helper.submitButton(form.enter)
}

describe('PasswordRecovery Component', () => {
  test('Should start with initial values', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getRole(form.message)).not.toBeInTheDocument()
      expect(Helper.getField(form.email)).toHaveValue('')
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

  test('Should not show form errors if validation succeeds', async () => {
    const validationField = 'field'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.email)
      Helper.testErrorMessage(validationError.message, false)
      expect(Helper.getButton(form.enter)).not.toBeDisabled()
    })
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await waitFor(() => {
      Helper.populateField(form.email, faker.internet.email())
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

  test('Should call RecoverAccount with correct values', async () => {
    const { recoverAccountSpy } = makeSut()
    const email = faker.internet.email()

    simulateValidSubmit(email)

    await waitFor(() => {
      expect(recoverAccountSpy.email).toBe(email)
    })
  })

  test('Should call RecoverAccount only once', async () => {
    const { recoverAccountSpy } = makeSut()
    const spy = jest.spyOn(recoverAccountSpy, 'recover')

    simulateValidSubmit()
    simulateValidSubmit()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  test('Should not call RecoverAccount if form is invalid', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    const { recoverAccountSpy } = makeSut({ validationError, validationField })
    const spy = jest.spyOn(recoverAccountSpy, 'recover')

    simulateValidSubmit()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  test('Should present error if RecoverAccount fails', async () => {
    const { recoverAccountSpy } = makeSut()
    jest.spyOn(recoverAccountSpy, 'recover').mockRejectedValueOnce(new Error('Custom error'))

    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.testErrorMessage('Custom error'))
    })
  })

  test('Should show message on success', async () => {
    makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.message)).toBeInTheDocument()
    })
  })

  test('Should go to login page', async () => {
    makeSut()
    Helper.clickLink(form.login)

    await waitFor(() => {
      expect(history.length).toBe(2)
      expect(history.location.pathname).toBe('/login')
    })
  })
})
