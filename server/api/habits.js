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
