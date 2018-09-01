import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'

import Navigation from './Navigation'
import Admin from './Admin'
import Landing from './Landing'
import Account from './Account'
import SignUp from './SignUp'
import SignIn from './SignIn'
import withSession from '../hoc/withSession'

import * as routes from '../constants/routes'

import history from '../constants/history'

class App extends Component {

  render() {
    const { session, refetch } = this.props

    return (
      <Router history={history}>
        <div>
          <Navigation session={session} />
          <hr />
          <Route exact path={routes.SIGN_IN} component={() => <SignIn refetch={refetch} />} />
          <Route exact path={routes.LANDING} component={() => <Landing />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUp refetch={refetch} />} />
          <Route exact path={routes.ACCOUNT} component={() => <Account session={session} />} />
          <Route exact path={routes.ADMIN} component={() => <Admin session={session} />} />
        </div>
      </Router>
    )
  }
}

export default withSession(App)
