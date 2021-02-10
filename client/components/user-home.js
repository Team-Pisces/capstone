import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Balance from './Balance'
import {Box, Typography, Card, CardContent} from '@material-ui/core'
import Link from './Link'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {firstName} = props

  return (
    <Box display="flex" paddingTop="100px" justifyContent="center">
      <Box height="50%" width="33vw">
        <Card
          style={{backgroundColor: '#42AC42', height: '30vh'}}
          height="100%"
          width="33vw"
        >
          <CardContent>
            <Typography style={{color: 'white'}} variant="h4">
              Welcome, {firstName}
            </Typography>
            <Typography style={{color: 'white'}} variant="h6">
              Please connect a bank account to continue
            </Typography>
            <Link />
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
