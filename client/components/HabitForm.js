import React from 'react'
import {connect} from 'react-redux'
import {addHabit} from '../store/habits'
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
import {getTransactions} from '../store/plaid2'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      goal: '',
      transactions: 0
    }
  }

  componentDidMount() {
    this.props.getTransactions()
  }

  handleChange = e => {
    if (e.target.name !== 'transactions') {
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      // .233333 = (1 / 30) * 7
      // representing an average spending per week
      let rawNum = Number(e.target.value) * 0.2333333333333
      // Formats to currency value
      let parsedNum = Math.floor(rawNum * 100)
      let total = this.state.transactions
      this.setState({
        [e.target.name]: total + (e.target.checked ? parsedNum : parsedNum * -1)
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.addHabit(this.state)
  }

  render() {
    const transactions = this.props.transactions || []

    return (
      <Box paddingTop="60px">
        <Grid container spacing={3} justify="center">
          <Box width="25vw" paddingTop="40px" paddingRight="20px">
            <Card>
              <CardContent>
                <Typography>Habit: {this.state.name}</Typography>
                <Typography>Goal: ${this.state.goal}</Typography>
                <Typography>
                  Weekly Spending: ${this.state.transactions / 100}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box width="25vw" paddingTop="40px" paddingLeft="20px">
            <Card>
              <CardContent>
                <Typography variant="h5">New Habit</Typography>
                <FormGroup id="add-habit-form" onSubmit={this.handleSubmit}>
                  <FormControl>
                    <InputLabel htmlFor="habit">Habit: </InputLabel>
                    <Input
                      name="name"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="goal">Goal: </InputLabel>
                    <Input
                      name="goal"
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.goal}
                    />
                    <Typography>Number of selected transactions:</Typography>
                    <Button
                      onClick={this.handleSubmit}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </FormControl>
                </FormGroup>
              </CardContent>
            </Card>
          </Box>
          <Box width="80vw">
            <Typography>Check All that Apply</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Date</TableCell>

                    <TableCell align="right">Include</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length > 0
                    ? transactions.map(transaction => (
                        <TableRow key={transaction.transaction_id}>
                          <TableCell component="th">
                            {transaction.name}
                          </TableCell>
                          <TableCell align="right">
                            {transaction.amount}
                          </TableCell>
                          <TableCell align="right">
                            {transaction.date}
                          </TableCell>

                          <TableCell align="right">
                            <Checkbox
                              name="transactions"
                              value={transaction.amount}
                              onChange={this.handleChange}
                            />
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
  habits: state.habits,
  categories: state.categories,
  transactions: state.plaid2.transactions
})

const mapDispatch = dispatch => ({
  addHabit: habit => dispatch(addHabit(habit)),
  getTransactions: () => dispatch(getTransactions())
})

export default connect(mapState, mapDispatch)(Habits)
