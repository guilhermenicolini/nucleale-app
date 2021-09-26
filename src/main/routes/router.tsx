import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeDashboard } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/sign-up" exact component={() => <div>Sign Up</div> } />
        <Route path="/password-recovey" exact component={() => <div>Password Recovey</div> } />
        <PrivateRoute path="/" exact component={makeDashboard} />
      </Switch>
    </BrowserRouter>
  )
}
