import { FC } from 'react'
import { ToastContainer as Container } from 'react-toastify'
import { useScreenSize } from '@/presentation/hooks'

export const ToastContainer: FC = () => {
  const screen = useScreenSize()
  return <Container position={screen === 'mobile' ? 'bottom-center' : 'top-right'} />
}
