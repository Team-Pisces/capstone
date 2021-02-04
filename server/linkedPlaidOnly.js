module.exports = (req, res, next) => {
  if (req.user.plaidAccessToken) next()
  else {
    const err = new Error('Please link Plaid Account')
    err.status = 401
    next(err)
  }
}
