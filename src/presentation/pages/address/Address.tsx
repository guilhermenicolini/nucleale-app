import React, { useState, useEffect } from 'react'
import { Private, Field, FieldMask, Button, Spinner, Reload, Select } from '@/presentation/components'
import * as S from './Address.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { LoadAddress } from '@/domain/usecases'
import { toast } from 'react-toastify'
import { useErrorHandler } from '@/presentation/hooks'

type SignUpProps = {
  validation: Validation
  loadAddress: LoadAddress
}

export const Address: React.FC<SignUpProps> = ({ validation, loadAddress }: SignUpProps) => {
  const { register, getValues, watch, setValue, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<LoadAddress.Model>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: false,
    reload: false,
    error: ''
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, isLoading: false, error: error.message }))
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
      data.city = cities.find(c => c.value === data.cityId).label
      toast.success('Endereço atualizado com sucesso')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setState(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    setState(old => ({ ...old, error: '', isLoading: true }))
    loadAddress.load()
      .then(data => {
        setState(old => ({ ...old, error: '', isLoading: false }))
        if (!data) return
        setValue('zip', data.zip, { shouldValidate: true })
        setValue('address', data.address, { shouldValidate: true })
        setValue('number', data.number, { shouldValidate: true })
        setValue('complement', data.complement, { shouldValidate: true })
        setValue('district', data.district, { shouldValidate: true })
        setValue('state', data.state, { shouldValidate: true })
        setValue('cityId', data.cityId, { shouldValidate: true })
      })
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => setState(old => ({ ...old, invoices: [], error: '', reload: !old.reload }))

  const states = [
    {
      value: 'SP',
      label: 'São Paulo'
    }
  ]

  const cities = [
    { value: 6175, label: 'Campinas' },
    { value: 6357, label: 'Cosmópolis' },
    { value: 6595, label: 'Jaguariúna' },
    { value: 6831, label: 'Paulínia' },
    { value: 7107, label: 'São Paulo' },
    { value: 7149, label: 'Sumaré' },
    { value: 7225, label: 'Valinhos' },
    { value: 7237, label: 'Vinhedo' }
  ]

  return (
    <Private>
      <FormContext.Provider value={{ state, setState }}>
        <S.Wrapper>
          {!state.isLoading && !state.error &&
            <S.Form onSubmit={handleSubmit(submit)} noValidate>
              <FieldMask
                label="CEP"
                placeholder="Informe o CEP"
                name="zip"
                type="text"
                mask="99999-999"
                value={watch('zip')}
                required
                {...register('zip', { validate: () => validateField('zip') })}
                error={errors.zip?.message}
                touched={isDirty} />
              <Field
                label="Endereço"
                placeholder="Informe o endereço"
                name="address"
                type="text"
                required
                {...register('address', { validate: () => validateField('address') })}
                error={errors.address?.message}
                touched={isDirty} />
              <Field
                label="Número"
                placeholder="Informe o número"
                name="number"
                type="text"
                required
                {...register('number', { validate: () => validateField('number') })}
                error={errors.number?.message}
                touched={isDirty} />
              <Field
                label="Complemento"
                placeholder="Informe o complemento"
                name="complement"
                type="text"
                {...register('complement', { validate: () => true })} />
              <Field
                label="Bairro"
                placeholder="Informe o bairro"
                name="district"
                type="text"
                required
                {...register('district', { validate: () => validateField('district') })}
                error={errors.district?.message}
                touched={isDirty} />
              <Select
                label="Estado"
                placeholder="Selecione o estado"
                name="state"
                items={states}
                {...register('state', { validate: () => validateField('state') })}
                error={errors.state?.message}
                touched={isDirty} />
              <Select
                label="Cidade"
                placeholder="Selecione a cidade"
                name="cityId"
                items={cities}
                {...register('cityId', { validate: () => validateField('cityId') })}
                error={errors.cityId?.message}
                touched={isDirty} />
              <Button type="submit" block disabled={!isValid} >Salvar</Button>
            </S.Form>
          }
          {state.error &&
            <S.Content>
              <Reload onReload={reload} message={state.error}/>
            </S.Content>
          }
        </S.Wrapper>
        <Spinner isLoading={state.isLoading} />
      </FormContext.Provider>
    </Private>
  )
}
