/* eslint-disable camelcase */
// read env vars from .env file
require('dotenv').config()

const util = require('util')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const plaid = require('plaid')
const {User} = require('../db/models')
const linkedPlaidOnly = require('../linkedPlaidOnly')

const APP_PORT = process.env.APP_PORT || 8080
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
const PLAID_SECRET = process.env.PLAID_SECRET
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox'

// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(',')

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',')

// Parameters used for the OAuth redirect Link flow.
//
// Set PLAID_REDIRECT_URI to 'http://localhost:8000/oauth-response.html'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || ''

// Parameter used for OAuth in Android. This should be the package name of your app,
// e.g. com.plaid.linksample
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || ''

// We store the access_token in memory - in production, store it in a secure
// persistent data store
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null
// The payment_id is only relevant for the UK Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store
let PAYMENT_ID = null

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: plaid.environments[PLAID_ENV],
  options: {
    version: '2019-05-29'
  }
})

const app = express()
app.use(express.static('public'))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

const router = express.Router()

router.get('/', function(request, response, next) {
  response.sendFile('../../public/index.html', {root: __dirname})
})

// This is an endpoint defined for the OAuth flow to redirect to.
router.get('/oauth-response.html', function(request, response, next) {
  response.sendFile('../../public/oauth-response.html', {root: __dirname})
})

router.post('/info', function(request, response, next) {
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: PLAID_PRODUCTS
  })
})

// Create a link token with configs which we can then use to initialize Plaid Link client-side.
// See https://plaid.com/docs/#create-link-token
router.post('/create_link_token', (req, res, next) => {
  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: req.user.dataValues.googleId
    },
    client_name: 'Cashed',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en'
  }

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = process.env.PLAID_REDIRECT_URI
  }

  if (PLAID_ANDROID_PACKAGE_NAME !== '') {
    configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME
  }

  client.createLinkToken(configs, (error, createTokenResponse) => {
    if (error !== null) {
      console.error(error)
      return res.json({
        error: error
      })
    }
    res.json(createTokenResponse)
  })
})

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
router.post('/set_access_token', (request, response, next) => {
  PUBLIC_TOKEN = request.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, async (error, tokenResponse) => {
    if (error !== null) {
      console.log(error)
      return response.json({
        error
      })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    const user = await User.findByPk(request.user.id)
    user.plaidAccessToken = ACCESS_TOKEN
    await user.save()
    ITEM_ID = tokenResponse.item_id
    console.log(tokenResponse)
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null
    })
  })
})

router.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, async function(
    error,
    tokenResponse
  ) {
    if (error !== null) {
      var msg = 'Could not exchange public_token!'
      console.log(msg + '\n' + JSON.stringify(error))
      return response.json({
        error: msg
      })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    const user = await User.findByPk(request.user.id)
    user.plaidAccessToken = ACCESS_TOKEN
    await user.save()
    ITEM_ID = tokenResponse.item_id
    console.log(tokenResponse)
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: false
    })
  })
})

router.get('/accounts', linkedPlaidOnly, async (req, res, next) => {
  try {
    const response = await client.getAccounts(req.body.plaidAccessToken)
    res.send(response.accounts)
  } catch (error) {
    next(error)
  }
})

// For specific information on how to query this
// data visit the docs @ https://plaid.com/docs/api/products/#transactions
router.get('/transactions', linkedPlaidOnly, async (req, res, next) => {
  try {
    const startDate = moment()
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    const endDate = moment().format('YYYY-MM-DD')
    const response = await client.getTransactions(
      req.user.plaidAccessToken,
      startDate,
      endDate
    )
    console.log(response.transactions)
    res.send(response.transactions)
  } catch (error) {
    next(error)
  }
})

// For specific information on how to query this
// data visit the docs @ https://plaid.com/docs/api/products/#balance
router.get('/balance', linkedPlaidOnly, async (req, res, next) => {
  try {
    const response = await client.getBalance(req.user.plaidAccessToken)
    res.send(response.accounts)
  } catch (error) {
    next(error)
  }
})

// For specific information on how to query this
// data visit the docs @ https://plaid.com/docs/api/products/#liabilities
router.get('/liabilities', async (req, res, next) => {
  try {
    const response = await client.getLiabilities(req.user.plaidAccessToken)
    res.send(response.liabilities)
  } catch (error) {
    next(error)
  }
})

router.get('/categories', async (req, res, next) => {
  try {
    const response = await client.getCategories()
    res.send(response.categories)
  } catch (error) {
    next(error)
  }
})

module.exports = router
