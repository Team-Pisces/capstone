import axios from 'axios'

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

export const fetchTransactions = () => {
  return async dispatch => {
    try {
      const {data: transactions} = await axios.get('/api/plaid/transactions')
      dispatch(getTransactions(transactions))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}

export default transactionsReducer
