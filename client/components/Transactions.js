import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/plaid'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
} from '@material-ui/core'

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// })

class Transactions extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions()
  }

  render() {
    const transactions = this.props.transactions || []
    // const classes = useStyles()
    console.log(transactions)
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
              {this.props.habitForm ? (
                <TableCell align="right">Include</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0
              ? transactions.map(transaction => (
                  <TableRow key={transaction.transaction_id}>
                    <TableCell component="th">{transaction.name}</TableCell>
                    <TableCell align="right">{transaction.amount}</TableCell>
                    <TableCell align="right">{transaction.date}</TableCell>
                    {this.props.habitForm ? (
                      <TableCell align="right">
                        <Checkbox />
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.plaid.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(Transactions)
