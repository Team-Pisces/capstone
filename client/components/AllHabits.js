import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits} from '../store/habits'
//import {Link} from 'react-router-dom'
import Chart from './Chart'
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  FormControl,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Checkbox,
  Paper,
  TableHead,
  TableBody,
  Link
} from '@material-ui/core'

class AllHabits extends React.Component {
  componentDidMount() {
    this.props.fetchHabits()
  }
  render() {
    const {habits} = this.props || []
    let totalWeeklyAvg = habits.reduce((accum, hab) => {
      return accum + hab.initialWeeklyAvg
    }, 0)
    let totalGoal = habits.reduce((accum, hab) => {
      return accum + hab.goal
    }, 0)
    return (
      <Box>
        {/* <Box
          fontStyle="italic"
          fontSize="h3.fontSize"
          textAlign="center"
          boxShadow={3}
          style={{backgroundColor: '#42AC42'}}
          color="inherit"
        >
          <Typography>All Your Habits</Typography>
        </Box> */}
        <Box paddingTop="80px">
          {/* <Grid container spacing={3} justify="center">
            <Box width="80vw" align="right">
              <Button variant="contained" color="primary" href="/habitform">
                Create Habit
              </Button>
            </Box>
          </Grid> */}
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
                    Create Habit
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
          <Grid container spacing={3} justify="center">
            <Box width="80vw" paddingBottom="50px">
              <Typography fontWeight="fontWeightBold">All Habits</Typography>

              <TableContainer component={Paper}>
                <Table aria-label="simple-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Goal</TableCell>
                      <TableCell align="right">Weekly Average</TableCell>
                      <TableCell align="right">Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {habits.length > 0
                      ? habits.map(habit => (
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
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Box>
      </Box>
    )
  }
}

const mapState = state => ({
  habits: state.habits
})

const mapDispatch = dispatch => ({
  fetchHabits: () => dispatch(fetchHabits())
})

export default connect(mapState, mapDispatch)(AllHabits)
