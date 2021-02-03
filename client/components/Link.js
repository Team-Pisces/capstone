import React from 'react'
import {PlaidLink} from 'react-plaid-link'
import axios from 'axios'
import {connect} from 'react-redux'

class Link extends React.Component {
  render() {
    return (
      <PlaidLink
        style={{marginRight: '0', marginLeft: 'auto'}}
        token={this.props.link_token}
        onSuccess={public_token => {
          this.props.generateLinkTransactions(
            public_token,
            this.props.uid,
            uid => {
              this.props.getAccounts(uid, accounts => {
                this.props.parseAccounts(accounts)
              })

              this.props.getTransactions(this.props.uid, transactions => {
                this.props.parseTransactions(transactions)
              })
            }
          )
        }}
      >
        Connect a bank account
      </PlaidLink>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Link)
