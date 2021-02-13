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
import TransactionTable from './TransactionTable'

class Habits extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      goal: '',
      transactions: 0,
      redirect: false,
      categories: [],
      category: '',
      allChecked: false
    }
    this.handleChange = this.handleChange.bind(this)
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

  // handleCategory = (e) => {
  //   if (e.target.innerHTML[0] === undefined || e.target.innerHTML[0] === '<') {
  //     this.setState({category: ''})
  //   } else {
  //     this.setState({
  //       category: e.target.innerHTML,
  //     })
  //   }
  // }

  handleForm = e => {
    if (e.data.amount[0] === '$') {
      let numString = e.data.amount.split(',').join('')
      let num = parseFloat(numString.slice(1, e.length))
      if (!e.isSelected) {
        num = num * -1
      }
      this.setState({
        transactions: this.state.transactions + num
      })
      console.log(this.state.transactions)
    } else if (e.data.amount[1] === '$') {
      let numString = e.data.amount.split(',').join('')
      let num = numString.slice(0, 1) + numString.slice(2, numString.length)
      num = parseFloat(num)
      if (!e.isSelected) {
        num = num * -1
      }
      this.setState({
        transactions: this.state.transactions + num
      })
      console.log(this.state.transactions)
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log('hello')
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
            <Card style={{backgroundColor: '#42AC42'}}>
              <CardContent>
                <Typography style={{color: 'white'}} variant="h5">
                  Habit:
                </Typography>
                <Typography style={{color: 'white'}} variant="h3">
                  {this.state.name}
                </Typography>
                <Typography style={{color: 'white'}}>
                  Weekly Average Spending:
                </Typography>
                <Typography style={{color: 'white'}} variant="h4">
                  ${this.state.transactions}
                </Typography>
                <Typography style={{color: 'white'}}>
                  Weekly Goal/Budget:
                </Typography>
                <Typography style={{color: 'white'}} variant="h4">
                  ${this.state.goal}
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
                    <Typography>
                      Number of selected transactions:{' '}
                      {this.state.transactionCount}
                    </Typography>
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
            <TransactionTable handleForm={this.handleForm} />
            {/* <TableContainer style={{maxHeight: 500}} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell width="22vw">Name</TableCell>
                    <TableCell align="left">
                      <Autocomplete
                        id="combo-box-demo"
                        options={uniq}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
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
                    <TableCell width="22vw" align="left">
                      Amount
                    </TableCell>
                    <TableCell width="22vw" align="left">
                      Date
                    </TableCell>
                    <TableCell width="12vw" padding="checkbox">
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.length > 0
                    ? transactions.map((transaction) => {
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
                            <TableCell width="22vw" component="th">
                              {transaction.name}
                            </TableCell>
                            <TableCell width="22vw" align="left">
                              {transaction.category[0]}
                            </TableCell>
                            <TableCell width="22vw" align="left">
                              {this.formatter.format(transaction.amount)}
                            </TableCell>
                            <TableCell width="22vw" align="left">
                              {transaction.date}
                            </TableCell>

                            <TableCell width="12vw" padding="checkbox">
                              {this.state.allChecked ? (
                                <Checkbox
                                  checked={true}
                                  name="transactions"
                                  value={transaction.amount}
                                  onChange={this.handleChange}
                                />
                              ) : (
                                <Checkbox
                                  name="transactions"
                                  value={transaction.amount}
                                  onChange={this.handleChange}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer> */}
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
