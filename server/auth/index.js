const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router
const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('dotenv')

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

passport.use(
  new LocalStrategy(function(done) {
    User.findOne({email: req.body.email}, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'})
      }
      if (!user.validPassword(req.body.password)) {
        return done(null, false, {message: 'Incorrect password.'})
      }
      return done(null, user)
    })
  })
)

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  var token = jwt.sign(
    {id: req.user.id, firstName: req.user.firstName},
    process.env.JWT_SECRET
  )
  console.log(token)
  res.json({user: req.user, jwt: token})
})

router.use('/google', require('./google'))
