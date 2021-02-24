/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AuthForm} from './auth-form'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AuthForm', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<AuthForm />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('small').text()).to.be.equal('Email')
  })
})
