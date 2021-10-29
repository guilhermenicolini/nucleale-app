import React from 'react'
import { Private, GridPage } from '@/presentation/components'
import { LoadCertificates, DownloadFile } from '@/domain/usecases'
import moment from 'moment-timezone'

type Props = {
  loadCertificates: LoadCertificates
  downloadFile: DownloadFile
}

export const Certificates: React.FC<Props> = ({ loadCertificates, downloadFile }: Props) => {
  const loadAll = async (): Promise<any> => {
    return await loadCertificates.loadAll().then(certificates => certificates.map(certificate => ({
      key: certificate.hash,
      title: certificate.name,
      subtitle: moment(certificate.date).format('DD/MM/YYYY'),
      content: certificate.course
    })))
  }

  const download = async (id: string): Promise<DownloadFile.Model> => {
    return await downloadFile.download(id)
  }

  return (
    <Private>
      <GridPage
        onLoad={loadAll}
        onDownload={download} />
    </Private>
  )
}
