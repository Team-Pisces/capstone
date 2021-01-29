import axios from 'axios'

const GET_HABITS = 'GET_HABITS'

const getHabits = habits => ({
  type: GET_HABITS,
  habits
})

export const fetchHabits = () => {
  return async dispatch => {
    try {
      const {data: habits} = await axios.get('/api/habits')
      dispatch(getHabits(habits))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HABITS:
      return action.habits
    default:
      return state
  }
}
