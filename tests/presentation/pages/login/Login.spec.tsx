import React from 'react'
import { render } from '@testing-library/react'
import { Login } from '@/presentation/pages/login/Login'
import App from '@/main/config/App'

describe('Login Component', () => {
  test('Should not render spinner on start', () => {
    render(<App><Login /></App>)
    expect(document.querySelector('.spinner')).toBeFalsy()
  })
})
