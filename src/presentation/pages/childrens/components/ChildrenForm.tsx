import React, { useState, useEffect } from 'react'
import { Field, Button, Spinner, Reload, Select } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'
import { useForm } from 'react-hook-form'
import { useErrorHandler } from '@/presentation/hooks'
import { toast } from 'react-toastify'
import { Genders, ChildrenModel } from '@/domain/models'
import * as S from './ChildrenForm.styles'
import { Validation } from '@/presentation/protocols'
import { useHistory } from 'react-router-dom'
import moment from 'moment-timezone'

export type LoadData = {
  id: string
  name: string
  birth: string
  gender: string
}

export type SaveData = Omit<ChildrenModel, 'id'>

type Props = {
  validation: Validation
  onLoadChildren?: () => Promise<LoadData>
  onSaveChildren: (data: SaveData) => Promise<void>
}

export const ChildrenForm: React.FC<Props> = ({ validation, onLoadChildren, onSaveChildren }: Props) => {
  const history = useHistory()
  const { register, getValues, setValue, handleSubmit, formState: { isSubmitting, isValid, isDirty, errors } } = useForm<LoadData>(
    { mode: 'all' }
  )

  const [state, setState] = useState({
    isLoading: true,
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
      await onSaveChildren({
        name: data.name,
        birth: moment.utc(data.birth).valueOf(),
        gender: data.gender
      })
      history.replace('/childrens')
      toast.success('Ok')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setState(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    setState(old => ({ ...old, error: '', isLoading: true }))
    if (onLoadChildren) {
      onLoadChildren()
        .then(data => {
          setState(old => ({ ...old, error: '', isLoading: false }))
          if (!data) return
          setValue('name', data.name, { shouldValidate: true })
          setValue('gender', data.gender, { shouldValidate: true })
          setValue('birth', data.birth, { shouldValidate: true })
        })
        .catch(handleError)
    } else {
      setState(old => ({ ...old, error: '', isLoading: false }))
    }
  }, [state.reload])

  const reload = (): void => setState(old => ({ ...old, invoices: [], error: '', reload: !old.reload }))

  return (
    <FormContext.Provider value={{ state, setState }}>
        <S.Wrapper>
          {!state.isLoading && !state.error &&
            <S.Form onSubmit={handleSubmit(submit)} noValidate>
              <Field
                label="Nome"
                placeholder="Informe o nome completo"
                name="address"
                type="text"
                required
                {...register('name', { validate: () => validateField('name') })}
                error={errors.name?.message}
                touched={isDirty} />
              <Select
                label="Sexo"
                placeholder="Selecione o sexo"
                name="gender"
                items={Genders}
                {...register('gender', { validate: () => validateField('gender') })}
                error={errors.gender?.message}
                touched={isDirty} />
              <Field
                label="Nascimento / Provável parto"
                placeholder="dd/mm/aaaa"
                name="birth"
                type="date"
                required
                {...register('birth', { validate: () => validateField('birth') })}
                error={errors.birth?.message}
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
  )
}
