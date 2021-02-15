import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {updatePassword} from '../store/user'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import {Redirect} from 'react-router-dom'
import {me} from '../store'
import {CardContent, Paper} from '@material-ui/core'

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
    <Container component="main" maxWidth="xs" style={{paddingTop: '150px'}}>
      <CssBaseline />
      <Paper>
        <CardContent>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form onSubmit={handleSubmit} noValidate name={name}>
            {current === false ? (
              <TextField
                variant="standard"
                margin="normal"
                required
                style={{width: '360px'}}
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
                style={{width: '360px'}}
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
                  style={{width: '360px'}}
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
                  style={{width: '360px'}}
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
                  style={{width: '360px'}}
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
                  style={{width: '360px'}}
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                />
              </>
            )}
            <Button type="submit" fullWidth variant="contained" color="primary">
              {displayName}
            </Button>
            {/* {error && error.response && <Paper> {error.response.data} </Paper>} */}
          </form>
          {redirect === true ? <Redirect to="/profile" /> : null}
        </CardContent>
      </Paper>
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
