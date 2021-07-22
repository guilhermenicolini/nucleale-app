import { toast } from 'react-toastify'
import Alert from '../alert/Alert'

export default class Toastr {
  show (message: string): void {
    toast(<Alert color="success" message={message} />)
  }
}
