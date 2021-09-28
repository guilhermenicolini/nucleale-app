import React, { useState, useContext } from 'react'
import { Public, Field, Button, Spinner, LinkButton } from '@/presentation/components'
import * as S from './SignUp.styles'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

type FormData = {
  taxId: string
  name: string
  email: string
  mobilePhone: string
  birth: string
  password: string
  passwordConfirmation: string
}

type SignUpProps = {
  validation: Validation
  addAccount: AddAccount
}

export const SignUp: React.FC<SignUpProps> = ({ validation, addAccount }: SignUpProps) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const { register, getValues, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<FormData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false
  })

  const validateField = (field: string): string | boolean => {
    const error = validation.validate(field, getValues())
    return error ? error.message : true
  }

  const submit = async (data: any): Promise<void> => {
    if (state.isLoading || isSubmitting) {
      return
    }

    setState(s => ({ ...s, isLoading: true }))
    try {
      const account = await addAccount.add({
        taxId: data.taxId,
        name: data.name,
        email: data.email,
        mobilePhone: data.mobilePhone,
        birth: data.birth,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setState(s => ({ ...s, isLoading: false }))
    }
  }

  return (
    <Public>
      <FormContext.Provider value={{ state, setState }}>
        <S.Form onSubmit={handleSubmit(submit)} noValidate>
          <Field
            label="CPF"
            placeholder="Informe seu CPF"
            name="taxId"
            type="text"
            {...register('taxId', { validate: () => validateField('taxId') })}
            error={errors.taxId?.message}
            touched={isDirty} />
          <Field
            label="Nome"
            placeholder="Informe seu nome completo"
            name="name"
            type="text"
            {...register('name', { validate: () => validateField('name') })}
            error={errors.name?.message}
            touched={isDirty} />
          <Field
            label="E-mail"
            placeholder="Informe seu e-mail"
            name="email"
            type="email"
            {...register('email', { validate: () => validateField('email') })}
            error={errors.email?.message}
            touched={isDirty} />
          <Field
            label="Whatsapp"
            placeholder="Informe seu whatsapp"
            name="mobilePhone"
            type="text"
            {...register('mobilePhone', { validate: () => validateField('mobilePhone') })}
            error={errors.mobilePhone?.message}
            touched={isDirty} />
          <Field
            label="Nascimento"
            placeholder="dd/mm/aaaa"
            name="birth"
            type="date"
            {...register('birth', { validate: () => validateField('birth') })}
            error={errors.birth?.message}
            touched={isDirty} />
          <Field
            label="Senha"
            placeholder="Informe sua senha"
            name="password"
            type="password"
            {...register('password', { validate: () => validateField('password') })}
            error={errors.password?.message}
            touched={isDirty} />
          <Field
            label="Confirmar senha"
            placeholder="Repita a senha"
            name="passwordConfirmation"
            type="password"
            {...register('passwordConfirmation', { validate: () => validateField('passwordConfirmation') })}
            error={errors.passwordConfirmation?.message}
            touched={isDirty} />
          <Button type="submit" block disabled={!isValid} >Criar conta</Button>
          <LinkButton type="text" block to="/login">Voltar para login</LinkButton>
        </S.Form>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Public>
  )
}
