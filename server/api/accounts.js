const router = require('express').Router()
module.exports = router

router.get('/accounts', function(request, response, next) {
  client.getAccounts(ACCESS_TOKEN, function(error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error)
      return response.json({
        error: error
      })
    }
    prettyPrintResponse(accountsResponse)
    response.json({error: null, accounts: accountsResponse})
  })
})
