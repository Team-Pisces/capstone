import React from 'react'
import {connect} from 'react-redux'
import {fetchHabits, addHabit} from '../store/habits'
import {fetchCategories} from '../store/categories'
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  FormContent,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
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
import {fetchTransactions} from '../store/plaid'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      goal: 0
    }
  }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('Hit me!')
    this.props.addHabit(this.state)
  }

  render() {
    const transactions = this.props.transactions || []
    return (
      <Box>
        <Grid container spacing={3} justify="center">
          <Box width="25vw" paddingTop="40px" paddingRight="20px">
            <Card>
              <CardContent>
                <Typography>Habit Name</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box width="25vw" paddingTop="40px" paddingLeft="20px">
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

              {/* <label htmlFor="category">Category: </label>
              <Select
                name="category"
                onChange={this.handleChange}
                value={this.state.category}
              >
                <option>Select Category</option>
                {categories.length
                  ? categories.map((category) => {
                      return (
                        <MenuItem key={category.category_id}>
                          {category.hierarchy[category.hierarchy.length - 1]}
                        </MenuItem>
                      )
                    })
                  : null}
              </Select> */}
              <FormControl>
                <FormHelperText htmlFor="goal">Goal: </FormHelperText>
                <Input
                  name="goal"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.goal}
                />
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
                            <Checkbox />
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
  transactions: state.plaid.transactions
})

const mapDispatch = dispatch => ({
  addHabit: habit => dispatch(addHabit(habit)),
  fetchTransactions: () => dispatch(fetchTransactions())
})

export default connect(mapState, mapDispatch)(Habits)