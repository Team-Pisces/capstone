const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  habits: {
    type: Sequelize.JSON,
    defaultValue: {}
  },
  history: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Habit
