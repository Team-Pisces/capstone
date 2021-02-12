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
import {getTransactions} from '../store/plaid2'
import {Autocomplete} from '@material-ui/lab'

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
  }

  componentDidMount() {
    this.props.getTransactions()
  }

  handleChange = e => {
    if (e.target.name === 'all')
      this.setState({allChecked: !this.state.allChecked})
    if (e.target.name !== 'transactions') {
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      e.target.checked
        ? this.setState({transactionCount: this.state.transactionCount + 1})
        : this.setState({transactionCount: this.state.transactionCount - 1})
      // .233333 = (1 / 30) * 7
      // representing an average spending per week
      let rawNum = Number(e.target.value) * 0.2333333333333
      // Formats to currency value
      let parsedNum = parseFloat(rawNum.toFixed(2))
      let total =
        this.state.transactions +
        (e.target.checked ? parsedNum : parsedNum * -1)
      this.setState({
        transactions: parseFloat(total.toFixed(2))
      })
    }
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
          <Box width="80vw">
            <Typography>Check All that Apply</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
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
                      <Checkbox
                        checked={this.state.allChecked}
                        name="all"
                        onChange={this.handleChange}
                      />
                    </TableCell>
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

                          <TableCell padding="checkbox">
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
