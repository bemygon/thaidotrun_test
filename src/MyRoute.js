import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PageChart from './PageChart'
import PageLanding from './PageLanding'

const MyRoute = () =>
  <div>
  
      <Switch>
        <Route exact path={'/'} component={PageLanding} />
        <Route exact path={'/chart'} component={PageChart} />
      </Switch>
    
  </div>

export default MyRoute

