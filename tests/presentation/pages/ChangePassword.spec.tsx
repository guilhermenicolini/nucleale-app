import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { ChangePassword } from '@/presentation/pages'
import { ValidationSpy, CheckPasswordRequestSpy, UpdatePasswordSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import faker from 'faker'

const form = {
  status: 'status',
  password: 'Informe sua nova senha',
  passwordConfirmation: 'Repita a senha',
  change: 'Alterar senha',
  login: 'Voltar para login',
  form: 'form',
  error: 'Falha ao buscar link'
}

type SutParams = {
  checkPasswordResult?: boolean
  checkThrowMessage?: string
  validationField?: string
  validationError?: Error
}

type SutTypes = {
  checkPasswordRequestSpy: CheckPasswordRequestSpy
  updatePasswordSpy: UpdatePasswordSpy
}

const token = faker.datatype.uuid()
const history = createMemoryHistory({ initialEntries: [`/change-password/${token}`] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy(params?.validationField)
  const checkPasswordRequestSpy = new CheckPasswordRequestSpy()
  checkPasswordRequestSpy.result = params?.checkPasswordResult === undefined ? true : params.checkPasswordResult

  if (params?.checkThrowMessage) {
    jest.spyOn(checkPasswordRequestSpy, 'check').mockRejectedValueOnce(new Error(params.checkThrowMessage))
  }

  const updatePasswordSpy = new UpdatePasswordSpy()
  validationSpy.result = params?.validationError
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <ChangePassword
          validation={validationSpy}
          checkPasswordRequest={checkPasswordRequestSpy}
          updatePassword={updatePasswordSpy} />
      </Router>
      <ToastContainer />
    </ThemeProvider>
  )
  return {
    checkPasswordRequestSpy,
    updatePasswordSpy
  }
}

const mockInput = (): any => ({
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})

const simulateValidSubmit = async (obj: any = mockInput(), clicks: number = 1): Promise<void> => {
  await waitFor(() => {
    Helper.populateField(form.password, obj.password)
    Helper.populateField(form.passwordConfirmation, obj.passwordConfirmation)
    for (let n = 0; n < clicks; n++) {
      Helper.submitButton(form.change)
    }
  })
}

describe('ChangePassword Page', () => {
  test('Should start with valid token', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getRole('form')).toBeInTheDocument()
      expect(Helper.getRole('message')).not.toBeInTheDocument()
    })
  })

  test('Should start with invalid token', async () => {
    makeSut({
      checkPasswordResult: false
    })

    await waitFor(() => {
      expect(Helper.getRole('form')).not.toBeInTheDocument()
      expect(Helper.getRole('message')).toBeInTheDocument()
    })
  })

  test('Should start with error', async () => {
    makeSut({
      checkThrowMessage: faker.random.words()
    })

    await waitFor(() => {
      expect(Helper.getRole('form')).not.toBeInTheDocument()
      expect(Helper.testErrorMessage(form.error))
    })
  })

  test('Should show password error if validation fails', async () => {
    const validationField = 'password'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })
    await waitFor(() => {
      Helper.populateField(form.password)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.change)).toBeDisabled()
    })
  })

  test('Should show password confirmation error if validation fails', async () => {
    const validationField = 'passwordConfirmation'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })
    await waitFor(() => {
      Helper.populateField(form.passwordConfirmation)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.change)).toBeDisabled()
    })
  })

  test('Should not show form errors if validation succeeds', async () => {
    const validationField = 'field'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.password)
      Helper.populateField(form.passwordConfirmation)
      Helper.testErrorMessage(validationError.message, false)
      expect(Helper.getButton(form.change)).not.toBeDisabled()
    })
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await waitFor(() => {
      Helper.populateField(form.password)
      Helper.populateField(form.passwordConfirmation)
      expect(Helper.getButton(form.change)).toBeEnabled()
    })
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })

  test('Should call UpdatePassword with correct values', async () => {
    const { updatePasswordSpy } = makeSut()
    const input = mockInput()

    await simulateValidSubmit(input)

    await waitFor(() => {
      expect(updatePasswordSpy.params).toEqual(input)
    })
  })

  test('Should call UpdatePassword only once', async () => {
    const { updatePasswordSpy } = makeSut()
    const spy = jest.spyOn(updatePasswordSpy, 'update')

    await simulateValidSubmit(undefined, 2)

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  test('Should present error if UpdatePassword fails', async () => {
    const { updatePasswordSpy } = makeSut()
    const errorMessage = faker.random.words()
    jest.spyOn(updatePasswordSpy, 'update').mockRejectedValueOnce(new Error(errorMessage))

    await simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.testErrorMessage(errorMessage))
    })
  })

  test('Should change password on success', async () => {
    makeSut()
    await simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole('message')).toBeInTheDocument()
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
