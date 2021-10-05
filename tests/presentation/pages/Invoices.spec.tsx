import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Invoices } from '@/presentation/pages'
import { LoadInvoicesSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { mockInvoiceItem } from '@/tests/data/mocks'

type SutTypes = {
  loadInvoicesSpy: LoadInvoicesSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadInvoicesSpy = new LoadInvoicesSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
          <Router history={history}>
            <Invoices
              loadInvoices={loadInvoicesSpy} />
          </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    loadInvoicesSpy,
    history,
    setCurrentAccountMock
  }
}

describe('Dashboard Page', () => {
  test('Should start with no invoices', async () => {
    makeSut()
    const invoices = Helper.getRoles('card')
    expect(invoices).toHaveLength(0)
    await waitFor(() => invoices)
  })

  test('Should call LoadInvoices', async () => {
    const { loadInvoicesSpy } = makeSut()
    expect(loadInvoicesSpy.calls).toBe(1)
    await waitFor(() => Helper.getRoles('card'))
  })

  test('Should show error if LoadInvoices throws ServerError', async () => {
    const loadInvoicesSpy = new LoadInvoicesSpy()
    const error = new ServerError()
    jest.spyOn(loadInvoicesSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadInvoicesSpy)
    await waitFor(() => {
      expect(Helper.testErrorMessage(error.message))
    })
  })

  test('Should logout on UnauthorizedError', async () => {
    const loadInvoicesSpy = new LoadInvoicesSpy()
    jest.spyOn(loadInvoicesSpy, 'loadAll').mockRejectedValueOnce(new UnauthorizedError())
    const { setCurrentAccountMock, history } = makeSut(loadInvoicesSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should render invoices on success', async () => {
    await waitFor(() => makeSut())
    expect(Helper.getRoles('card')).toHaveLength(2)
  })

  test('Should render all invoices on success', async () => {
    const loadInvoicesSpy = new LoadInvoicesSpy()
    loadInvoicesSpy.result = [mockInvoiceItem(), mockInvoiceItem(), mockInvoiceItem(), mockInvoiceItem()]

    await waitFor(() => makeSut(loadInvoicesSpy))
    expect(Helper.getRoles('card')).toHaveLength(4)
  })

  test('Should call LoadInvoices on reload', async () => {
    const loadInvoicesSpy = new LoadInvoicesSpy()
    jest.spyOn(loadInvoicesSpy, 'loadAll').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(loadInvoicesSpy))

    await waitFor(() => Helper.clickButton('Tentar novamente'))
    expect(loadInvoicesSpy.calls).toBe(1)
  })
})
