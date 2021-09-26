import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const getRole = (role: string): HTMLElement => screen.queryByRole(role)

export const getButton = (name: string): HTMLElement => screen.queryByRole('button', { name })

export const getLink = (name: string): HTMLElement => screen.queryByRole('link', { name })

export const getField = (placeholder: string): HTMLElement => screen.queryByPlaceholderText(placeholder)

export const populateField = (placeholder: string, value: string = faker.random.word()): void => {
  fireEvent.input(getField(placeholder), { target: { value } })
}

export const clickButton = (name: string): void => {
  fireEvent.submit(getButton(name))
}

export const clickLink = (name: string): void => {
  fireEvent.click(getLink(name))
}

export const testErrorMessage = (errorMessage: string, inDocument: boolean = true): void => {
  if (inDocument) {
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  } else {
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
  }
}

export const throwError = (): never => {
  throw new Error()
}
