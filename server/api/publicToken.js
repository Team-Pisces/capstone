'use strict'
const util = require('util')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const plaid = require('plaid')
const router = express.Router()
require('dotenv').config()
const app = express()

module.exports = router

const APP_PORT = process.env.APP_PORT || 8080
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENV = process.env.PLAID_ENV
// We store the access_token in memory
// In production, store it in a secure persistent data store
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null
// Initialize the Plaid client
const client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments[PLAID_ENV],
  options: {version: '2018-05-22'}
})

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
router.get('/', function(request, response, next) {
  response.render('index.ejs', {
    PLAID_ENV: PLAID_ENV
  })
})
router.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      const msg = 'Could not exchange public_token!'
      console.log(msg + '\n' + JSON.stringify(error))
      return response.json({
        error: msg
      })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    ITEM_ID = tokenResponse.item_id
    prettyPrintResponse(tokenResponse)
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: false
    })
  })
})
