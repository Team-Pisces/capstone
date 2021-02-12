import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {updateEmail} from '../store/user'

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
  const classes = useStyles()
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Email
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
              fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
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
                fullWidth
                name="confirmEmail"
                label="Confirm New Email Address"
                type="confirmEmail"
                id="confirmEmail"
                autoComplete="confirmEmail"
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
