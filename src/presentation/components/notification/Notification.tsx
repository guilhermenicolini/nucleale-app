import { FC } from 'react'
import { ToastContainer } from '../toastr/ToastContainer'
import { Spinner } from '../spinner/Spinner'

export const Notification: FC = () => {
  return (
    <>
      <ToastContainer />
      <Spinner />
    </>
  )
}
