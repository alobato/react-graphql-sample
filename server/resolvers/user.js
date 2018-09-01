const jwt = require('jsonwebtoken')
const { combineResolvers } = require('graphql-resolvers')
const { AuthenticationError, UserInputError } = require('apollo-server')
const { isAuthenticated, isAdmin } = require('./authorization')

const createToken = async (user, secret, expiresIn) => {
  const { id, email, role } = user
  return await jwt.sign({ id, email, role }, secret, { expiresIn })
}

module.exports = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll()
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id)
    },
    me: async (parent, args, { models, me }) => {
      if (!me) return null
      return await models.User.findById(me.id)
    }
  },

  Mutation: {
    signUp: async (parent, { name, email, password }, { models, secret }) => {
      const user = await models.User.create({name, email, password})
      return { token: createToken(user, secret, '7d') }
    },
    signIn: async (parent, { email, password }, { models, secret }) => {
      const user = await models.User.findOne({where: { email: email }})
      if (!user) throw new UserInputError('No user found with this credentials.')
      const isValid = await user.validatePassword(password)
      if (!isValid) throw new AuthenticationError('Invalid password.')
      return { token: createToken(user, secret, '7d') }
    },
    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { name }, { models, me }) => {
        const user = await models.User.findById(me.id)
        return await user.update({ name })
      }
    ),
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({where: { id }})
      } 
    )
  }
}
