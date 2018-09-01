const userType = require('../types/user')

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', userType(DataTypes))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}
