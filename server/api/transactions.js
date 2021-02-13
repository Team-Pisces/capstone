const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

// GET api/transactions
router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        habitId: req.query.habitId
      }
    })
    res.send(transactions)
  } catch (err) {
    next(err)
  }
})

// POST api/transactions
router.post('/', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOrCreate({
      where: {
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
        habitId: req.body.id
      }
    })
    res.send(transaction)
  } catch (error) {
    next(error)
  }
})
