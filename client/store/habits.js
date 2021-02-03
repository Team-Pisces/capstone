import axios from 'axios'

const GET_HABITS = 'GET_HABITS'
const ADD_HABIT = 'ADD_HABIT'

const getHabits = habits => ({
  type: GET_HABITS,
  habits
})

const addedHabit = habits => ({
  type: ADD_HABIT,
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

export const addHabit = habit => {
  return async dispatch => {
    try {
      // const habits = await axios.get('/api/habits');
      // for (let i = 0; i < habits.length; i++) {
      //   if (habit.name === )
      // }
      const {data} = await axios.get('/api/habits')
      console.log(data)
      data.habits.push(habit)
      await axios.put('/api/habits', data)
      dispatch(addedHabit(data.habits))
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
      return action.habits
    default:
      return state
  }
}
