import axios from 'axios'
import {config} from '../app'

const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'
const REMOVE_TRANSACTIONS = 'REMOVE_TRANSACTIONS'

const gotTransactions = transactions => ({
  type: GOT_TRANSACTIONS,
  transactions
})

const addedTransaction = transaction => ({
  type: ADD_TRANSACTION,
  transaction
})

const removeTransactions = () => ({
  type: REMOVE_TRANSACTIONS
})

export const fetchTransactions = habitId => {
  return async dispatch => {
    try {
      const {data: transactions} = await axios.get(
        `/api/transactions?habitId=${habitId}`,
        config
      )
      dispatch(gotTransactions(transactions))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addTransaction = (title, amount, date, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        '/api/transactions',
        {
          title,
          amount,
          date,
          id
        },
        config
      )
      dispatch(addedTransaction(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const deleteTransactions = habitId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/transactions/${habitId}`)
      dispatch(removeTransactions())
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return action.transactions
    case ADD_TRANSACTION:
      return [...state, action.transaction]
    case REMOVE_TRANSACTIONS:
      return []
    default:
      return state
  }
}
