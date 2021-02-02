import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchBalance, fetchTransactions} from '../store/plaid'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export const Balance = props => {
  const classes = useStyles()

  const [account, setAccount] = useState('')

  useEffect(() => {
    props.fetchBalance()
    props.fetchTransactions()
  }, [])

  const handleChange = event => {
    setAccount(event.target.value)
  }

  const balance = props.balance || []
  const transactions = props.transactions || []
  console.log('Props: ---> ', props)
  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="accountL">Select Account</InputLabel>

        <Select
          labelId="accountL"
          id="account"
          value={account}
          onChange={handleChange}
        >
          {balance.length > 0
            ? balance.map(accountBalance => (
                <MenuItem
                  value={accountBalance}
                  key={accountBalance.account_id}
                >
                  {accountBalance.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
      <Card>
        <CardContent>
          <Typography>Balance: </Typography>
          {account
            ? balance.map(accountBalance => {
                if (accountBalance.name === account.name) {
                  return (
                    <div key={accountBalance.account_id}>
                      <Typography>
                        Current: $
                        {parseFloat(
                          Math.floor(accountBalance.balances.current * 100) /
                            100
                        ).toLocaleString('en')}
                      </Typography>
                      <Typography>
                        Available: $
                        {parseFloat(
                          Math.floor(accountBalance.balances.available * 100) /
                            100
                        ).toLocaleString('en')}
                      </Typography>
                    </div>
                  )
                } else {
                  return null
                }
              })
            : null}
        </CardContent>
      </Card>

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
            {account
              ? transactions.map(transaction => {
                  if (transaction.account_id === account.account_id) {
                    return (
                      <TableRow key={transaction.transaction_id}>
                        <TableCell component="th">{transaction.name}</TableCell>
                        <TableCell align="right">
                          {transaction.amount}
                        </TableCell>
                        <TableCell align="right">{transaction.date}</TableCell>
                      </TableRow>
                    )
                  } else {
                    return null
                  }
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

const mapState = state => ({
  balance: state.plaid.balance,
  transactions: state.plaid.transactions
})

const mapDispatch = dispatch => ({
  fetchBalance: () => dispatch(fetchBalance()),
  fetchTransactions: () => dispatch(fetchTransactions())
})

export default connect(mapState, mapDispatch)(Balance)
