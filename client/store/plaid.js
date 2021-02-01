import axios from 'axios'

const GET_LIABILITIES = 'GET_LIABILITIES'
const GET_ACCOUNTS = 'GET_ACCOUNTS'

const getLiabilities = liabilities => ({type: GET_LIABILITIES, liabilities})
const getBalance = balance => ({type: GET_LIABILITIES, balance})
const getAccounts = accounts => ({type: GET_ACCOUNTS, accounts})

export const fetchLiabilities = accessToken => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/liabilities', {
      accessToken: accessToken
    })
    dispatch(getLiabilities(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchBalance = accessToken => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/balance', {
      accessToken: accessToken
    })
    dispatch(getAccounts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAccounts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/plaid/accounts')
    dispatch(getAccounts(data))
  } catch (err) {
    console.error(err)
  }
}

const inititalState = {}

export default function(state = inititalState, action) {
  switch (action.type) {
    case GET_LIABILITIES:
      return {
        ...state,
        liabilities: action.liabilities
      }
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts
      }
    default:
      return state
  }
}
