import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import _ from 'lodash'
import Listings from './Listings'
import Filters from './Filters'
import Reducers from './Reducers'
import Server from './Server'

// Listings
const listingsStateToProps = state => {
  return { listings: state.listings };
}
const ReduxListings = connect(listingsStateToProps)(Listings);

// Filters
const filtersStateToProps = state => {
  return {
    filters: state.filters,
    filterOptions: state.filterOptions
  }
}
const filtersDispatchToProps = dispatch => {
  return {
    onFilterChange: filters => {
      dispatch({
        type: 'NEW_FILTERS',
        payload: filters
      });
    }
  }
}
const ReduxFilters = connect(filtersStateToProps, filtersDispatchToProps)(Filters);

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
  }

  prevSessionToken = sessionToken;
})

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
})

const sessionPromise = Server.createSession()
sessionPromise.then(sessionToken => store.dispatch({
      type: 'NEW_SESSION_TOKEN',
      payload: sessionToken
    }));


class App extends Component {
  render() {
    const filters = {
      subjectArea: null,
      degrees: [],
      setting: null
    }
    const filterOptions = null;

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
