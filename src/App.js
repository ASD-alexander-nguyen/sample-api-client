import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { connect } from 'react-redux'
import Listings from './Listings'

const reducers = combineReducers({ test: (state = {}, action) => state })
const store = createStore(reducers)
const ReduxListings = connect()(Listings)

class App extends Component {
  render() {
    return <ReduxListings store={ store }/>
  }
}

export default App;
