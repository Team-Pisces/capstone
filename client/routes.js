import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  HabitForm,
  Transactions,
  AccountsPage,
  Balance,
  Link,
  SingleHabit,
  AllHabits,
  UserProfile,
  UpdateEmail,
  UpdatePassword,
  TransactionTable
} from './components'
import {me} from './store'
// import SignUp from './components/SignUp'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {isLoggedIn ? (
          <Route exact path="/" component={UserHome} />
        ) : (
          <Route exact path="/" component={Login} />
        )}
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        {/* <Route path="/signup" component={Signup} /> */}
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/link" component={Link} />
            <Route path="/home" component={UserHome} />
            <Route path="/habitform" component={HabitForm} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/balance" component={Balance} />
            <Route path="/accounts" component={AccountsPage} />
            <Route exact path="/habits" component={AllHabits} />
            <Route path="/habits/:habitId" component={SingleHabit} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/updateEmail" component={UpdateEmail} />
            <Route path="/updatePassword" component={UpdatePassword} />
            <Route path="/transactionTable" component={TransactionTable} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
