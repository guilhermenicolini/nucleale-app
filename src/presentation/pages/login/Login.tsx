import React, { useState } from 'react'
import { Public, Field, Button, LinkButton, Spinner } from '@/presentation/components'
import * as S from './Login.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const { register, handleSubmit, formState: { isValid, isDirty, errors } } = useForm<FormData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false,
    formValid: true
  })

  const submit = async (data: any): Promise<void> => {
    setState(s => ({ ...s, isLoading: true }))
    setTimeout(() => {
      setState(s => ({ ...s, isLoading: false }))
    }, 2000)
  }

  return (
    <Public>
      <FormContext.Provider value={{ state, setState }}>
        <S.Form onSubmit={handleSubmit(submit)} noValidate>
          <Field
            label="E-mail"
            placeholder="Informe seu e-mail"
            name="email"
            type="email"
            {...register('email', { required: 'Campo obrigatório' })}
            error={errors.email?.message}
            touched={isDirty} />
          <Field
            label="Senha"
            placeholder="Informe sua senha"
            name="email"
            type="password"
            {...register('password', { required: 'Campo obrigatório' })}
            error={errors.password?.message}
            touched={isDirty} />
          <Button type="submit" block disabled={!isValid} >Entrar</Button>
          <Button variant="secondary" block>Criar Conta</Button>
          <LinkButton>Esqueceu sua senha?</LinkButton>
        </S.Form>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Public>
  )
}
