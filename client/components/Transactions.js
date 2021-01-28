import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

export const Transactions = props => {
  const {transactions} = props

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  })

  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>

          {transactions.map(transaction => (
            <TableRow key={transaction.transaction_id}>
              <TableCell component="th">{transaction.name}</TableCell>
              <TableCell align="right">{transaction.amount}</TableCell>
              <TableCell align="right">{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Transactions)

// Transactions.propTypes = {
//   name: PropTypes.string,
//   amount: PropTypes.number,
//   date: PropTypes.string,
//   transaction_id: PropTypes.string,
// }
