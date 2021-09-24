import React, { useState } from 'react'
import { Public, Field, Button, LinkButton, Spinner } from '@/presentation/components'
import * as S from './Login.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import { toast } from 'react-toastify'

type FormData = {
  email: string
  password: string
}

type LoginProps = {
  validation: Validation
  authentication: Authentication
}

export const Login: React.FC<LoginProps> = ({ validation, authentication }: LoginProps) => {
  const { register, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<FormData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false
  })

  const validate = (field: string, value: string): string | boolean => {
    const error = validation.validate(field, { [field]: value })
    return error ? error.message : true
  }

  const submit = async (data: any): Promise<void> => {
    if (state.isLoading || isSubmitting) {
      return
    }

    setState(s => ({ ...s, isLoading: true }))
    try {
      const account = await authentication.auth({
        email: data.email,
        password: data.password
      })
      console.log('passou', account)
    } catch (err) {
      toast.error('Usuário ou senha inválida')
    } finally {
      setState(s => ({ ...s, isLoading: false }))
    }
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
            {...register('email', { validate: value => validate('email', value) })}
            error={errors.email?.message}
            touched={isDirty} />
          <Field
            label="Senha"
            placeholder="Informe sua senha"
            name="email"
            type="password"
            {...register('password', { validate: value => validate('password', value) })}
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
