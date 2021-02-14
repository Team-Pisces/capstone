import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits} from '../store/habits'
//import {Link} from 'react-router-dom'
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
    const {habits} = this.props
    return (
      <Box>
        <Box
          fontStyle="italic"
          fontSize="h3.fontSize"
          textAlign="center"
          boxShadow={3}
          style={{backgroundColor: '#42AC42'}}
          color="inherit"
        >
          <Typography>All Your Habits</Typography>
        </Box>
        <Box paddingTop="80px">
          <Grid container spacing={3} justify="center">
            <Box width="80vw" align="right">
              <Button variant="contained" color="primary" href="/habitform">
                Create Habit
              </Button>
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
