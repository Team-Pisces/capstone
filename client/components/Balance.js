import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchBalance} from '../store/plaid'

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
  }, [])

  const handleChange = event => {
    console.log('Value: ---> ', event.target.value)
    setAccount(event.target.value)
  }

  console.log('PROPS: ----> ', props)
  console.log('account: ----> ', account)
  const balance = props.balance || []
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
                  value={accountBalance.name}
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
          <Typography>Current Balance: </Typography>
          {account
            ? balance.map(accountBalance => {
                if (accountBalance.name === account) {
                  return (
                    <Typography key={accountBalance.account_id} variant="h5">
                      ${accountBalance.balances.current}
                    </Typography>
                  )
                } else {
                  return null
                }
              })
            : null}
        </CardContent>
      </Card>
    </div>
  )
}

const mapState = state => ({
  balance: state.plaid.balance
})

const mapDispatch = dispatch => ({
  fetchBalance: () => dispatch(fetchBalance())
})

export default connect(mapState, mapDispatch)(Balance)
