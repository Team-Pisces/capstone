const router = require('express').Router()
const {Habit} = require('../db/models')
module.exports = router

// GET api/habits
router.get('/', async (req, res, next) => {
  try {
    const habits = await Habit.findAll({
      where: {
        userId: req.user.id
      }
    })
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
      initialWeeklyAvg: req.body.transactions,
      userId: req.user.id
    })
    res.send(habit)
  } catch (err) {
    next(err)
  }
})
