const Sequelize = require('sequelize')
const db = require('../db')

const UserHabit = db.define('user_habit', {
  goal: {
    type: Sequelize.INTEGER
  }
})

module.exports = UserHabit
