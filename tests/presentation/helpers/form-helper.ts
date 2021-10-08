import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const getRole = (role: string): HTMLElement => screen.queryByRole(role)

export const getRoles = (role: string): HTMLElement[] => screen.queryAllByRole(role)

export const getButton = (name: string): HTMLElement => screen.queryByRole('button', { name })

export const getLink = (name: string): HTMLElement => screen.queryByRole('link', { name })

export const getText = (text: string): HTMLElement => screen.queryByText(text)

export const getField = (placeholder: string): HTMLElement => screen.queryByPlaceholderText(placeholder)

export const getLabel = (label: string): HTMLElement => screen.queryByLabelText(label)

export const populateField = (placeholder: string, value: string = faker.random.word()): void => {
  fireEvent.input(getField(placeholder), { target: { value } })
}

export const populateSelect = (label: string, value: string): void => {
  fireEvent.input(getLabel(label), { target: { value } })
}

export const submitButton = (name: string): void => {
  fireEvent.submit(getButton(name))
}

export const clickButton = (name: string): void => {
  fireEvent.click(getText(name))
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
