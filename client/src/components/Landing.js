import React, { Fragment } from 'react'

import withSession from '../hoc/withSession'

const Landing = ({ session }) => (
  <Fragment>
    <h2>Home</h2>
    {session && session.me && (<span>{session.me.email}</span>)}
  </Fragment>
)

export default withSession(Landing)
