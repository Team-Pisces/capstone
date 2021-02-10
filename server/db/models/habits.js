const {ARRAY} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  name: {
    type: Sequelize.STRING
  },
  goal: {
    type: Sequelize.INTEGER
  },
  initialWeeklyAvg: {
    type: Sequelize.INTEGER
  }
})

module.exports = Habit

// what if user wants to update habit?
//
