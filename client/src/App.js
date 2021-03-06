/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import search from './pages/search.js'
import saved from './pages/saved.js'
import Navbar from './components/Navbar'

function App () {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact strict path='/' component={search} />
          <Route exact strict path='/saved' component={saved} />
          <Route component={search} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
