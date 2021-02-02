const router = require('express').Router()
const {Habit, User} = require('../db/models')
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
router.put('/', async (req, res, next) => {
  try {
    const model = await Habit.findOne({
      where: {
        userId: req.user.id
      }
    })
    await model.update(req.body)
    res.sendStatus(200)
    // console.log('Req.body', req.body)
    // const habit = await Habit.findOrCreate({
    //   where: {
    //     habitName: req.body.habit,
    //   },
    // })
    // const user = await User.findByPk(req.user.id)
    // const num = Number(req.body.goal)
    // await user.addHabit(habit, {through: {goal: num}})
    // res.send(habit)
  } catch (err) {
    next(err)
  }
})
