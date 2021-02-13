import React from 'react'
import {connect} from 'react-redux'
import {getTransactions} from '../store/plaid2'
import {DataGrid} from '@material-ui/data-grid'

class TransactionTable extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }

  handleTransactionSelect = array => {
    if (array.rowIds.length > 0) {
      let something = array.rowIds.map(rowId => {
        return this.props.transactions.filter(t => {
          if (rowId === t.transaction_id) {
            return t
          }
        })[0]
      })
      let sum = something.reduce((accum, val) => accum + val.amount, 0)
      this.props.handleForm(Math.floor(sum * 23.3333333) / 100)
    } else {
      this.props.handleForm(0)
    }
  }

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  render() {
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
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          onSelectionChange={rowIds => this.handleTransactionSelect(rowIds)}
          onRowSelected={item => this.props.handleSelect(item)}
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
    getTransactions: () => dispatch(getTransactions())
  }
}

export default connect(mapState, mapDispatch)(TransactionTable)
