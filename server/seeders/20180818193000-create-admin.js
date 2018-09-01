module.exports = {
  up:  async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          name: 'Admin',
          email: 'admin@admin.com',
          password: '$2a$10$bQ9DXOhVcL697kxv1ABDlu9w.OvzRZZsO8FNevPJTKoqtPzOmTWnK',
          createdAt: '2018-04-04 21:40:32',
          updatedAt: '2018-04-04 21:40:32'
        }
      ], {})
  },

  down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Person', null, {});
  }
}
