import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAccounts} from '../store/plaid2'
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
      props.getAccounts()
    },
    [getAccounts]
  )
  const accounts = props.accounts || []
  console.log(accounts)
  const classes = useStyles()
  console.log(props)
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
  accounts: state.plaid2.accounts
})

const mapDispatch = dispatch => ({
  getAccounts: () => dispatch(getAccounts())
})

export default connect(mapState, mapDispatch)(AccountsPage)
