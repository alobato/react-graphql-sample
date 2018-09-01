import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import * as routes from '../constants/routes'

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`

const SignIn = ({ history, refetch }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} refetch={refetch} />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
}

class SignInForm extends Component {
  state = { ...INITIAL_STATE }

  onChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  onSubmit = (event, signIn) => {
    signIn().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE })

      localStorage.setItem('token', data.signIn.token)

      await this.props.refetch()

      this.props.history.push(routes.LANDING)
    })

    event.preventDefault()
  }

  render() {
    const { email, password } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <Mutation mutation={SIGN_IN} variables={{ email, password }}>
        {(signIn, { data, loading, error }) => (
          <form onSubmit={event => this.onSubmit(event, signIn)}>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <button disabled={isInvalid || loading} type="submit">
              Sign In
            </button>

            {error && (<span>{error.message}</span>)}
          </form>
        )}
      </Mutation>
    )
  }
}

export default withRouter(SignIn)

export { SignInForm }
