import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/plaid2'
import {TextField} from '@material-ui/core'
import {DataGrid} from '@material-ui/data-grid'
import moment from 'moment'

class TransactionTable extends React.Component {
  constructor() {
    super()

    this.state = {
      range: 30
    }
  }

  componentDidMount() {
    this.props.getTransactions()
  }

  handleTransactionSelect = array => {
    if (array.rowIds.length > 0) {
      let rowInfo = array.rowIds.map(rowId => {
        return this.props.transactions.filter(t => {
          if (rowId === t.transaction_id) {
            return t
          }
        })[0]
      })
      let sum = rowInfo.reduce((accum, val) => accum + val.amount, 0)
      this.props.handleForm(
        Math.floor(sum * (100 / this.state.range * 7)) / 100,
        rowInfo
      )
    } else {
      this.props.handleForm(0, [])
    }
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  render() {
    let date = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')
    const transactions = this.props.transactions || []

    const columns = [
      {field: 'name', headerName: 'Name', sortable: true, width: 200},
      {field: 'category', headerName: 'Category', sortable: true, width: 200},
      {field: 'amount', headerName: 'Amount', sortable: true, width: 200},
      {
        field: 'date',
        headerName: 'Date',
        sortable: true,
        width: 200
      }
    ]
    const rows = []
    transactions.map(transaction => {
      rows.push({
        id: transaction.transaction_id,
        name: transaction.name,
        category: transaction.category[0],
        amount: this.formatter.format(transaction.amount),
        date: transaction.date
      })
    })

    return (
      <div style={{height: 500, width: '100%'}}>
        <TextField
          style={{width: '300px'}}
          id="date"
          label="Choose a range from today (optional)"
          type="date"
          defaultValue={date}
          onChange={e => {
            let days = moment
              .duration(date.diff(moment(e.target.value, 'YYYY-MM-DD')))
              .asDays()
            this.setState({range: days})
            this.props.getTransactions(days)
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onSelectionChange={rowIds => this.handleTransactionSelect(rowIds)}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.plaid2.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    getTransactions: days => dispatch(getTransactions(days))
  }
}

export default connect(mapState, mapDispatch)(TransactionTable)
