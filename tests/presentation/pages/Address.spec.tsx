import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { Address } from '@/presentation/pages'
import { ValidationSpy, LoadAddressSpy, FindLocationSpy, SaveAddressSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

import faker from 'faker'
import { ServerError, UnauthorizedError } from '@/presentation/errors'
import { AccountModel } from '@/domain/models'

const form = {
  status: 'status',
  zip: 'Informe o CEP',
  address: 'Informe o endereço',
  number: 'Informe o número',
  complement: 'Informe o complemento',
  district: 'Informe o bairro',
  state: 'Estado',
  cityId: 'Cidade',
  save: 'Salvar'
}

type SutTypes = {
  loadAddressSpy: LoadAddressSpy
  findLocationSpy: FindLocationSpy
  saveAddressSpy: SaveAddressSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (
  validationSpy: ValidationSpy = new ValidationSpy(faker.database.column()),
  loadAddressSpy: LoadAddressSpy = new LoadAddressSpy(),
  findLocationSpy: FindLocationSpy = new FindLocationSpy(),
  saveAddressSpy: SaveAddressSpy = new SaveAddressSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({ initialEntries: ['/address'] })
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <Address
            validation={validationSpy}
            loadAddress={loadAddressSpy}
            findLocation={findLocationSpy}
            saveAddress={saveAddressSpy} />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    loadAddressSpy,
    findLocationSpy,
    saveAddressSpy,
    history,
    setCurrentAccountMock
  }
}

describe('Address Page', () => {
  test('Should load address on start', async () => {
    const { loadAddressSpy } = await waitFor(() => makeSut())

    await waitFor(() => {
      expect(loadAddressSpy.calls).toBe(1)
      expect(Helper.getField(form.zip)).toHaveValue(loadAddressSpy.result.zip)
      expect(Helper.getField(form.address)).toHaveValue(loadAddressSpy.result.address)
      expect(Helper.getField(form.number)).toHaveValue(loadAddressSpy.result.number)
      expect(Helper.getField(form.complement)).toHaveValue(loadAddressSpy.result.complement)
      expect(Helper.getField(form.district)).toHaveValue(loadAddressSpy.result.district)
      expect(Helper.getLabel(form.state)).toHaveValue(loadAddressSpy.result.state)
      expect(Helper.getLabel(form.cityId)).toHaveValue(loadAddressSpy.result.cityId.toString())
      expect(Helper.getText(form.save)).toBeEnabled()
    })
  })

  test('Should not load address on start', async () => {
    const loadAddressSpy = new LoadAddressSpy()
    loadAddressSpy.result = null

    const validationSpy = new ValidationSpy('zip')
    validationSpy.result = new Error()

    await waitFor(() => makeSut(validationSpy, loadAddressSpy))

    await waitFor(() => {
      expect(Helper.getField(form.zip)).toHaveValue('')
      expect(Helper.getField(form.address)).toHaveValue('')
      expect(Helper.getField(form.number)).toHaveValue('')
      expect(Helper.getField(form.complement)).toHaveValue('')
      expect(Helper.getField(form.district)).toHaveValue('')
      expect(Helper.getLabel(form.state)).toHaveValue('')
      expect(Helper.getLabel(form.cityId)).toHaveValue('')
      expect(Helper.getText(form.save)).toBeDisabled()
    })
  })

  test('Should show error if LoadAddress throws error', async () => {
    const loadAddressSpy = new LoadAddressSpy()
    const error = new ServerError()
    jest.spyOn(loadAddressSpy, 'load').mockRejectedValueOnce(error)

    await waitFor(() => makeSut(undefined, loadAddressSpy))

    await waitFor(() => {
      expect(Helper.testErrorMessage(error.message))
    })
  })

  test('Should logout on UnauthorizedError', async () => {
    const loadAddressSpy = new LoadAddressSpy()
    jest.spyOn(loadAddressSpy, 'load').mockRejectedValueOnce(new UnauthorizedError())

    const { setCurrentAccountMock, history } = makeSut(undefined, loadAddressSpy)
    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })
  })

  test('Should call LoadAddress on reload', async () => {
    const loadAddressSpy = new LoadAddressSpy()
    jest.spyOn(loadAddressSpy, 'load').mockRejectedValueOnce(new ServerError())
    await waitFor(() => makeSut(undefined, loadAddressSpy))
    await waitFor(() => Helper.clickButton('Tentar novamente'))
    expect(loadAddressSpy.calls).toBe(1)
  })

  const fieldTest = async (field: string): Promise<void> => {
    const validationSpy = new ValidationSpy(field)
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut(validationSpy))

    await waitFor(() => {
      Helper.populateField(form[field], faker.random.word())
      Helper.testErrorMessage(validationSpy.result.message)
      expect(Helper.getText(form.save)).toBeDisabled()
    })
  }

  const selectTest = async (field: string): Promise<void> => {
    const validationSpy = new ValidationSpy(field)
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut(validationSpy))

    await waitFor(() => {
      Helper.populateSelect(form[field], faker.random.word())
      Helper.testErrorMessage(validationSpy.result.message)
      expect(Helper.getText(form.save)).toBeDisabled()
    })
  }

  test('Should show zip error if validation fails', async () => {
    await fieldTest('zip')
  })

  test('Should show address error if validation fails', async () => {
    await fieldTest('address')
  })

  test('Should show number error if validation fails', async () => {
    await fieldTest('number')
  })

  test('Should show district error if validation fails', async () => {
    await fieldTest('district')
  })

  test('Should show state error if validation fails', async () => {
    await selectTest('state')
  })

  test('Should show cityId error if validation fails', async () => {
    await selectTest('cityId')
  })

  test('Should show spinner on submit', async () => {
    await waitFor(() => makeSut())

    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })

  test('Should call SaveAddress with correct values', async () => {
    const { loadAddressSpy, saveAddressSpy } = await waitFor(() => makeSut())

    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(saveAddressSpy.calls).toBe(1)
      expect(saveAddressSpy.params).toEqual(loadAddressSpy.result)
    })
  })

  test('Should call SaveAddress only once', async () => {
    const { saveAddressSpy } = await waitFor(() => makeSut())

    Helper.clickButton(form.save)
    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(saveAddressSpy.calls).toBe(1)
    })
  })

  test('Should not call SaveAddress if form is invalid', async () => {
    const validationSpy = new ValidationSpy('random')
    validationSpy.result = new Error(faker.random.words())
    const { saveAddressSpy } = await waitFor(() => makeSut(validationSpy))

    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(saveAddressSpy.calls).toBe(0)
    })
  })

  test('Should present error if SaveAddress fails', async () => {
    const saveAddressSpy = new SaveAddressSpy()
    const errorMessage = faker.random.words()
    jest.spyOn(saveAddressSpy, 'save').mockRejectedValueOnce(new Error(errorMessage))
    await waitFor(() => makeSut(undefined, undefined, undefined, saveAddressSpy))

    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(Helper.testErrorMessage(errorMessage))
    })
  })

  test('Should present message on success', async () => {
    await waitFor(() => makeSut())
    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(Helper.getText('Endereço atualizado com sucesso')).toBeInTheDocument()
    })
  })
})
