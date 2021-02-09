import axios from 'axios'
import config from '../app'

const GET_HABITS = 'GET_HABITS'
const ADD_HABIT = 'ADD_HABIT'

const getHabits = habits => ({
  type: GET_HABITS,
  habits
})

const addedHabit = habit => ({
  type: ADD_HABIT,
  habit
})

export const fetchHabits = () => {
  return async dispatch => {
    try {
      const {data: habits} = await axios.get('/api/habits', config)
      dispatch(getHabits(habits))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addHabit = habit => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/habits', habit, config)
      dispatch(addedHabit(data))
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
    case ADD_HABIT:
      return [...state, action.habit]
    default:
      return state
  }
}
