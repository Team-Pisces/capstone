/* eslint-disable camelcase */
import React from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import {generateLinkToken, generateLinkTransactions} from '../store/plaid2'
import {me} from '../store/user'

class Link extends React.Component {
  componentDidMount() {
    this.props.generateLinkToken()
  }

  render() {
    let {link_token} = this.props.plaid2
    return link_token ? (
      <PlaidLink
        style={{marginRight: '0', marginLeft: 'auto'}}
        token={link_token}
        // onSuccess generates a public token this token on its own
        onSuccess={async public_token => {
          await this.props.generateLinkTransactions(public_token)
          await this.props.me()
        }}
      >
        Connect a bank account
      </PlaidLink>
    ) : null
  }
}

const mapStateToProps = state => ({
  plaid2: state.plaid2
})

const mapDispatchToProps = dispatch => ({
  generateLinkToken: () => dispatch(generateLinkToken()),
  generateLinkTransactions: token => dispatch(generateLinkTransactions(token)),
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)
