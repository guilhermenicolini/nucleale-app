import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { makeLogin } from '@/main/factories/pages'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="" exact>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
