import { render, waitFor } from '@testing-library/react'
import { Helper } from '@/tests/presentation/helpers'
import { AddChildren } from '@/presentation/pages'
import { ValidationSpy, SaveChildrenSpy } from '@/tests/presentation/mocks'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/presentation/styles'
import { ToastContainer } from '@/presentation/components'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import moment from 'moment-timezone'

import faker from 'faker'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

const form = {
  status: 'status',
  name: 'Informe o nome completo',
  birth: 'dd/mm/aaaa',
  gender: 'Sexo',
  save: 'Salvar'
}

type SutTypes = {
  validationSpy?: ValidationSpy
  saveChildrenSpy?: SaveChildrenSpy
  history?: MemoryHistory
  setCurrentAccountMock?: (account: AccountModel) => void
}

const makeSut = ({
  validationSpy = new ValidationSpy(faker.database.column()),
  saveChildrenSpy = new SaveChildrenSpy()
}: SutTypes = {}): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/childrens/add'] })
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <ThemeProvider theme={defaultTheme}>
        <Router history={history}>
          <AddChildren
            validation={validationSpy}
            saveChildren={saveChildrenSpy} />
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ApiContext.Provider>
  )
  return {
    validationSpy,
    saveChildrenSpy,
    history,
    setCurrentAccountMock
  }
}

const mockInput = (): any => ({
  name: faker.name.findName(),
  gender: faker.random.arrayElement(['male', 'female']),
  birth: moment(faker.date.past(1).valueOf()).format('YYYY-MM-DD')
})

const simulateValidSubmit = (obj: any = mockInput()): void => {
  Helper.populateField(form.name, obj.name)
  Helper.populateSelect(form.gender, obj.gender)
  Helper.populateField(form.birth, obj.birth)
  Helper.clickButton(form.save)
}

describe('AddChildren Page', () => {
  test('Should start with initial values', async () => {
    const validationSpy = new ValidationSpy('name')
    validationSpy.result = new Error('error')
    await waitFor(() => makeSut({ validationSpy }))

    await waitFor(() => {
      expect(Helper.getRole(form.status)).not.toBeInTheDocument()
      expect(Helper.getField(form.name)).toHaveValue('')
      expect(Helper.getLabel(form.gender)).toHaveValue('')
      expect(Helper.getText(form.save)).toBeDisabled()
    })
  })

  const fieldTest = async (field: string, value: string = faker.random.word()): Promise<void> => {
    const validationSpy = new ValidationSpy(field)
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut({ validationSpy }))

    await waitFor(() => {
      Helper.populateField(form[field], value)
      Helper.testErrorMessage(validationSpy.result.message)
      expect(Helper.getText(form.save)).toBeDisabled()
    })
  }

  test('Should show name error if validation fails', async () => {
    await fieldTest('name')
  })

  test('Should show birth error if validation fails', async () => {
    await fieldTest('birth', '1990-01-01')
  })

  const selectTest = async (field: string): Promise<void> => {
    const validationSpy = new ValidationSpy(field)
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut({ validationSpy }))

    await waitFor(() => {
      Helper.populateSelect(form[field], faker.random.word())
      Helper.testErrorMessage(validationSpy.result.message)
      expect(Helper.getText(form.save)).toBeDisabled()
    })
  }

  test('Should show gender error if validation fails', async () => {
    await selectTest('gender')
  })

  test('Should not show form errors if validation succeeds', async () => {
    const validationSpy = new ValidationSpy('any_field')
    validationSpy.result = new Error(faker.random.words())
    await waitFor(() => makeSut({ validationSpy }))

    await waitFor(() => {
      Helper.populateField(form.name, faker.name.findName())
      Helper.populateSelect(form.gender, 'female')
      Helper.populateField(form.birth, '1990-01-01')
      Helper.testErrorMessage(validationSpy.result.message, false)
      expect(Helper.getText(form.save)).not.toBeDisabled()
    })
  })

  test('Should show spinner on submit', async () => {
    await waitFor(() => makeSut())

    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getRole(form.status)).toBeInTheDocument()
    })
  })

  test('Should call SaveChildren with correct values', async () => {
    const { saveChildrenSpy } = await waitFor(() => makeSut())

    const input = mockInput()
    simulateValidSubmit(input)

    await waitFor(() => {
      expect(saveChildrenSpy.calls).toBe(1)
      expect(saveChildrenSpy.data).toEqual({
        name: input.name,
        birth: moment.utc(input.birth).valueOf(),
        gender: input.gender
      })
    })
  })

  test('Should call SaveAddress only once', async () => {
    const { saveChildrenSpy } = await waitFor(() => makeSut())

    simulateValidSubmit()
    simulateValidSubmit()

    await waitFor(() => {
      expect(saveChildrenSpy.calls).toBe(1)
    })
  })

  test('Should not call SaveAddress if form is invalid', async () => {
    const validationSpy = new ValidationSpy('random')
    validationSpy.result = new Error(faker.random.words())
    const { saveChildrenSpy } = await waitFor(() => makeSut({ validationSpy }))

    Helper.clickButton(form.save)

    await waitFor(() => {
      expect(saveChildrenSpy.calls).toBe(0)
    })
  })

  test('Should present error if SaveChildren fails', async () => {
    const saveChildrenSpy = new SaveChildrenSpy()
    const errorMessage = faker.random.words()
    jest.spyOn(saveChildrenSpy, 'save').mockRejectedValueOnce(new Error(errorMessage))
    await waitFor(() => makeSut({ saveChildrenSpy }))

    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.testErrorMessage(errorMessage))
    })
  })

  test('Should present message on success and redirect', async () => {
    const { history } = await waitFor(() => makeSut())
    simulateValidSubmit()

    await waitFor(() => {
      expect(Helper.getText('Filho incluído com sucesso')).toBeInTheDocument()
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/childrens')
    })
  })
})
