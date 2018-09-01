import React from 'react'
import { ApolloConsumer } from 'react-apollo'

import * as routes from '../constants/routes'
import history from '../constants/history'

const signOut = client => {
  localStorage.setItem('token', '')
  client.resetStore()
  history.push(routes.SIGN_IN)
}

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => signOut(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
)

export { signOut }

export default SignOutButton
