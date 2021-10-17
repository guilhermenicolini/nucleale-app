import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { AddMember } from '@/presentation/pages'
import { ValidationSpy, InviteMemberSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

import faker from 'faker'
import { UnauthorizedError } from '@/presentation/errors'

const form = {
  email: 'Informe o e-mail',
  status: 'status',
  button: 'Convidar',
  back: 'Voltar para família',
  message: 'message'
}

type SutTypes = {
  validationSpy?: ValidationSpy
  inviteMemberSpy?: InviteMemberSpy
  history?: MemoryHistory
  setCurrentAccountMock?: (account: AccountModel) => void
}

const makeSut = ({
  validationSpy = new ValidationSpy(faker.database.column()),
  inviteMemberSpy = new InviteMemberSpy()
}: SutTypes = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/family/add'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <AddMember
            validation={validationSpy}
            inviteMember={inviteMemberSpy} />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    validationSpy,
    inviteMemberSpy,
    history,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (email = faker.internet.email()): void => {
  Helper.populateField(form.email, email)
  Helper.clickButton(form.button)
}

describe('AddMember Page', () => {
  test('Should start with initial values', async () => {
    makeSut()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getRole(form.message)).not.toBeInTheDocument()
      expect(Helper.getField(form.email)).toHaveValue('')
      expect(Helper.getText(form.button)).toBeDisabled()
    })
  })

  test('Should show e-mail error if validation fails', async () => {
    const validationSpy = new ValidationSpy('email')
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut({ validationSpy }))

    await waitFor(() => {
      Helper.populateField(form.email)
      Helper.testErrorMessage(validationSpy.result.message)
      expect(Helper.getText(form.button)).toBeDisabled()
    })
  })

  test('Should not show form errors if validation succeeds', async () => {
    const validationSpy = new ValidationSpy('any_field')
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut())

    await waitFor(() => {
      Helper.populateField(form.email)
      Helper.testErrorMessage(validationSpy.result.message, false)
      expect(Helper.getText(form.button)).toBeEnabled()
    })
  })

  test('Should show spinner on submit', async () => {
    await waitFor(() => makeSut())
    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })

  test('Should call InviteMember with correct values', async () => {
    const { inviteMemberSpy } = await waitFor(() => makeSut())
    const email = faker.internet.email()

    simulateValidSubmit(email)

    await waitFor(() => {
      expect(inviteMemberSpy.calls).toBe(1)
      expect(inviteMemberSpy.email).toBe(email)
    })
  })

  test('Should call InviteMember only once', async () => {
    const { inviteMemberSpy } = await waitFor(() => makeSut())

    simulateValidSubmit()
    simulateValidSubmit()

    await waitFor(() => {
      expect(inviteMemberSpy.calls).toBe(1)
    })
  })

  test('Should present error if InviteMember fails', async () => {
    const { inviteMemberSpy } = await waitFor(() => makeSut())
    jest.spyOn(inviteMemberSpy, 'invite').mockRejectedValueOnce(new Error('Custom error'))

    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.testErrorMessage('Custom error'))
    })
  })

  test('Should logout on UnauthorizedError', async () => {
    const { inviteMemberSpy, history, setCurrentAccountMock } = await waitFor(() => makeSut())
    jest.spyOn(inviteMemberSpy, 'invite').mockRejectedValueOnce(new UnauthorizedError())

    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should show message on success', async () => {
    await waitFor(() => makeSut())
    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.message)).toBeInTheDocument()
    })
  })

  test('Should go to family page', async () => {
    const { history } = await waitFor(() => makeSut())
    Helper.clickLink(form.back)

    await waitFor(() => {
      expect(history.length).toBe(2)
      expect(history.location.pathname).toBe('/family')
    })
  })
})
