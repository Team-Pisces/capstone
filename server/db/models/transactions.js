const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Transaction
