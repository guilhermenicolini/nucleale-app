import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { CheckCertificate } from '@/presentation/pages'
import { ValidateCertificateSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory } from 'history'
import { Router, Route } from 'react-router-dom'

import faker from 'faker'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  validateCertificateSpy: ValidateCertificateSpy
}

const hash = faker.random.alphaNumeric(8).toLowerCase()
const history = createMemoryHistory({ initialEntries: [`/certificates/${hash}`] })
const makeSut = (validateCertificateSpy = new ValidateCertificateSpy()): SutTypes => {
  const page = <CheckCertificate validateCertificate={validateCertificateSpy} />

  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <Route path="/certificates/:hash" render={() => page} />
      </Router>
      <ToastContainer />
    </ThemeProvider>
  )
  return {
    validateCertificateSpy
  }
}

describe('CheckCertificate Page', () => {
  test('Should start with valid certificate', async () => {
    const { validateCertificateSpy } = await waitFor(() => makeSut())

    const { hash, course } = validateCertificateSpy.result

    expect(Helper.getText(course)).toBeInTheDocument()
    expect(Helper.getText(hash)).toBeInTheDocument()
    expect(Helper.getText('válido')).toBeInTheDocument()
  })

  test('Should start with invalid certificate', async () => {
    const validateCertificateSpy = new ValidateCertificateSpy()
    validateCertificateSpy.result = null
    await waitFor(() => makeSut(validateCertificateSpy))

    expect(Helper.getText('inválido')).toBeInTheDocument()
    expect(Helper.getText(hash)).toBeInTheDocument()
  })

  test('Should start with error', async () => {
    const validateCertificateSpy = new ValidateCertificateSpy()
    jest.spyOn(validateCertificateSpy, 'validate').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(validateCertificateSpy))

    await waitFor(() => {
      expect(Helper.getRole('form')).not.toBeInTheDocument()
      expect(Helper.testErrorMessage('Falha ao validar certificado'))
    })
  })

  test('Should call ValidateCertificate on reload', async () => {
    const validateCertificateSpy = new ValidateCertificateSpy()
    jest.spyOn(validateCertificateSpy, 'validate').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(validateCertificateSpy))

    await waitFor(() => Helper.clickButton('Tentar novamente'))
    expect(validateCertificateSpy.calls).toBe(1)
  })
})
