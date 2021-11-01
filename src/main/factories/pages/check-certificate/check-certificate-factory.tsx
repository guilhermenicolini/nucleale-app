import { CheckCertificate } from '@/presentation/pages'
import React from 'react'
import { useParams } from 'react-router-dom'
import { makeRemoteValidateCertificate } from '@/main/factories/usecases'

export const makeCheckCertificate: React.FC = () => {
  const { hash } = useParams<{ hash: string}>()
  return (
    <CheckCertificate
      validateCertificate={makeRemoteValidateCertificate(hash)} />
  )
}
