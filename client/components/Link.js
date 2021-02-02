import React from 'react'
import {PlaidLink} from 'react-plaid-link'
import axios from 'axios'
import {connect} from 'react-redux'

class Link extends React.Component {
  render() {
    return <PlaidLink>Connect a bank account</PlaidLink>
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Link)
