import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchBalance} from '../store/plaid'

class Balance extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchBalance()
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    console.log('PROPS: ----> ', this.props)
    const balance = this.props.balance || []
    return (
      <div>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">
            Select Account
          </InputLabel>

          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={balance}
            onChange={this.handleChange}
          >
            {balance.length > 0
              ? balance.map(account => (
                  <MenuItem key={account.account_id} value={account.name}>
                    {account.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
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
