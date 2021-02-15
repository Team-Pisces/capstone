import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  SvgIcon
} from '@material-ui/core'
import {Redirect} from 'react-router-dom'
import Link from './Link'
import CardImage from '../images/undraw01.svg'
/**
 * COMPONENT
 */

export const UserHome = props => {
  const {user} = props
  return (
    <Box width="100vw">
      {user.plaidAccessToken !== null ? (
        <Redirect
          to={{
            pathname: `/profile`
          }}
        />
      ) : null}
      <Grid display="flex" justify="center" container>
        <Grid item xs={5}>
          <Box display="flex" paddingTop="20vh" justifyContent="center">
            <SvgIcon style={{fontSize: 500}} viewBox="0 0 1000 1000">
              <CardImage />
            </SvgIcon>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box
            display="flex"
            paddingTop="20vh"
            justifyContent="center"
            height="300px"
            width="33vw"
          >
            <Card
              style={{backgroundColor: '#42AC42', height: '300px'}}
              width="33vw"
            >
              <CardContent>
                <Typography style={{color: 'white'}} variant="h4">
                  Welcome, {user.firstName}
                </Typography>
                <Typography style={{color: 'white'}} variant="h6">
                  Please connect a bank account to continue
                </Typography>
                <Link />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object
}
