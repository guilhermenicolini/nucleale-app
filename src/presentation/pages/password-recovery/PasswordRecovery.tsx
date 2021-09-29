import React, { useState } from 'react'
import { Public, Field, Button, Spinner, LinkButton } from '@/presentation/components'
import * as S from './PasswordRecovery.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { toast } from 'react-toastify'
import { RecoverAccount } from '@/domain/usecases'

type FormData = {
  email: string
}

type PasswordRecoveryProps = {
  validation: Validation
  recoverAccount: RecoverAccount
}

export const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({ validation, recoverAccount }: PasswordRecoveryProps) => {
  const { register, getValues, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<FormData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false,
    done: false
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
      await recoverAccount.recover(data.email)
      setState(s => ({ ...s, done: true }))
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
          {!state.done
            ? <>
              <Field
                label="E-mail"
                placeholder="Informe seu e-mail"
                name="email"
                type="email"
                required
                {...register('email', { validate: () => validateField('email') })}
                error={errors.email?.message}
                touched={isDirty} />
              <Button type="submit" block disabled={!isValid} >Recuperar senha</Button>
            </>
            : <S.Message role="message">
              Acabamos de enviar um e-mail ou uma mensagem em seu whatsapp contendo um link para alterar sua senha. Caso não receba, entre em contato conosco.
            </S.Message>
          }
          <LinkButton type="text" block to="/login">Voltar para login</LinkButton>
        </S.Form>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Public>
  )
}
