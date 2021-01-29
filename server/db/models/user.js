const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  amountSaved: {
    type: Sequelize.INTEGER
  },
  // email: {
  //   type: Sequelize.STRING,
  //   unique: true,
  //   allowNull: false
  // },
  // password: {
  //   type: Sequelize.STRING,
  //   // Making `.password` act like a func hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option. This is going to the Moon!
  //   get() {
  //     return () => this.getDataValue('password')
  //   }
  // },
  // salt: {
  //   type: Sequelize.STRING,
  //   // Making `.salt` act like a function hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('salt')
  //   }
  // },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User
