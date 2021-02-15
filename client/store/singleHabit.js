import axios from 'axios'

const GET_SINGLE_HABIT = 'GET_SINGLE_HABIT'
const REMOVE_HABIT = 'REMOVE_HABIT'

const getSingleHabit = singleHabit => ({
  type: GET_SINGLE_HABIT,
  singleHabit
})

const removeHabit = id => ({
  type: REMOVE_HABIT,
  id
})

export const fetchSingleHabit = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/habits/${id}`)
      dispatch(getSingleHabit(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteHabit = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/habits/${id}`)
      dispatch(removeHabit(id))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_HABIT:
      return action.singleHabit
    case REMOVE_HABIT:
      return {}
    default:
      return state
  }
}
