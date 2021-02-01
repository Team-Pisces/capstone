import {Card, CardContent, Typography} from '@material-ui/core'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchBalance} from '../store/plaid'

class Balance extends Component {
  componentDidMount() {
    this.props.fetchBalance()
  }

  render() {
    console.log('PROPS: ----> ', this.props)
    const {balance} = this.props

    return (
      <div>
        {balance.map(account => (
          <Card key={account.id}>
            <CardContent>
              <Typography variant="h5" component="h5">
                Account Name: {account.name}
                Current Balance: {account.balances.available}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  balance: state.plaid.balance
})

const mapDispatch = dispatch => ({
  fetchBalance: () => dispatch(fetchBalance())
})

export default connect(mapState, mapDispatch)(Balance)
