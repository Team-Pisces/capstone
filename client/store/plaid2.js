import axios from 'axios'

const LOGIN_USER = 'LOGIN_USER'
const SIGNUP_USER = 'SIGNUP_USER'
const GENERATE_LINK_TOKEN = 'GENERATE_LINK_TOKEN'
const GENERATE_LINK_TRANSACTIONS = 'GENERATE_LINK_TRANSACTIONS'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_ACCOUNTS = 'GET_ACCOUNTS'
const GET_BALANCE = 'GET_BALANCE'

let initialState = {}

export const getAccounts = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/accounts')
    if (res.status === 200) {
      dispatch({
        type: GET_ACCOUNTS,
        payload: {rawAccounts: res.data}
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export const generateLinkTransactions = public_token => async dispatch => {
  const res = await axios.post('/api/plaid/set_access_token', {
    public_token
  })
  if (res.status === 200) {
    dispatch({
      type: GENERATE_LINK_TRANSACTIONS,
      payload: {transactions: res.data.transactions}
    })
  }
}

export const generateLinkToken = () => async dispatch => {
  const res = await axios.post('/api/plaid/create_link_token')
  console.log('Hit', res)
  if (res.status === 200) {
    dispatch({
      type: GENERATE_LINK_TOKEN,
      payload: {link_token: res.data.link_token}
    })
  }
}

export const getTransactions = () => async dispatch => {
  const res = await axios.get('/api/plaid/transactions')
  if (res.status === 200) {
    dispatch({
      type: GET_TRANSACTIONS,
      payload: {transactions: res.data}
    })
  }
}

export const getBalance = () => async dispatch => {
  const res = await axios.get('/api/plaid/balance')
  if (res.status === 200) {
    dispatch({
      type: GET_TRANSACTIONS,
      payload: {transactions: res.data}
    })
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload.rawAccounts
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions
      }
    case GET_BALANCE:
      return {
        ...state,
        balance: action.payload.balance
      }
    case GENERATE_LINK_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions
      }
    case GENERATE_LINK_TOKEN:
      return {
        ...state,
        link_token: action.payload.link_token
      }
    default:
      return state
  }
}
