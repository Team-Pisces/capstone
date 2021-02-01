import axios from 'axios'

const GET_LIABILITIES = 'GET_LIABILITIES'

const inititalState = {}

const getLiabilities = liabilities => ({type: GET_LIABILITIES, liabilities})
const getBalance = liabilities => ({type: GET_LIABILITIES, liabilities})
const getAccounts = liabilities => ({type: GET_LIABILITIES, liabilities})

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
    dispatch(getAcounts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAccountInfo = accessToken => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/liabilities', {
      accessToken: accessToken
    })
    dispatch(getAcounts(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = inititalState, action) {
  switch (action.type) {
    case GET_LIABILITIES:
      return {
        ...state,
        liabilities: action.liabilities
      }
    default:
      return state
  }
}
