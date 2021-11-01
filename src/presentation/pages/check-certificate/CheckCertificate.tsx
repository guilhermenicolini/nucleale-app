import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Public, Spinner, Reload } from '@/presentation/components'
import * as S from './CheckCertificate.styles'
import { ValidateCertificate } from '@/domain/usecases'
import moment from 'moment-timezone'

enum status {
  pending,
  valid,
  notValid,
  error
}

type CheckCertificateProps = {
  validateCertificate: ValidateCertificate
}

export const CheckCertificate: React.FC<CheckCertificateProps> = ({ validateCertificate }: CheckCertificateProps) => {
  const { hash } = useParams<{ hash: string}>()
  const [state, setState] = useState({
    isLoading: false,
    status: status.pending,
    certificate: null,
    reload: false
  })

  const reload = (): void => setState(old => ({ ...old, reload: !old.reload }))

  useEffect(() => {
    setState(s => ({ ...s, isLoading: true, status: status.pending, certificate: null }))
    validateCertificate.validate()
      .then((certificate) => {
        const result = certificate ? status.valid : status.notValid
        setState(old => ({ ...old, isLoading: false, status: result, certificate }))
      })
      .catch(() => setState(old => ({ ...old, isLoading: false, status: status.error })))
  }, [state.reload])

  return (
    <Public>
      <S.Wrapper>
        {[status.valid, status.notValid].includes(state.status) &&
          <S.Message role="message">
            {state.certificate &&
              <div>
                <p><span className="title">Certificado: </span><span>{state.certificate.hash}</span> <span className="valid">válido</span></p>
                <p><span className="title">Curso: </span><span>{state.certificate.course}</span></p>
                <p><span className="title">Emitido: </span><span>{moment(state.certificate.date).format('DD/MM/YYYY HH:mm')}</span></p>
              </div>
            }
            {!state.certificate &&
              <div>
                <p><span className="title">Certificado: </span><span>{hash}</span> <span className="invalid">inválido</span></p>
              </div>
            }
          </S.Message>
        }
        {state.status === status.error &&
          <Reload onReload={reload} message="Falha ao validar certificado" />
        }
      </S.Wrapper>
      <Spinner isLoading={state.isLoading} />
    </Public>
  )
}
