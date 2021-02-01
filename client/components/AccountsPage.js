import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAccounts} from '../store/plaid'
import {Accounts} from './Accounts'
import {Table, Button} from '@material-ui/core'

class AccountsPage extends Component {
  componentDidMount() {
    this.props.fetchAccounts()
  }

  render() {
    const accounts = this.props.accounts || []
    return (
      <div>
        <h1>Accounts:</h1>
        <Accounts accounts={accounts} />
      </div>
    )
  }
}

const mapState = state => ({
  accounts: state.plaid.accounts
})

const mapDispatch = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts())
})

export default connect(mapState, mapDispatch)(AccountsPage)
