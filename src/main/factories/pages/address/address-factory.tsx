import { makeAddressValidation } from '@/main/factories/pages'
import { makeRemoteFindLocation, makeRemoteLoadAddress, makeRemoteSaveAddress } from '@/main/factories/usecases'
import { Address } from '@/presentation/pages'
import React from 'react'

export const makeAddress: React.FC = () => {
  return (
    <Address
      validation={makeAddressValidation()}
      loadAddress={makeRemoteLoadAddress()}
      findLocation={makeRemoteFindLocation()}
      saveAddress={makeRemoteSaveAddress()}
    />
  )
}
