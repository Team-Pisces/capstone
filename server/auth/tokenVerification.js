const verifyToken = (req, res, next) => {
  console.log('VERIFY REQ HEADERS', req.headers)
  const bearerHeader = req.headers.authorization

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')

    const bearerToken = bearer[1]

    req.token = bearerToken

    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = verifyToken
