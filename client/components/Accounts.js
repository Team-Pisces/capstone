import React, {Component} from 'react'
import {fetchAccounts} from '../store/plaid'

export class Accounts extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchAccounts()
  }

  render() {
    console.log('props---->', this.props)
    return (
      <div>
        Accounts:
        <button onClick={() => console.log(this.props)}>press</button>
      </div>
    )
  }
}

const mapState = state => ({
  accounts: state.accounts
})

const mapDispatch = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts())
})

export default (mapState, mapDispatch)(Accounts)
