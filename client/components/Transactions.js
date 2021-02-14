import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/plaid2'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardContent
} from '@material-ui/core'
import Balance from './Balance'

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// })

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    const transactions = this.props.transactions || []
    // const classes = useStyles()
    return (
      <Paper style={{paddingTop: '100px'}}>
        <CardContent>
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
                {transactions.length > 0
                  ? transactions.map(transaction => (
                      <TableRow key={transaction.transaction_id}>
                        <TableCell component="th">{transaction.name}</TableCell>
                        <TableCell align="right">
                          {transaction.amount}
                        </TableCell>
                        <TableCell align="right">{transaction.date}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
            <Balance />
          </TableContainer>
        </CardContent>
      </Paper>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.plaid2.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    getTransactions: () => dispatch(getTransactions())
  }
}

export default connect(mapState, mapDispatch)(Transactions)
