const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.currentEmail
      }
    })
    if (user) {
      if (req.body.newEmail) {
        await user.update({
          email: req.body.newEmail
        })
      }
      if (req.body.newPassword) {
        await user.update({
          password: req.body.newPassword
        })
      }
      res.send(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
