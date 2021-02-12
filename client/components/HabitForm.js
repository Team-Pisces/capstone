import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
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
  TableBody,
  TextField,
  Link
} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import {fetchCategories} from '../store/categories'
import {getTransactions} from '../store/plaid2'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      goal: '',
      transactions: 0,
      redirect: false,
      categories: [],
      category: ''
    }
  }

  componentDidMount() {
    this.props.getTransactions()
    this.props.fetchCategories()
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  handleCategory = e => {
    if (e.target.innerHTML[0] === undefined || e.target.innerHTML[0] === '<') {
      this.setState({category: ''})
    } else {
      this.setState({
        category: e.target.innerHTML
      })
    }
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

  handleSubmit = async e => {
    e.preventDefault()
    await this.props.addHabit(this.state)

    this.setState({
      redirect: true
    })
  }

  render() {
    let transactions = this.props.transactions || []
    if (this.state.category !== '') {
      transactions = transactions.filter(
        tran => (tran.category[0] === this.state.category ? tran : null)
      )
    } else if (this.state.category === '') {
      transactions = this.props.transactions || []
    }
    const categories = this.props.transactions
      ? this.props.transactions.map(t => t.category[0])
      : []
    const uniq = [...new Set(categories)]
    const cat = uniq.map(categ => categ)
    console.log('uniq: ---> ', uniq)
    return (
      <Box paddingTop="60px">
        {this.state.redirect ? <Redirect to="/habits" /> : null}
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
          <Box width="90vw">
            <Typography>Check All that Apply</Typography>
            <TableContainer style={{maxHeight: 500}} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">
                      <Autocomplete
                        id="combo-box-demo"
                        options={uniq}
                        getOptionLabel={option => option}
                        renderInput={params => (
                          <TextField
                            {...params}
                            name="category"
                            label="Category"
                            variant="outlined"
                          />
                        )}
                        onChange={this.handleCategory}
                      />
                    </TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox onChange={this.selectAll} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length > 0
                    ? transactions.map(transaction => {
                        return (
                          <TableRow
                            key={transaction.transaction_id}
                            hover
                            // onClick={(e) => handleClick(e, row.name)}
                            role="checkbox"
                            // aria-checked={isItemSelected}
                            // tabIndex={-1}
                            // key={row.name}
                            // selected={isItemSelected}
                          >
                            <TableCell component="th">
                              {transaction.name}
                            </TableCell>
                            <TableCell align="left">
                              {transaction.category[0]}
                            </TableCell>
                            <TableCell align="left">
                              {this.formatter.format(transaction.amount)}
                            </TableCell>
                            <TableCell align="left">
                              {transaction.date}
                            </TableCell>

                            <TableCell padding="checkbox">
                              <Checkbox
                                name="transactions"
                                value={transaction.amount}
                                onChange={this.handleChange}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })
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
  getTransactions: () => dispatch(getTransactions()),
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapState, mapDispatch)(Habits)
