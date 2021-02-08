import axios from 'axios'

const GENERATE_LINK_TOKEN = 'GENERATE_LINK_TOKEN'
const GENERATE_LINK_TRANSACTIONS = 'GENERATE_LINK_TRANSACTIONS'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_ACCOUNTS = 'GET_ACCOUNTS'
const GET_BALANCE = 'GET_BALANCE'

const genLinkToken = linkToken => ({
  type: GENERATE_LINK_TOKEN,
  linkToken
})

const genLinkTransactions = transactions => ({
  type: GENERATE_LINK_TRANSACTIONS,
  transactions
})

const setAccounts = accounts => ({
  type: GET_ACCOUNTS,
  accounts
})

const setTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

const setBalance = balance => ({
  type: GET_BALANCE,
  balance
})

let initialState = {}

export const getAccounts = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/accounts')
    if (res.status === 200) {
      dispatch(setAccounts(res.data))
    }
  } catch (error) {
    console.error(error)
  }
}

export const generateLinkTransactions = public_token => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/set_access_token', {
      public_token
    })
    if (res.status === 200) {
      dispatch(genLinkTransactions(res.data.transactions))
    }
  } catch (error) {
    console.error(error)
  }
}

export const generateLinkToken = () => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/create_link_token')
    if (res.status === 200) {
      dispatch(genLinkToken(res.data.link_token))
    }
  } catch (error) {
    console.error(error)
  }
}

export const getTransactions = () => async dispatch => {
  const res = await axios.get('/api/plaid/transactions')
  if (res.status === 200) {
    dispatch(setTransactions(res.data))
  }
}

export const getBalance = () => async dispatch => {
  const res = await axios.get('/api/plaid/balance')
  if (res.status === 200) {
    dispatch(setBalance(res.data))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      }
    case GET_BALANCE:
      return {
        ...state,
        balance: action.balance
      }
    case GENERATE_LINK_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      }
    case GENERATE_LINK_TOKEN:
      return {
        ...state,
        link_token: action.linkToken
      }
    default:
      return state
  }
}
