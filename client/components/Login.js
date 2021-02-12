import React from 'react'
import {connect} from 'react-redux'
import {auth1} from '../store'
import {
  Card,
  CardContent,
  FormGroup,
  Typography,
  Grid,
  Box,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Avatar,
  Button
} from '@material-ui/core'

const LogIn = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Box display="flex" justifyContent="center" paddingTop="20vh">
      <Grid display="flex" justify="center" container>
        <Grid item xs={5}>
          <Box width="33vw">
            <Card
              style={{
                margin: '10px, 10px, 10px, 10px',
                height: '300px',
                backgroundColor: '#42AC42'
              }}
            >
              <CardContent>
                <Typography style={{color: 'white'}} variant="h5">
                  Welcome to Cashed!
                </Typography>
                <Box padding="20px, 20px, 20px, 20px">
                  <Typography style={{color: 'white'}}>
                    some description about the cashed app
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box width="33vw">
            <Card style={{margin: '10px, 10px, 10px, 10px'}}>
              <CardContent display="flex">
                <Avatar style={{backgroundColor: '#42AC42'}} />
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <form onSubmit={handleSubmit} noValidate name={name}>
                  <FormGroup>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {displayName}
                    </Button>
                    <Grid container>
                      <Grid item xs={12}>
                        <Link href="/signup" variant="body2">
                          Don't have an account? Sign Up
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Link href="/auth/google" variant="body2">
                          Login with Google
                        </Link>
                      </Grid>
                    </Grid>
                    {error &&
                      error.response && <div> {error.response.data} </div>}
                  </FormGroup>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const mapSignin = state => {
  return {
    name: 'login',
    displayName: 'Log In',
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth1(email, password, formName))
    }
  }
}
export const Login = connect(mapSignin, mapDispatch)(LogIn)
