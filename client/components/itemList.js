import React from 'react'
import {Link} from 'react-router-dom'
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PeopleIcon from '@material-ui/icons/People'

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/profile">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="UserProfile" />
    </ListItem>
    <ListItem button component={Link} to="/habits">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Habits" />
    </ListItem>
    <ListItem button component={Link} to="/transactions">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItem>
  </div>
)
