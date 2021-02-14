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

class SingleHabit extends React.Component {
  componentDidMount() {
    this.props.fetchSingleHabit(this.props.match.params.habitId)
    this.props.fetchTransactions(this.props.match.params.habitId)
  }

  render() {
    let transactions = this.props.transactions || []
    if (Array.isArray(transactions[0])) {
      transactions = []
    }
    if (transactions.length > 0) {
      transactions = transactions.map(t => ({
        ...t,
        amount: t.amount / 100,
        date: t.date.slice(0, 10)
      }))
    }
    const {habit} = this.props
    const goal = habit.goal
    const weeklyAvg = habit.initialWeeklyAvg / 100
    return (
      <Box paddingTop="100px">
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
          <Box width="35vw" paddingTop="40px" paddingLeft="10px">
            <RedChart weeklyAvg={weeklyAvg - goal} type="saving" />
          </Box>
          <Box width="35vw" paddingTop="40px" paddingLeft="10px">
            <RedChart weeklyAvg={weeklyAvg * -1} type="spending" />
          </Box>
          {transactions.length > 0 ? (
            <Box width="80vw">
              <Typography variant="h6">Transactions</Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions
                      ? transactions.map(transaction => {
                          return (
                            <TableRow key={transaction.id}>
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
                        })
                      : transactions.map(transaction => {
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
          ) : null}
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
