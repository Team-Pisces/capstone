/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addHabit, fetchHabits} from '../store/habits'
import {addTransaction} from '../store/transactions'
import {
  Box,
  Grid,
  Typography,
  FormGroup,
  InputLabel,
  Input,
  Button,
  FormControl,
  Card,
  CardContent,
  CircularProgress
} from '@material-ui/core'
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
      allChecked: false,
      transactionData: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getTransactions()
    this.props.fetchCategories()
    this.props.fetchHabits()
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  handleForm = (sum, array) => {
    this.setState({transactions: sum, transactionData: array})
    console.log('transactions -> ', array)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    console.log('state -> transactions', this.state.transactionData)
    await this.props.addHabit(this.state)
    let tData = this.state.transactionData
    let habitId = this.props.habits[this.props.habits.length - 1].id
    for (let i = 0; i < tData.length; i++) {
      let amount = Math.floor(tData[i].amount * 100)
      await this.props.addTransaction(
        tData[i].name,
        amount,
        tData[i].date,
        habitId
      )
    }
    this.setState({
      redirect: true
    })
  }

  render() {
    console.log(this.props)
    let transactions = this.props.transactions || []
    if (this.state.category !== '') {
      transactions = transactions.filter(
        tran => (tran.category[0] === this.state.category ? tran : null)
      )
    }

    const categories = this.props.transactions
      ? this.props.transactions.map(t => t.category[0])
      : []
    const uniq = [...new Set(categories)]
    return (
      <Box paddingTop="100px">
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: `/habits/${
                this.props.habits[this.props.habits.length - 1].id
              }`
            }}
          />
        ) : null}
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
                      disabled={
                        this.state.name === '' ||
                        this.state.goal === '' ||
                        this.state.transactionData.length === 0 ||
                        parseInt(this.state.goal) > this.state.transactions
                      }
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
          {this.props.transactions ? (
            <Box paddingTop="50px" width="90vw">
              <Typography>
                Choose transactions that relate to this habit
              </Typography>
              <TransactionTable
                handleForm={this.handleForm}
                //handleSelect={this.handleSelect}
              />
            </Box>
          ) : (
            <Box paddingTop="75px" width="90vw">
              <Grid container spacing={3} justify="center">
                <CircularProgress style={{color: 'green'}} />
              </Grid>
            </Box>
          )}
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
  fetchCategories: () => dispatch(fetchCategories()),
  addTransaction: (title, amount, date, habitId) =>
    dispatch(addTransaction(title, amount, date, habitId)),
  fetchHabits: () => dispatch(fetchHabits())
})

export default connect(mapState, mapDispatch)(Habits)
