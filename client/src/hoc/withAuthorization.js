import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import * as routes from '../constants/routes'
import gql from 'graphql-tag'

const GET_ME = gql`
  {
    me {
      id
      name
      email
      role
    }
  }
`

const withAuthorization = conditionFn => Component => props => (
  <Query query={GET_ME}>
    {({ data, networkStatus }) => {
      if (networkStatus < 7) return null
      return conditionFn(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to={routes.SIGN_IN} />
      )
    }}
  </Query>
)

export default withAuthorization
