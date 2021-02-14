const router = require('express').Router()
const {Habit} = require('../db/models')
const jwt = require('jsonwebtoken')
const verifyToken = require('../auth/tokenVerification')
module.exports = router

// GET api/habits
router.get('/', verifyToken, (req, res, next) => {
  try {
    jwt.verify(req.token, process.env.JWT_SECRET, async (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        const habits = await Habit.findAll({
          where: {
            userId: req.user.id
          }
        })
        res.send(habits)
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET api/habits/:habitId
router.get('/:habitId', async (req, res, next) => {
  try {
    const habit = await Habit.findByPk(req.params.habitId)
    res.send(habit)
  } catch (err) {
    next(err)
  }
})

// POST api/habits
router.post('/', async (req, res, next) => {
  try {
    const habit = await Habit.create({
      name: req.body.name,
      goal: req.body.goal,
      initialWeeklyAvg: req.body.transactions * 100,
      userId: req.user.id
    })
    res.send(habit)
  } catch (err) {
    next(err)
  }
})
