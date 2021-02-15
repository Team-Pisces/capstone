const router = require('express').Router()
const {Habit} = require('../db/models')
const jwt = require('jsonwebtoken')
const verifyToken = require('../auth/tokenVerification')
module.exports = router

// GET api/habits
router.get('/', async (req, res, next) => {
  try {
    const habits = await Habit.findAll()
    res.send(habits)
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

router.delete('/:id', async (req, res, next) => {
  try {
    await Habit.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send()
  } catch (error) {
    next(error)
  }
})
