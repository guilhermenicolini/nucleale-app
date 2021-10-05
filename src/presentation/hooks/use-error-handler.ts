import { useLogout } from '@/presentation/hooks'
import { UnauthorizedError } from '@/presentation/errors'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const logout = useLogout()

  return (error: Error): void => {
    if (error instanceof UnauthorizedError) {
      logout()
    } else {
      callback(error)
    }
  }
}
