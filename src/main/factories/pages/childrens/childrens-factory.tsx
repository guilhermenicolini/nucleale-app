import { Childrens } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadChildrens, makeRemoteDeleteChildren } from '@/main/factories/usecases'
export const makeChildrens: React.FC = () => {
  return (
    <Childrens
      loadChildrens={makeRemoteLoadChildrens()}
      deleteChildren={makeRemoteDeleteChildren()} />
  )
}
