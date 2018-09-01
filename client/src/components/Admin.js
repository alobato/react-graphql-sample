import React, { Component } from 'react'

import withAuthorization from '../hoc/withAuthorization'

class Admin extends Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
      </div>
    )
  }
}

export default withAuthorization(session => session && session.me && session.me.role === 'ADMIN')(Admin)
