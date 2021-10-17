import { render, waitFor, fireEvent } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Members } from '@/presentation/pages'
import { LoadMembersSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

type SutTypes = {
  loadMembersSpy: LoadMembersSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadMembersSpy = new LoadMembersSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
          <Router history={history}>
            <Members
              loadMembers={loadMembersSpy} />
          </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    loadMembersSpy,
    history,
    setCurrentAccountMock
  }
}

describe('Members Page', () => {
  test('Should start with no members', async () => {
    makeSut()
    const invoices = Helper.getRoles('card')
    expect(invoices).toHaveLength(0)
    await waitFor(() => invoices)
  })

  test('Should call LoadMembers', async () => {
    const { loadMembersSpy } = makeSut()
    expect(loadMembersSpy.calls).toBe(1)
    await waitFor(() => Helper.getRoles('card'))
  })

  test('Should show error if LoadMembers throws ServerError', async () => {
    const loadMembersSpy = new LoadMembersSpy()
    const error = new ServerError()
    jest.spyOn(loadMembersSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadMembersSpy)
    await waitFor(() => {
      expect(Helper.testErrorMessage(error.message))
    })
  })

  test('Should logout on UnauthorizedError', async () => {
    const loadMembersSpy = new LoadMembersSpy()
    jest.spyOn(loadMembersSpy, 'loadAll').mockRejectedValueOnce(new UnauthorizedError())
    const { setCurrentAccountMock, history } = makeSut(loadMembersSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should render members on success', async () => {
    const { loadMembersSpy } = await waitFor(() => makeSut())
    expect(Helper.getRoles('card')).toHaveLength(loadMembersSpy.result.length)
  })

  test('Should call LoadMembers on reload', async () => {
    const loadMembersSpy = new LoadMembersSpy()
    jest.spyOn(loadMembersSpy, 'loadAll').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(loadMembersSpy))

    await waitFor(() => Helper.clickButton('Tentar novamente'))
    expect(loadMembersSpy.calls).toBe(1)
  })

  test('Should go to children add page', async () => {
    const { history } = await waitFor(() => makeSut())

    const button = document.querySelector('button[name="add"]')
    fireEvent.click(button)

    await waitFor(() => {
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/family/add')
    })
  })
})
