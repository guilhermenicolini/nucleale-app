import React, { useState } from 'react'
import { Public, Field, Button, LinkButton, Spinner } from '@/presentation/components'
import * as S from './Login.styles'
import { FormContext } from '@/presentation/contexts'

export const Login: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    formValid: false
  })

  const submit = async (): Promise<void> => {
    setState(s => ({ ...s, isLoading: true }))
    setTimeout(() => {
      setState(s => ({ ...s, isLoading: false }))
    }, 2000)
  }

  return (
    <Public>
      <FormContext.Provider value={{ state, setState }}>
        <S.Form>
          <Field type="email" label="E-mail" />
          <Field type="password" label="Senha" />
          <Button type="submit" block disabled={!state.formValid} onClick={submit}>Entrar</Button>
          <Button variant="secondary" block>Criar Conta</Button>
          <LinkButton>Esqueceu sua senha?</LinkButton>
        </S.Form>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Public>
  )
}
