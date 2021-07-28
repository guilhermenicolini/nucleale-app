import { Public, Field } from '@/presentation/components'

export const Login: React.FC = () => {
  return (
    <Public>
      <div>
        <Field type="email" label="E-mail" />
      </div>
    </Public>
  )
}
