import React from 'react'
import { Query } from 'react-apollo'
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

const withSession = Component => props => (
  <Query query={GET_ME}>
    {({ data, refetch }) => (
      <Component {...props} session={data} refetch={refetch} />
    )}
  </Query>
)

export default withSession
