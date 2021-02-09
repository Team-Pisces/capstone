const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  // process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  `postgres://postgres:cashedaws@aa1pyztiain0nww.clj42glswx3p.us-east-1.rds.amazonaws.com:5432/postgres`,
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
