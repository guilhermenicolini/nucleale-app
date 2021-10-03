import React, { useState, useEffect } from 'react'
import { Public, Field, Button, Spinner, LinkButton, Reload } from '@/presentation/components'
import * as S from './ChangePassword.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { toast } from 'react-toastify'
import { UpdatePassword, CheckPasswordRequest } from '@/domain/usecases'

type FormData = {
  password: string
  passwordConfirmation: string
}

enum status {
  pending,
  valid,
  notValid,
  error,
  done
}

type ChangePasswordProps = {
  validation: Validation
  checkPasswordRequest: CheckPasswordRequest
  updatePassword: UpdatePassword
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ validation, checkPasswordRequest, updatePassword }: ChangePasswordProps) => {
  const { register, getValues, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<FormData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false,
    status: status.pending,
    reload: false
  })

  const validateField = (field: string): string | boolean => {
    const error = validation.validate(field, getValues())
    return error ? error.message : true
  }

  const reload = (): void => setState(old => ({ ...old, reload: !old.reload }))

  useEffect(() => {
    setState(s => ({ ...s, isLoading: true, status: status.pending }))
    checkPasswordRequest.check()
      .then((valid) => setState(old => ({ ...old, isLoading: false, status: valid ? status.valid : status.notValid })))
      .catch(() => setState(old => ({ ...old, isLoading: false, status: status.error })))
  }, [state.reload])

  const submit = async (data: any): Promise<void> => {
    if (state.isLoading || isSubmitting) {
      return
    }

    setState(s => ({ ...s, isLoading: true }))
    try {
      await updatePassword.update({
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      })
      setState(s => ({ ...s, status: status.done }))
    } catch (err) {
      toast.error(err.message)
    } finally {
      setState(s => ({ ...s, isLoading: false }))
    }
  }

  return (
    <Public>
      <FormContext.Provider value={{ state, setState }}>
        <S.Wrapper>
          {state.status === status.valid &&
            <S.Form aria-label="form" onSubmit={handleSubmit(submit)} noValidate>
              <Field
                label="Senha"
                placeholder="Informe sua nova senha"
                name="password"
                type="password"
                required
                {...register('password', { validate: () => validateField('password') })}
                error={errors.password?.message}
                touched={isDirty} />
              <Field
                label="Confirmar senha"
                placeholder="Repita a senha"
                name="passwordConfirmation"
                type="password"
                required
                {...register('passwordConfirmation', { validate: () => validateField('passwordConfirmation') })}
                error={errors.passwordConfirmation?.message}
                touched={isDirty} />
              <Button type="submit" block disabled={!isValid} >Alterar senha</Button>
            </S.Form>
          }
          {state.status === status.notValid &&
            <S.Message role="message">
              Link de recuperação de senha inválido ou expirado
            </S.Message>
          }
          {state.status === status.done &&
            <S.Message role="message">
              Senha alterada com sucesso
            </S.Message>
          }
          {state.status === status.error &&
            <Reload onReload={reload} message="Falha ao buscar link" />
          }
          <S.Actions>
            <LinkButton type="text" block to="/login">Voltar para login</LinkButton>
          </S.Actions>
        </S.Wrapper>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Public>
  )
}
