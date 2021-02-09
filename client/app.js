import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

export let config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
