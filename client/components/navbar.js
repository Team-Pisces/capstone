import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {logout} from '../store'
import {AppBar, Link, Typography, Toolbar, Button, Box} from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <Box display="relative">
    <AppBar style={{backgroundColor: '#42AC42'}}>
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Link variant="h4" href="/home" color="inherit" align="left">
            Cashed
          </Link>
        </Box>

        {isLoggedIn && user.plaidAccessToken ? (
          <>
            {/* The navbar will show these links after you log in */}
            <Button align="right" color="inherit" href="/habits">
              Habits
            </Button>
            <Button
              align="right"
              color="inherit"
              href="#"
              onClick={handleClick}
            >
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
    isLoggedIn: !!state.user.id,
    user: state.user
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
