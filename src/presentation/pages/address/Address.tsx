import React, { useState } from 'react'
import { Public, Field, Button, Spinner } from '@/presentation/components'
import * as S from './Address.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { LoadAddress } from '@/domain/usecases'
import { toast } from 'react-toastify'

type SignUpProps = {
  validation: Validation
  loadAddress: LoadAddress
}

export const Address: React.FC<SignUpProps> = ({ validation, loadAddress }: SignUpProps) => {
  const { register, getValues, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<LoadAddress.Model>(
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
      toast.success('Endereço atualizado com sucesso')
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
            label="CEP"
            placeholder="Informe seu CEP"
            name="zip"
            type="text"
            required
            {...register('zip', { validate: () => validateField('zip') })}
            error={errors.zip?.message}
            touched={isDirty} />
          <Button type="submit" block disabled={!isValid} >Salvar</Button>
        </S.Form>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Public>
  )
}
