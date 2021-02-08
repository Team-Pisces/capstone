import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import habits from './habits'
import plaid from './plaid'
import plaid2 from './plaid2'
import chart from './chart'
import singleHabit from './singleHabit'

const reducer = combineReducers({
  user,
  habits,
  plaid,
  plaid2,
  chart,
  singleHabit
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
