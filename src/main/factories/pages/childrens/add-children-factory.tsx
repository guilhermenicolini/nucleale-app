import { makeChildrenValidation } from '@/main/factories/pages'
import { AddChildren } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAddChildren } from '@/main/factories/usecases'

export const makeAddChildren: React.FC = () => {
  return (
    <AddChildren
      validation={makeChildrenValidation()}
      saveChildren={makeRemoteAddChildren()}
    />
  )
}
