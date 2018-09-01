import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import * as routes from '../constants/routes'

const SIGN_UP = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SignUp = ({ history, refetch }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} refetch={refetch} />
  </div>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e, signUp) => {
    signUp()
      .then(async ({ data }) => {
        this.setState({ ...INITIAL_STATE });
        localStorage.setItem('token', data.signUp.token)
        await this.props.refetch()
        this.props.history.push(routes.LANDING)
      })
    e.preventDefault()
  }

  render() {
    const { name, email, password, passwordConfirmation } = this.state
    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '' ||
      name === '';

    return (
      <Mutation mutation={SIGN_UP} variables={{name, email, password}}>
        {(signUp, { data, loading, error }) => (
          <form onSubmit={e => this.onSubmit(e, signUp)}>
            <input
              name="name"
              value={name}
              onChange={this.onChange}
              type="text"
              placeholder="Name"
            />
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              autoComplete="email"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required="required"
            />
            <input
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              required="required"
            />
            <button disabled={isInvalid || loading} type="submit">Sign Up</button>

            {error && (<span>{error.message}</span>)}
          </form>
        )}
      </Mutation>
    )
  }
}


export default withRouter(SignUp)
