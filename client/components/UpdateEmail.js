import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateEmail} from '../store/user'
import {
  CardContent,
  Paper,
  TextField,
  Typography,
  Container,
  Button,
  CssBaseline
} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import {me} from '../store'

const UpdateEmail = props => {
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
  const {name, displayName, changeEmail, error} = props
  const handleSubmit = evt => {
    evt.preventDefault()
    const currentEmail = evt.target.currentEmail.value
    const newEmail = evt.target.newEmail.value
    const confirmEmail = evt.target.confirmEmail.value
    if (
      email !== currentEmail &&
      (confirmEmail !== newEmail || confirmEmail === '')
    ) {
      setCurrent((current = true))
      setMatch((match = true))
    } else if (email !== currentEmail) {
      setCurrent((current = true))
      setMatch((match = false))
    } else if (confirmEmail !== newEmail || confirmEmail === '') {
      setCurrent((current = false))
      setMatch((match = true))
    } else {
      changeEmail(currentEmail, newEmail)
      setRedirect((redirect = true))
    }
  }
  return (
    <Container component="main" maxWidth="xs" style={{paddingTop: '150px'}}>
      <CssBaseline />
      <Paper>
        <CardContent>
          <Typography component="h1" variant="h5">
            Update Email
          </Typography>
          <form onSubmit={handleSubmit} noValidate name={name}>
            {current === false ? (
              <TextField
                variant="standard"
                margin="normal"
                required
                style={{width: '360px'}}
                id="currentEmail"
                label="Current Email Address"
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
                label="Current Email Address"
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
                  name="newEmail"
                  label="New Email Address"
                  type="newEmail"
                  id="newEmail"
                  autoComplete="newEmail"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  style={{width: '360px'}}
                  name="confirmEmail"
                  label="Confirm New Email Address"
                  type="confirmEmail"
                  id="confirmEmail"
                  autoComplete="confirmEmail"
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
                  name="newEmail"
                  label="New Email Address"
                  type="newEmail"
                  id="newEmail"
                  autoComplete="newEmail"
                />
                <TextField
                  variant="standard"
                  margin="normal"
                  required
                  error
                  helperText="New Emails Do Not Match"
                  style={{width: '360px'}}
                  name="confirmEmail"
                  label="Confirm New Email Address"
                  type="confirmEmail"
                  id="confirmEmail"
                  autoComplete="confirmEmail"
                />
              </>
            )}

            {/* {error && error.response && <Paper> {error.response.data} </Paper>} */}
            <Button type="submit" fullWidth variant="contained" color="primary">
              {displayName}
            </Button>
          </form>
          {redirect === true ? <Redirect to="/profile" /> : null}
        </CardContent>
      </Paper>
    </Container>
  )
}

const mapUpdateEmail = state => {
  return {
    name: 'updateEmail',
    displayName: 'Update Email',
    error: state.user.error,
    email: state.user.email
  }
}
const mapDispatch = dispatch => {
  return {
    changeEmail: (currentEmail, newEmail) =>
      dispatch(updateEmail(currentEmail, newEmail)),
    fetchEmail: () => dispatch(me())
  }
}
export default connect(mapUpdateEmail, mapDispatch)(UpdateEmail)
