import axios from 'axios'

const GET_WEEKLY_AVG = 'GET_WEEKLY_AVG'

const getWeeklyAvg = weeklyAvg => ({
  type: GET_WEEKLY_AVG,
  weeklyAvg
})

export const fetchWeeklyAvg = habitId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/habits/${habitId}`)
      const weeklyAvg = data.initialWeeklyAvg / 100
      dispatch(getWeeklyAvg(weeklyAvg))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WEEKLY_AVG:
      return action.weeklyAvg
    default:
      return state
  }
}
