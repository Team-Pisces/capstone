import React from 'react'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import {
  CssBaseline,
  Container,
  Grid,
  Paper,
  Link,
  Drawer,
  AppBar,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  Button,
  CardContent
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import {mainListItems} from './itemList'
import Chart from './Chart'
import Balance from './Balance'
import AllHabits from './AllHabits'
import {useDispatch, connect} from 'react-redux'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginTop: '92px'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    zIndex: 0,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginTop: '92px'
  },
  drawerPaperClose: {
    zIndex: 0,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  view: {
    paddingTop: theme.spacing(5)
  }
}))

const UserProfile = props => {
  const {user} = props
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        style={{height: '88vh'}}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} style={{paddingTop: '100px'}}>
            <Grid item xs={12}>
              <Paper width="80vw">
                <CardContent>
                  <Typography fontWeight="fontWeightBold">
                    User Information
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple-table">
                      <TableHead>
                        <TableRow />
                      </TableHead>
                      <TableBody>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            href="/updateEmail"
                          >
                            Update Email
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            href="/updatePassword"
                          >
                            Change Password
                          </Button>
                        </TableCell>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Paper>
            </Grid>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <AllHabits />
              <Link color="inherit" href="/habits">
              View habits
              </Link>
              </Paper>
            </Grid> */}
            {/* Habits Grid */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CardContent>
                  <Link color="inherit" href="/habits" className={classes.view}>
                    View habits
                  </Link>
                  <AllHabits profile={true} />
                </CardContent>
              </Paper>
            </Grid>
            {/* Overall Chart */}
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography>
                  All Weekly Spending, insert allWeekSpending component
                </Typography>
                <Chart />
                <Link color="inherit" href="/habits" className={classes.view}>
                  View details
                </Link>
              </Paper>
            </Grid>
            {/* Balance Grid */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Balance />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(UserProfile)
