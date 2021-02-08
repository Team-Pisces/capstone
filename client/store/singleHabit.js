import axios from 'axios'

const GET_SINGLE_HABIT = 'GET_SINGLE_HABIT'

const getSingleHabit = singleHabit => ({
  type: GET_SINGLE_HABIT,
  singleHabit
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

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_HABIT:
      return action.singleHabit
    default:
      return state
  }
}
