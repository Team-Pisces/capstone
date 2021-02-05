import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {AppBar, Typography, Toolbar, Button, Box} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Box display="relative">
    <AppBar style={{backgroundColor: 'green'}}>
      <Toolbar>
        {isLoggedIn ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Button color="inherit" href="/home">
              Home
            </Button>
            <Button color="inherit" href="/habits">
              Habits
            </Button>
            <Button color="inherit" href="/transactions">
              Transactions
            </Button>
            <Button color="inherit" href="/accounts">
              Accounts
            </Button>
            <Button color="inherit" href="#" onClick={handleClick}>
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* The navbar will show these links before you log in */}
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  </Box>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
