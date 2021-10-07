import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { SignUp } from '@/presentation/pages'
import { ValidationSpy, AddAccountSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import moment from 'moment-timezone'

import faker from 'faker'
import { ApiContext } from '@/presentation/contexts'

const form = {
  status: 'status',
  taxId: 'Informe seu CPF',
  name: 'Informe seu nome completo',
  email: 'Informe seu e-mail',
  mobilePhone: 'Informe seu whatsapp',
  birth: 'dd/mm/aaaa',
  password: 'Informe sua senha',
  passwordConfirmation: 'Repita a senha',
  createAccount: 'Criar conta',
  login: 'Voltar para login'
}

type SutParams = {
  validationField: string
  validationError: Error
}

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccountSpy.Params) => void
}

const history = createMemoryHistory({ initialEntries: ['/sign-up'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy(params?.validationField)
  const addAccountSpy = new AddAccountSpy()
  validationSpy.result = params?.validationError
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <SignUp
            validation={validationSpy}
            addAccount={addAccountSpy} />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const mockInput = (): any => ({
  taxId: '62480966003',
  name: faker.name.findName(),
  email: faker.internet.email(),
  mobilePhone: '+5519998765432',
  birth: '1990-01-01',
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})

const simulateValidSubmit = (obj: any = mockInput()): void => {
  Helper.populateField(form.taxId, obj.taxId)
  Helper.populateField(form.name, obj.name)
  Helper.populateField(form.email, obj.email)
  Helper.populateField(form.mobilePhone, obj.mobilePhone)
  Helper.populateField(form.birth, obj.birth)
  Helper.populateField(form.password, obj.password)
  Helper.populateField(form.passwordConfirmation, obj.passwordConfirmation)
  Helper.submitButton(form.createAccount)
}

describe('SignUp Component', () => {
  test('Should start with initial values', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getField(form.taxId)).toHaveValue('')
      expect(Helper.getField(form.name)).toHaveValue('')
      expect(Helper.getField(form.email)).toHaveValue('')
      expect(Helper.getField(form.mobilePhone)).toHaveValue('')
      expect(Helper.getField(form.birth)).toHaveValue('')
      expect(Helper.getField(form.password)).toHaveValue('')
      expect(Helper.getField(form.passwordConfirmation)).toHaveValue('')
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show taxId error if validation fails', async () => {
    const validationField = 'taxId'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.taxId, faker.datatype.number(8).toString())
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show name error if validation fails', async () => {
    const validationField = 'name'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.name, faker.random.words())
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show e-mail error if validation fails', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.email)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show mobile phone error if validation fails', async () => {
    const validationField = 'mobilePhone'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.mobilePhone, faker.datatype.number(8).toString())
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show birth error if validation fails', async () => {
    const validationField = 'birth'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.birth, '1990-01-01')
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show password error if validation fails', async () => {
    const validationField = 'password'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })
    await waitFor(() => {
      Helper.populateField(form.password)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should show password confirmation error if validation fails', async () => {
    const validationField = 'passwordConfirmation'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })
    await waitFor(() => {
      Helper.populateField(form.passwordConfirmation)
      Helper.testErrorMessage(validationError.message)
      expect(Helper.getButton(form.createAccount)).toBeDisabled()
    })
  })

  test('Should not show form errors if validation succeeds', async () => {
    const validationField = 'field'
    const validationError = new Error(faker.random.words())
    makeSut({ validationError, validationField })

    await waitFor(() => {
      Helper.populateField(form.taxId, faker.datatype.number(8).toString())
      Helper.populateField(form.name, faker.random.words())
      Helper.populateField(form.email)
      Helper.populateField(form.mobilePhone, faker.datatype.number(8).toString())
      Helper.populateField(form.birth, '1990-01-01')
      Helper.populateField(form.password)
      Helper.populateField(form.passwordConfirmation)
      Helper.testErrorMessage(validationError.message, false)
      expect(Helper.getButton(form.createAccount)).not.toBeDisabled()
    })
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    await waitFor(() => {
      Helper.populateField(form.taxId, faker.datatype.number(8).toString())
      Helper.populateField(form.name, faker.random.words())
      Helper.populateField(form.email)
      Helper.populateField(form.mobilePhone, faker.datatype.number(8).toString())
      Helper.populateField(form.birth, '1990-01-01')
      Helper.populateField(form.password)
      Helper.populateField(form.passwordConfirmation)
      expect(Helper.getButton(form.createAccount)).toBeEnabled()
    })
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const input = mockInput()

    simulateValidSubmit(input)

    const { birth, ...rest } = input

    await waitFor(() => {
      expect(addAccountSpy.params).toEqual({
        ...rest,
        birth: moment.utc(birth).valueOf()
      })
    })
  })

  test('Should call Authentication only once', async () => {
    const { addAccountSpy } = makeSut()
    const spy = jest.spyOn(addAccountSpy, 'add')

    simulateValidSubmit()
    simulateValidSubmit()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationField = 'email'
    const validationError = new Error(faker.random.words())
    const { addAccountSpy } = makeSut({ validationError, validationField })
    const spy = jest.spyOn(addAccountSpy, 'add')

    simulateValidSubmit()

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(0)
    })
  })

  test('Should present error if Authentication fails', async () => {
    const { addAccountSpy } = makeSut()
    const errorMessage = faker.random.words()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(new Error(errorMessage))

    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.testErrorMessage(errorMessage))
    })
  })

  test('Should call SetCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.result)
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/')
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
