import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'
export const SIGNUP_USER = 'SIGNUP_USER'
export const GENERATE_LINK_TOKEN = 'GENERATE_LINK_TOKEN'
export const GENERATE_LINK_TRANSACTIONS = 'GENERATE_LINK_TRANSACTIONS'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const GET_ACCOUNTS = 'GET_ACCOUNTS'

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
  console.log('Hit')
  if (res.status === 200) {
    dispatch({
      type: GENERATE_LINK_TOKEN,
      payload: {link_token: res.data.link_token}
    })
  }
}

export const loginUser = (email, password, callback) => async dispatch => {
  const res = await axios.post('/api/plaid/login', {email, password})
  if (res.status === 200) {
    dispatch({
      type: LOGIN_USER,
      payload: {uid: res.data.id, isLoggedin: true}
    })

    generateLinkToken(res.data.id)
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

export const signupUser = (email, password) => async dispatch => {
  const res = await axios.post('/api/plaid/register', {email, password})
  if (res.status === 200) {
    dispatch({
      type: SIGNUP_USER,
      payload: {formCompleted: true}
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
    case LOGIN_USER:
      return {
        ...state,
        uid: action.payload.uid,
        isLoggedin: action.payload.isLoggedin
      }
    case SIGNUP_USER:
      return {
        ...state,
        formCompleted: action.payload.formCompleted
      }
    default:
      return state
  }
}