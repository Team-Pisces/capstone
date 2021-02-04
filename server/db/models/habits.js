const {ARRAY} = require('sequelize')
const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  name: {
    type: Sequelize.STRING
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  goal: {
    type: Sequelize.INTEGER
  },
  initialWeeklyAvg: {
    type: Sequelize.INTEGER
  },
  history: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Habit

// what if user wants to update habit?
//
