import React, {Component} from 'react'
import {Table, Button} from '@material-ui/core'
import {fetchAccounts} from '../store/plaid'

class Liabilitites extends Component {
  constructor() {
    super()
  }

  handleClick = () => {
    this.props.fetchAccounts(this.props.accessToken)
  }

  render() {
    return <div />
  }
}

const mapState = state => ({
  plaid: state.plaid
})

const mapDispatch = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts())
})

export default connect(mapState, mapDispatch)(Liabilitites)
