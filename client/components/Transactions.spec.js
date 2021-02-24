import 'jsdom-global/register'
import {Transactions} from './Transactions'
import chai, {expect} from 'chai'
import sinonChai from 'sinon-chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'

chai.use(sinonChai)
