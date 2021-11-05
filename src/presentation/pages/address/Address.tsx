import React, { useState, useEffect } from 'react'
import { Private, Field, FieldMask, Button, Spinner, Reload, Select } from '@/presentation/components'
import * as S from './Address.styles'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { Validation } from '@/presentation/protocols'
import { FindLocation, LoadAddress, SaveAddress } from '@/domain/usecases'
import { toast } from 'react-toastify'
import { useErrorHandler } from '@/presentation/hooks'
import { States, Cities } from '@/domain/models'

type SignUpProps = {
  validation: Validation
  loadAddress: LoadAddress
  findLocation: FindLocation
  saveAddress: SaveAddress
}

export const Address: React.FC<SignUpProps> = ({ validation, loadAddress, findLocation, saveAddress }: SignUpProps) => {
  const { register, getValues, watch, setValue, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<LoadAddress.Model>(
    { mode: 'all', defaultValues: { zip: '' } }
  )

  const [state, setState] = useState({
    isLoading: true,
    reload: false,
    search: false,
    error: '',
    lastValidZip: ''
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, isLoading: false, error: error.message }))
  })

  const validateField = (field: string): string | boolean => {
    const error = validation.validate(field, getValues())
    return error ? error.message : true
  }

  const submit = async (data: LoadAddress.Model): Promise<void> => {
    if (state.isLoading || isSubmitting) {
      return
    }

    setState(s => ({ ...s, isLoading: true }))
    try {
      data.city = Cities.find(c => c.value === data.cityId).label
      data.country = 'BR'
      await saveAddress.save(data)
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
        setState(old => ({ ...old, lastValidZip: data.zip }))
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

  const reload = (): void => setState(old => ({ ...old, error: '', reload: !old.reload }))

  useEffect(() => {
    const zip = watch('zip').replace(/[^0-9]/g, '')
    const oldZip = state.lastValidZip.replace(/[^0-9]/g, '')
    if (!validation.validate('zip', { zip }) && zip !== oldZip) {
      findLocation.find(zip)
        .then(data => {
          setState(old => ({ ...old, lastValidZip: zip }))
          if (!data) return
          setValue('address', data.address, { shouldValidate: true })
          setValue('number', '', { shouldValidate: true })
          setValue('complement', '', { shouldValidate: true })
          setValue('district', data.district, { shouldValidate: true })
          setValue('state', data.state, { shouldValidate: true })
          const city = Cities.find(c => c.label === data.city)
          if (city) {
            setValue('cityId', city.value, { shouldValidate: true })
          }
        })
    }
  }, [watch('zip')])

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
                items={States}
                {...register('state', { validate: () => validateField('state') })}
                error={errors.state?.message}
                touched={isDirty} />
              <Select
                label="Cidade"
                placeholder="Selecione a cidade"
                name="cityId"
                items={Cities}
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
