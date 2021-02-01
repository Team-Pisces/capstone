import axios from 'axios'

const GET_BALANCE = 'GET_BALANCE'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_LIABILITIES = 'GET_LIABILITIES'

const inititalState = {
  balance: null,
  transactions: null,
  liabilities: null
}

// All routes require an access token which should be passed
// in as the only parameter to each respective thunk

const getBalance = balance => ({type: GET_BALANCE, balance})
const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})
const getLiabilities = liabilities => ({type: GET_LIABILITIES, liabilities})

export const fetchBalance = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/balance')
    dispatch(getBalance(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchTransactions = () => async dispatch => {
  try {
    console.log('Got here')
    const res = await axios.get('/api/plaid/transactions')
    dispatch(getTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchLiabilities = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/liabilities')
    dispatch(getLiabilities(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = inititalState, action) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state,
        balance: action.balance
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      }
    case GET_LIABILITIES:
      return {
        ...state,
        liabilities: action.liabilities
      }
    default:
      return state
  }
}
