import 'jsdom-global/register'
import {Transactions} from './Transactions'
import chai, {expect} from 'chai'
import sinon, {spy} from 'sinon'
import sinonChai from 'sinon-chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'

chai.use(sinonChai)

describe('Transactions component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<Transactions />)
  })

  it('should render Transactions', () => {
    expect(wrapper.find('Transactions').exists()).to.be.equal(true)
  })
})
