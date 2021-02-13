import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import habits from './habits'
import plaid2 from './plaid2'
import chart from './chart'
import singleHabit from './singleHabit'
import categories from './categories'
import transactions from './transactions'

const reducer = combineReducers({
  user,
  habits,
  plaid2,
  chart,
  singleHabit,
  categories,
  transactions
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
