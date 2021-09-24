import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const getPlaceholder = (placeholder: string): HTMLElement => screen.queryByPlaceholderText(placeholder)

export const getRole = (role: string): HTMLElement => screen.queryByRole(role)

export const getButton = (name: string): HTMLElement => screen.queryByRole('button', { name })

export const setPlaceholder = (placeholder: string, value: string = faker.random.word()): void => {
  const input = getPlaceholder(placeholder)
  fireEvent.input(input, { target: { value } })
}

export const testErrorMessage = (errorMessage: string, inDocument: boolean = true): void => {
  if (inDocument) {
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  } else {
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
  }
}
