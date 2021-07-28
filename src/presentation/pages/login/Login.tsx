import { Public, Field, Button, LinkButton } from '@/presentation/components'
import * as S from './Login.styles'

export const Login: React.FC = () => {
  return (
    <Public>
      <S.Form>
        <Field type="email" label="E-mail" />
        <Field type="password" label="Senha" />
        <Button block>Entrar</Button>
        <Button variant="secondary" block>Criar Conta</Button>
        <LinkButton>Esqueceu sua senha?</LinkButton>
      </S.Form>
    </Public>
  )
}
