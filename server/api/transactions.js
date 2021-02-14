const router = require('express').Router()
const {Transaction} = require('../db/models')
const jwt = require('jsonwebtoken')
const verifyToken = require('../auth/tokenVerification')
module.exports = router

// GET api/transactions
router.get('/', verifyToken, (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        const transactions = await Transaction.findAll()
        res.send(transactions)
      }
    })
  } catch (err) {
    next(err)
  }
})

// POST api/transactions
router.post('/', verifyToken, (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        console.log('req body', req.body)
        const transaction = await Transaction.findOrCreate({
          where: {
            title: req.body.title,
            amount: req.body.amount,
            date: req.body.date,
            habitId: req.body.id
          }
        })
        res.send(transaction)
      }
    })
  } catch (error) {
    next(error)
  }
})
