import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages/login/Login'
import App from '@/main/config/App'

describe('Login Component', () => {
  test('Should start with initial values', async () => {
    render(<App><Login /></App>)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'E-mail' })).toHaveValue('')
    expect(screen.getByPlaceholderText('Informe a senha')).toHaveValue('')
  })
})
