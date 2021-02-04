const router = require('express').Router()
const {Habit} = require('../db/models')
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

// POST api/habits
router.post('/', async (req, res, next) => {
  try {
    const habit = await Habit.create({
      name: req.body.name,
      goal: req.body.goal,
      userId: req.user.id
    })
    res.send(habit)
  } catch (err) {
    next(err)
  }
})
