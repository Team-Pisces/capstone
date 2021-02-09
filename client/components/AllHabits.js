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
    console.log(habits)
    return (
      <Box paddingTop="100px">
        <Grid container spacing={3} justify="center">
          <Box width="80vw">
            <Typography>All Habits</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Goal</TableCell>
                    <TableCell align="right">Weekly Average</TableCell>
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
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
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
