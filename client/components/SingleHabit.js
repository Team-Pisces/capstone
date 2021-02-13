import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleHabit} from '../store/singleHabit'
import RedChart from './Chart'
import {addTransaction, fetchTransactions} from '../store/transactions'
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  TableBody
} from '@material-ui/core'
import {filter} from 'compression'

class SingleHabit extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHabit(this.props.match.params.habitId)
    this.props.fetchTransactions(this.props.match.params.habitId)
    let transactions
    if (this.props.location.state) {
      transactions = this.props.location.state.transactions || []
      for (let i = 0; i < transactions.length; i++) {
        this.props.addTransaction(
          transactions[i].name,
          transactions[i].amount,
          transactions[i].date,
          this.props.match.params.habitId
        )
      }
    }
  }
  render() {
    let transactions
    if (this.props.location.state) {
      transactions = this.props.location.state.transactions || []
    }
    const dbTransactions = this.props.transactions || []
    let filteredTransactions = []
    const filtered = dbTransactions.filter(transaction => {
      if (!filteredTransactions.includes(transaction.title)) {
        filteredTransactions.push(transaction.title)
        return transaction
      }
    })
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
            <Typography variant="h6">Transactions</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>List</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    ? transactions.map(transaction => {
                        return (
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
                          </TableRow>
                        )
                      })
                    : filtered.map(transaction => {
                        return (
                          <TableRow key={transaction.transaction_id}>
                            <TableCell component="th">
                              {transaction.title}
                            </TableCell>
                            <TableCell align="right">
                              {transaction.amount}
                            </TableCell>
                            <TableCell align="right">
                              {transaction.date}
                            </TableCell>
                          </TableRow>
                        )
                      })}
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
  habit: state.singleHabit,
  transactions: state.transactions
})

const mapDispatch = dispatch => ({
  fetchSingleHabit: id => dispatch(fetchSingleHabit(id)),
  addTransaction: (title, amount, date, habitId) =>
    dispatch(addTransaction(title, amount, date, habitId)),
  fetchTransactions: habitId => dispatch(fetchTransactions(habitId))
})

export default connect(mapState, mapDispatch)(SingleHabit)
