import { Certificates } from '@/presentation/pages'
import React from 'react'
import { makeRemoteLoadCertificates, makeRemoteDownloadFile } from '@/main/factories/usecases'

export const makeCertificates: React.FC = () => {
  return (
    <Certificates
      loadCertificates={makeRemoteLoadCertificates()}
      downloadFile={makeRemoteDownloadFile('/me/certificates/:id/download')} />
  )
}
