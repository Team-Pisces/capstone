import React, {Component} from 'react'
import {Table, Button} from '@material-ui/core'
import {fetchLiabilities} from '../store/plaid'
import {connect} from 'react-redux'

class Liabilitites extends Component {
  constructor() {
    super()
  }

  handleClick = () => {
    this.props.fetchLiabilities()
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleClick}>Liabilities</Button>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  plaid: state.plaid
})

const mapDispatch = dispatch => ({
  fetchLiabilities: () => dispatch(fetchLiabilities())
})

export default connect(mapState, mapDispatch)(Liabilitites)
