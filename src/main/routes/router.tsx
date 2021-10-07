import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  makeLogin,
  makeSignUp,
  makeDashboard,
  makePasswordRecovery,
  makeChangePassword,
  makeInvoices,
  makeChildrens,
  makeMembers,
  makeAddress
} from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/sign-up" exact component={makeSignUp} />
        <Route path="/password-recovery" exact component={makePasswordRecovery} />
        <Route path="/change-password/:token?" exact component={makeChangePassword} />
        <PrivateRoute path="/" exact component={makeDashboard} />
        <PrivateRoute path="/invoices" exact component={makeInvoices} />
        <PrivateRoute path="/address" exact component={makeAddress} />
        <PrivateRoute path="/childrens" exact component={makeChildrens} />
        <PrivateRoute path="/family" exact component={makeMembers} />
      </Switch>
    </BrowserRouter>
  )
}
