import React, { useState } from 'react'
import { Private, Field, Button, Spinner, LinkButton } from '@/presentation/components'
import * as S from './AddMember.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { toast } from 'react-toastify'
import { InviteMember } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type FormData = {
  email: string
}

type AddMemberProps = {
  validation: Validation
  inviteMember: InviteMember
}

export const AddMember: React.FC<AddMemberProps> = ({ validation, inviteMember }: AddMemberProps) => {
  const { register, getValues, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<FormData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false,
    done: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, isLoading: false }))
    toast.error(error.message)
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
    inviteMember.invite(data.email)
      .then(() => {
        setState(s => ({ ...s, isLoading: false, done: true }))
      })
      .catch(handleError)
  }

  return (
    <Private>
      <S.Wrapper>
        <FormContext.Provider value={{ state, setState }}>
          <S.Form onSubmit={handleSubmit(submit)} noValidate>
            {!state.done
              ? <>
                <Field
                  label="E-mail"
                  placeholder="Informe o e-mail"
                  name="email"
                  type="email"
                  required
                  {...register('email', { validate: () => validateField('email') })}
                  error={errors.email?.message}
                  touched={isDirty} />
                <Button type="submit" block disabled={!isValid} >Convidar</Button>
              </>
              : <S.Message role="message">
                Convite salvo com sucesso. Crie uma conta usando o mesmo e-mail do convite para a mesma ser automaticamente vinculada à esta
              </S.Message>
            }
            <LinkButton type="text" block to="/family">Voltar para família</LinkButton>
          </S.Form>
          <Spinner isLoading={state.isLoading} />
        </FormContext.Provider>
      </S.Wrapper>
    </Private>
  )
}
