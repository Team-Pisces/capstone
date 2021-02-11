import React from 'react'
import {connect} from 'react-redux'
import {updateEmail} from '../store/user'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
  const classes = useStyles()
  const {name, displayName, handleSubmit, error} = props
  console.log(props)
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </Container>
  )
}

const mapUpdateEmail = state => {
  return {
    name: 'updateEmail',
    displayName: 'Update Email',
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const currentEmail = evt.target.currentEmail.value
      const newEmail = evt.target.newEmail.value
      const confirmEmail = evt.target.confirmEmail.value
      if (confirmEmail === newEmail) {
        dispatch(updateEmail(currentEmail, newEmail))
      } else {
        alert('Emails do not match!')
      }
    }
  }
}
export default connect(mapUpdateEmail, mapDispatch)(UpdateEmail)
