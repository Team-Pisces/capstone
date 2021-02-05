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
      <Box width="33vw">
        <Card width="33vw">
          <CardContent>
            <Typography variant="h4">Welcome, {firstName}</Typography>
            <Typography variant="h6">
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
