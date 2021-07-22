import { FC } from 'react'
import { ToastContainer } from 'react-toastify'
import { useScreenSize } from '@/presentation/hooks'

const Container: FC = () => {
  const screen = useScreenSize()
  return <ToastContainer position={screen === 'mobile' ? 'bottom-center' : 'top-right'} />
}
export default Container
