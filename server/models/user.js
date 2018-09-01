const bcrypt = require('bcrypt')
const userType = require('../types/user')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', userType(DataTypes), {paranoid: true})

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
  })

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10
    return await bcrypt.hash(this.password, saltRounds)
  }

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
  }

  return User
}
