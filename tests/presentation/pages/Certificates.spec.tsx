import { render, waitFor, fireEvent } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Certificates } from '@/presentation/pages'
import { LoadCertificatesSpy, DownloadFileSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { mockCertificateItem } from '@/tests/data/mocks'

type SutTypes = {
  loadCertificatesSpy: LoadCertificatesSpy
  downloadFileSpy: DownloadFileSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadCertificatesSpy = new LoadCertificatesSpy(), downloadFileSpy = new DownloadFileSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
          <Router history={history}>
            <Certificates
              loadCertificates={loadCertificatesSpy}
              downloadFile={downloadFileSpy} />
          </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    loadCertificatesSpy,
    downloadFileSpy,
    history,
    setCurrentAccountMock
  }
}

describe('Certificates Page', () => {
  test('Should start with no invoices', async () => {
    makeSut()
    const invoices = Helper.getRoles('card')
    expect(invoices).toHaveLength(0)
    await waitFor(() => invoices)
  })

  test('Should call LoadCertificates', async () => {
    const { loadCertificatesSpy } = makeSut()
    expect(loadCertificatesSpy.calls).toBe(1)
    await waitFor(() => Helper.getRoles('card'))
  })

  test('Should show error if LoadCertificates throws ServerError', async () => {
    const loadCertificatesSpy = new LoadCertificatesSpy()
    const error = new ServerError()
    jest.spyOn(loadCertificatesSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadCertificatesSpy)
    await waitFor(() => {
      expect(Helper.testErrorMessage(error.message))
    })
  })

  test('Should logout on UnauthorizedError', async () => {
    const loadCertificatesSpy = new LoadCertificatesSpy()
    jest.spyOn(loadCertificatesSpy, 'loadAll').mockRejectedValueOnce(new UnauthorizedError())
    const { setCurrentAccountMock, history } = makeSut(loadCertificatesSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should render certificates on success', async () => {
    await waitFor(() => makeSut())
    expect(Helper.getRoles('card')).toHaveLength(2)
  })

  test('Should render all certificates on success', async () => {
    const loadCertificatesSpy = new LoadCertificatesSpy()
    loadCertificatesSpy.result = [mockCertificateItem(), mockCertificateItem(), mockCertificateItem(), mockCertificateItem()]

    await waitFor(() => makeSut(loadCertificatesSpy))
    expect(Helper.getRoles('card')).toHaveLength(4)
  })

  test('Should call LoadCertificates on reload', async () => {
    const loadCertificatesSpy = new LoadCertificatesSpy()
    jest.spyOn(loadCertificatesSpy, 'loadAll').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(loadCertificatesSpy))

    await waitFor(() => Helper.clickButton('Tentar novamente'))
    expect(loadCertificatesSpy.calls).toBe(1)
  })

  test('Should call DownloadFile with correct value', async () => {
    const loadCertificatesSpy = new LoadCertificatesSpy()
    const downloadFileSpy = new DownloadFileSpy()
    await waitFor(() => makeSut(loadCertificatesSpy, downloadFileSpy))

    const buttons = Helper.getRoles('button')

    await waitFor(() => fireEvent.click(buttons[2]))
    expect(downloadFileSpy.calls).toBe(1)
    expect(downloadFileSpy.id).toBe(loadCertificatesSpy.result[1].hash)
  })
})
