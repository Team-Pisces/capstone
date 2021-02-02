import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/plaid/categories')
      dispatch(getCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
