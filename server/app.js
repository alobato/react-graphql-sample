if (process.env.NODE_ENV !== 'production') require('dotenv').load()

const http = require('http')

const cors = require('cors')
const express = require('express')
const jwt = require('jsonwebtoken')
const DataLoader = require('dataloader')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')

const index = require('./routes/index')

const models = require('./models/index')
const { Sequelize } = models
const Op = Sequelize.Op

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const batchUsers = (keys, models) => models.User.findAll({where: {id: {[Op.in]: keys}}})

const app = express()

app.use(require('express-status-monitor')())

app.use(cors())

app.use('/', index)

const getMe = async req => {
  let token
  if (req.headers['authorization']) token = req.headers['authorization']
  if (token) {
    try {
      if (token.includes('Bearer') || token.includes('bearer')) token = token.split(' ')[1]
      return await jwt.verify(token, process.env.SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    const message = error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '')
    return {...error, message}
  },
  context: async ({ req, connection }) => {
    const userLoader = new DataLoader(async keys => await batchUsers(keys, models))
    if (req) {
      const me = await getMe(req)
      const secret = process.env.SECRET
      return { models, me, secret, userLoader }
    }
  }
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
// server.installSubscriptionHandlers(httpServer)

const port = process.env.PORT || 8000
httpServer.listen({ port }, () => { console.log(`Apollo Server on http://localhost:${port}/graphql`) })

httpServer.on('error', onError)
httpServer.on('listening', onListening)

function onListening() {
  const addr = httpServer.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`Listening on ${bind}`)
}

function onError(error) {
  if (error.syscall !== 'listen') throw error
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}
