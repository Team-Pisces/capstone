import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchAccounts} from '../store/plaid'
import {
  Card,
  makeStyles,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  }
})

const AccountsPage = props => {
  useEffect(
    () => {
      props.fetchAccounts()
    },
    [fetchAccounts]
  )
  const accounts = props.accounts || []
  console.log(accounts)
  const classes = useStyles()
  return (
    <div>
      <h1>Accounts:</h1>
      <div>
        {accounts.length > 0
          ? accounts.map(account => {
              return (
                <Card
                  className={classes.root}
                  variant="outlined"
                  key={account.account_id}
                >
                  <CardContent>
                    <Typography variant="h4" component="h1">
                      {account.name}
                    </Typography>
                    <br />
                    <Typography variant="h5">
                      Balance: ${account.balances.current.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="secondary">
                      Unlink Account
                    </Button>
                  </CardActions>
                </Card>
                // <div key={account.account_id}>
                //   <div>
                //     {account.name}: {account.official_name}{' '}
                //   </div>
                // </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

const mapState = state => ({
  accounts: state.plaid.accounts
})

const mapDispatch = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts())
})

export default connect(mapState, mapDispatch)(AccountsPage)
