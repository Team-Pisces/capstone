const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  habitName: {
    type: Sequelize.STRING
  },
  history: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Habit
