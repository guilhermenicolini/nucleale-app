import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeDashboard } from '@/main/factories/pages'
import { PrivateRoute, Private } from '@/presentation/components'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/sign-up" exact component={() => <div>Sign Up</div> } />
        <Route path="/password-recovery" exact component={() => <div>Password Recovey</div> } />
        <PrivateRoute path="/" exact component={makeDashboard} />
        <PrivateRoute path="/invoices" exact component={() => <Private><div>Notas Fiscais</div></Private> } />
        <PrivateRoute path="/address" exact component={() => <Private><div>Endereço</div></Private> } />
        <PrivateRoute path="/childrens" exact component={() => <Private><div>Filhos</div></Private> } />
        <PrivateRoute path="/family" exact component={() => <Private><div>Família</div></Private> } />
      </Switch>
    </BrowserRouter>
  )
}
