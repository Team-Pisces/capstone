import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {updatePassword} from '../store/user'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Redirect} from 'react-router-dom'
import {me} from '../store'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const UpdatePassword = props => {
  useEffect(
    () => {
      props.fetchEmail()
    },
    [me]
  )
  const email = props.email || []
  let [redirect, setRedirect] = useState(false)
  let [current, setCurrent] = useState(false)
  let [match, setMatch] = useState(false)
  const classes = useStyles()
  const {name, displayName, changePassword, error} = props
  const handleSubmit = evt => {
    evt.preventDefault()
    const currentEmail = evt.target.currentEmail.value
    const newPassword = evt.target.newPassword.value
    const confirmPassword = evt.target.confirmPassword.value
    if (
      email !== currentEmail &&
      (confirmPassword !== newPassword || confirmPassword === '')
    ) {
      setCurrent((current = true))
      setMatch((match = true))
    } else if (email !== currentEmail) {
      setCurrent((current = true))
      setMatch((match = false))
    } else if (confirmPassword !== newPassword || confirmPassword === '') {
      setCurrent((current = false))
      setMatch((match = true))
    } else {
      changePassword(currentEmail, newPassword)
      setRedirect((redirect = true))
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          noValidate
          name={name}
        >
          {current === false ? (
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="currentEmail"
              label="Your Email"
              name="currentEmail"
              autoComplete="currentEmail"
              autoFocus
            />
          ) : (
            <TextField
              variant="standard"
              margin="normal"
              required
              error
              helperText="Incorrect Current Email Address"
              fullWidth
              id="currentEmail"
              label="Your Email"
              name="currentEmail"
              autoComplete="currentEmail"
              autoFocus
            />
          )}
          {match === false ? (
            <>
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="newPassword"
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
              />
            </>
          ) : (
            <>
              <TextField
                variant="standard"
                margin="normal"
                required
                error
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="newPassword"
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                error
                helperText="Passwords Do Not Match"
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {displayName}
          </Button>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
        {redirect === true ? <Redirect to="/profile" /> : null}
      </div>
    </Container>
  )
}

const mapUpdatePassword = state => {
  return {
    name: 'updatePassword',
    displayName: 'Update Password',
    error: state.user.error,
    email: state.user.email
  }
}
const mapDispatch = dispatch => {
  return {
    changePassword: (currentEmail, newPassword) =>
      dispatch(updatePassword(currentEmail, newPassword)),
    fetchEmail: () => dispatch(me())
  }
}
export default connect(mapUpdatePassword, mapDispatch)(UpdatePassword)
