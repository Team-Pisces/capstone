import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits} from '../store/habits'
import Chart from './Chart'
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  TableBody,
  Link,
  CircularProgress
} from '@material-ui/core'

class AllHabits extends React.Component {
  constructor() {
    super()

    this.state = {
      loaded: false
    }
  }

  componentDidMount = async () => {
    await this.props.fetchHabits()
    this.setState({loaded: true})
  }
  render() {
    let {habits} = this.props || []
    habits = this.props.user
      ? habits.filter(h => h.userId === this.props.user.id)
      : []
    let totalWeeklyAvg = habits.reduce((accum, hab) => {
      return accum + hab.initialWeeklyAvg
    }, 0)
    let totalGoal = habits.reduce((accum, hab) => {
      return accum + hab.goal
    }, 0)

    return (
      <Box>
        <Box paddingTop={this.props.profile ? '0px' : '80px'}>
          <Grid container spacing={3} justify="center">
            <Box width="25vw" paddingTop="40px" paddingRight="20px">
              <Card style={{backgroundColor: '#42AC42'}}>
                <CardContent>
                  <Typography style={{color: 'white'}} variant="h5">
                    All Habits
                  </Typography>
                  <Typography style={{color: 'white'}}>
                    Total weekly spending (avg.):
                  </Typography>
                  <Typography style={{color: 'white'}} variant="h4">
                    ${totalWeeklyAvg / 100}
                  </Typography>
                  <Typography style={{color: 'white'}}>
                    Total Weekly Goal/Budget:
                  </Typography>
                  <Typography style={{color: 'white'}} variant="h4">
                    ${totalGoal}
                  </Typography>
                  <Button variant="contained" color="primary" href="/habitform">
                    Create New Habit
                  </Button>
                </CardContent>
              </Card>
            </Box>
            <Box width="30vw" paddingTop="40px" paddingLeft="10px">
              <Chart
                weeklyAvg={totalWeeklyAvg / 100 - totalGoal}
                type="saving"
              />
            </Box>
          </Grid>

          {this.state.loaded ? (
            habits.length > 0 ? (
              <Grid container spacing={3} justify="center">
                <Box width="80vw" paddingBottom="50px">
                  <Typography fontWeight="fontWeightBold">
                    All Habits
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple-table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">
                            Weekly Spending Goal
                          </TableCell>
                          <TableCell align="right">
                            Weekly Average Spending
                          </TableCell>
                          <TableCell align="right">Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {habits.map(habit => (
                          <TableRow key={habit.id}>
                            <TableCell>
                              <Link href={`/habits/${habit.id}`}>
                                {habit.name}
                              </Link>
                            </TableCell>
                            <TableCell align="right">${habit.goal}</TableCell>
                            <TableCell align="right">
                              ${habit.initialWeeklyAvg / 100}
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                variant="contained"
                                color="primary"
                                href={`/habits/${habit.id}`}
                              >
                                See details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>
            ) : (
              <Grid
                style={{paddingTop: '50px'}}
                container
                spacing={3}
                justify="center"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography variant="h4">No Habits to display</Typography>
                  <Typography variant="h5">
                    Create a new habit and start saving!
                  </Typography>
                </Box>
              </Grid>
            )
          ) : (
            <Box paddingTop="75px" width="90vw">
              <Grid container spacing={3} justify="center">
                <CircularProgress style={{color: 'green'}} />
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    )
  }
}

const mapState = state => ({
  habits: state.habits,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchHabits: () => dispatch(fetchHabits())
})

export default connect(mapState, mapDispatch)(AllHabits)
