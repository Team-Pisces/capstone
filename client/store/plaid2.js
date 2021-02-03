import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'
export const SIGNUP_USER = 'SIGNUP_USER'
export const GENERATE_LINK_TOKEN = 'GENERATE_LINK_TOKEN'
export const GENERATE_LINK_TRANSACTIONS = 'GENERATE_LINK_TRANSACTIONS'
export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const GET_ACCOUNTS = 'GET_ACCOUNTS'

export const getAccounts = (uid, callback) => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/accounts', {uid})
    if (res.status === 200) {
      dispatch({
        type: GET_ACCOUNTS,
        payload: {rawAccounts: res.data.accounts}
      })

      if (callback) {
        callback(res.data.accounts)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const generateLinkTransactions = (
  public_token,
  uid,
  callback
) => async dispatch => {
  const res = await axios.post('/api/plaid/get_access_token', {
    public_token,
    uid
  })
  if (res.status === 200) {
    dispatch({
      type: GENERATE_LINK_TRANSACTIONS,
      payload: {transactions: res.data.transactions}
    })

    if (callback) {
      callback(uid)
    }
  }
}

export const generateLinkToken = uid => async dispatch => {
  console.log(uid)
  const res = await axios.post('/api/plaid/create_link_token', {uid})
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

export const getTransactions = (uid, callback) => async dispatch => {
  const res = await axios.post('/api/plaid/transactions', {uid})
  if (res.status === 200) {
    dispatch({
      type: GET_TRANSACTIONS,
      payload: {transactions: res.data.transactions}
    })

    if (callback) {
      callback(res.data.transactions)
    }
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
        rawAccounts: action.payload.rawAccounts
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
