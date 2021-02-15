const router = require('express').Router()
const {Transaction} = require('../db/models')
const jwt = require('jsonwebtoken')
const verifyToken = require('../auth/tokenVerification')
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
router.post('/', verifyToken, async (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        console.log('REQ INFORMATION ', req.body.habitId)
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

router.delete('/:id', async (req, res, next) => {
  console.log(req.params)
  try {
    await Transaction.destroy({
      where: {
        habitId: req.params.id
      }
    })
    res.send()
  } catch (error) {
    next(error)
  }
})
