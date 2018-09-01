import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

import { signOut } from './components/SignOut'

import App from './components/App'

const httpLink = createHttpLink({uri: 'http://localhost:8000/graphql'})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return { headers: {...headers, authorization: token ? `Bearer ${token}` : ''} }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message === 'NOT_AUTHENTICATED') signOut(client)
    })
  }
  if (networkError && networkError.statusCode === 401) signOut(client)
})

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink, errorLink]),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
