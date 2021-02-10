import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHabit} from '../store/singleHabit'
import RedChart from './RedChart'
import GreenChart from './GreenChart'
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
  TableBody
} from '@material-ui/core'

class SingleHabit extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHabit(this.props.match.params.habitId)
  }
  render() {
    const {habit} = this.props
    const goal = habit.goal
    const weeklyAvg = habit.initialWeeklyAvg / 100
    return (
      <Box paddingTop="60px">
        <Grid container spacing={3} justify="center">
          <Box width="25vw" paddingTop="40px" paddingRight="20px">
            <Card style={{backgroundColor: '#42AC42'}}>
              <CardContent>
                <Typography style={{color: 'white'}} variant="h5">
                  Habit:
                </Typography>
                <Typography style={{color: 'white'}} variant="h3">
                  {habit.name}
                </Typography>
                <Typography style={{color: 'white'}}>
                  Weekly Average Spending:
                </Typography>
                <Typography style={{color: 'white'}} variant="h4">
                  ${weeklyAvg}
                </Typography>
                <Typography style={{color: 'white'}}>
                  Weekly Goal/Budget:
                </Typography>
                <Typography style={{color: 'white'}} variant="h4">
                  ${goal}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box width="50vw" paddingTop="40px" paddingLeft="10px">
            <RedChart weeklyAvg={weeklyAvg - goal} type="saving" />
            <RedChart weeklyAvg={weeklyAvg * -1} type="spending" />
          </Box>
          <Box width="80vw">
            <Typography variant="h6">Weekly Spending/Performance</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>List</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Week 1</TableCell>
                    <TableCell align="right">$50000000</TableCell>
                  </TableRow>
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
  habit: state.singleHabit
})

const mapDispatch = dispatch => ({
  fetchSingleHabit: id => dispatch(fetchSingleHabit(id))
})

export default connect(mapState, mapDispatch)(SingleHabit)
