import React from 'react'
import { ApiContext } from '@/presentation/contexts'
import { useHistory } from 'react-router-dom'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = React.useContext(ApiContext)
  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
