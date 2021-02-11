import React from 'react'
import {connect} from 'react-redux'
import {updatePassword} from '../store/user'

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

const UpdatePassword = props => {
  const classes = useStyles()
  const {name, displayName, handleSubmit, error} = props
  console.log(props)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Update Password
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
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            autoComplete="currentPassword"
            autoFocus
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="newPassword"
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
            type="confirmPassword"
            id="confirmPassword"
            autoComplete="confirmPassword"
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
    name: 'updatePassword',
    displayName: 'Update Password',
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const currentPassword = evt.target.currentPassword.value
      const newPassword = evt.target.newPassword.value
      const confirmPassword = evt.target.confirmPassword.value
      if (confirmPassword === newPassword) {
        dispatch(updatePassword(currentPassword, newPassword))
      } else {
        alert('Passwords do not match!')
      }
    }
  }
}
export default connect(mapUpdateEmail, mapDispatch)(UpdatePassword)
