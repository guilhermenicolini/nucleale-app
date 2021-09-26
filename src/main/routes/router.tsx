import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeDashboard } from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <PrivateRoute path="/" exact component={makeDashboard} />
      </Switch>
    </BrowserRouter>
  )
}
