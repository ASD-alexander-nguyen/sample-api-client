import React, { Component } from 'react';
import { createStore } from 'redux'
import _ from 'lodash'
import ReduxListings from './components/ReduxListings'
import ReduxFilters from './components/ReduxFilters'
import Reducers from './Reducers'
import Server from './Server'

const store = createStore(Reducers, {
  sessionToken: null,
  filterOptions: {},
  filters: {},
  listings: []
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

let prevSessionToken = null;
store.subscribe(() => {
  const sessionToken = store.getState().sessionToken;

  if(prevSessionToken !== sessionToken)
  {
    Server.getFilters(sessionToken)
        .then(filterOptions => store.dispatch({
          type: 'NEW_FILTER_OPTIONS',
          payload: filterOptions
        }));

    Server.getListings(sessionToken, store.getState().filters)
        .then(listings => store.dispatch({
          type: 'NEW_LISTINGS',
          payload: listings
        }));
  }

  prevSessionToken = sessionToken;
});

let prevFilters = {};
store.subscribe(() => {
  const filters = store.getState().filters;
  if(!_.isEqual(filters, prevFilters))
  {
    Server.getListings(store.getState().sessionToken, filters)
      .then(listings => store.dispatch({
        type: 'NEW_LISTINGS',
        payload: listings
      }));
  }

  prevFilters = filters;
});

class App extends Component {
  componentDidMount() {
    const sessionPromise = Server.createSession()
    sessionPromise.then(sessionToken => store.dispatch({
          type: 'NEW_SESSION_TOKEN',
          payload: sessionToken
        }));
  }

  render() {
    // TODO Provider
    return <div>
      <h1>Filters</h1>
      <ReduxFilters store={ store }/>
      <h1>Listings</h1>
      <ReduxListings store={ store }/>
    </div>;
  }
}

export default App;
