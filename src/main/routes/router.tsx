import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Login } from '@/presentation/pages'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="" exact>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
