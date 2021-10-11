import { render, waitFor, fireEvent } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Childrens } from '@/presentation/pages'
import { LoadChildrensSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

type SutTypes = {
  loadChildrensSpy: LoadChildrensSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadChildrensSpy = new LoadChildrensSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
          <Router history={history}>
            <Childrens
              loadChildrens={loadChildrensSpy} />
          </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    loadChildrensSpy,
    history,
    setCurrentAccountMock
  }
}

describe('Childrens Page', () => {
  test('Should start with no childrens', async () => {
    makeSut()
    const invoices = Helper.getRoles('card')
    expect(invoices).toHaveLength(0)
    await waitFor(() => invoices)
  })

  test('Should call LoadChildrens', async () => {
    const { loadChildrensSpy } = makeSut()
    expect(loadChildrensSpy.calls).toBe(1)
    await waitFor(() => Helper.getRoles('card'))
  })

  test('Should show error if LoadChildrens throws ServerError', async () => {
    const loadChildrensSpy = new LoadChildrensSpy()
    const error = new ServerError()
    jest.spyOn(loadChildrensSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadChildrensSpy)
    await waitFor(() => {
      expect(Helper.testErrorMessage(error.message))
    })
  })

  test('Should logout on UnauthorizedError', async () => {
    const loadChildrensSpy = new LoadChildrensSpy()
    jest.spyOn(loadChildrensSpy, 'loadAll').mockRejectedValueOnce(new UnauthorizedError())
    const { setCurrentAccountMock, history } = makeSut(loadChildrensSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should render childrens on success', async () => {
    const { loadChildrensSpy } = await waitFor(() => makeSut())
    expect(Helper.getRoles('card')).toHaveLength(loadChildrensSpy.result.length)
  })

  test('Should call LoadChildrens on reload', async () => {
    const loadChildrensSpy = new LoadChildrensSpy()
    jest.spyOn(loadChildrensSpy, 'loadAll').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(loadChildrensSpy))

    await waitFor(() => Helper.clickButton('Tentar novamente'))
    expect(loadChildrensSpy.calls).toBe(1)
  })

  test('Should go to children add page', async () => {
    const { history } = await waitFor(() => makeSut())

    const button = document.querySelector('button[name="add"]')
    fireEvent.click(button)

    await waitFor(() => {
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/childrens/add')
    })
  })
})
