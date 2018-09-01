import React from 'react'

import withAuthorization from '../hoc/withAuthorization'

const Account = props => (
  <div>
    <h1>Account Page</h1>
  </div>
)

export default withAuthorization(session => session && session.me)(Account)
