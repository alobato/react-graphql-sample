module.exports = {
  development: {
    database: 'react-graphql-sample-development',
    username: 'root',
    password: null,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    database: 'react-graphql-sample-test',
    username: 'root',
    password: null,
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    database: 'react-graphql-sample-production',
    username: 'root',
    password: process.env.DATABASE_PASSWORD,
    host: '127.0.0.1',
    dialect: 'mysql',
  }
}
