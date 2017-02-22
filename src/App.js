import React, { Component } from 'react';
import { createStore } from 'redux'
import _ from 'lodash'
import Bacon from 'baconjs'
import ReduxListings from './components/ReduxListings'
import ReduxFilters from './components/ReduxFilters'
import ReduxAcols from './compositions/ReduxAcolsComposition'
import Reducers from './Reducers'
import Server from './Server'

const store = createStore(Reducers, {
  sessionToken: null,
  filterOptions: {},
  filters: {},
  listings: [],
  interestContexts: [],
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const storeProperty = Bacon.fromBinder(sink =>
  store.subscribe(() =>
    sink(store.getState())
  )
).toProperty();

function propertyForPath(statePathFunction) {
  return storeProperty
    .map(statePathFunction)
    .skipDuplicates(_.isEqual)
    .toProperty()
}

const sessionTokenProperty = propertyForPath(s => s.sessionToken);
const filtersProperty = propertyForPath(s => s.filters);
const interestContextsProperty = propertyForPath(s => s.interestContexts);

sessionTokenProperty
    .flatMap(sessionToken =>
      filtersProperty.flatMap(filters =>
        Bacon.fromPromise(Server.getListings(sessionToken, filters))
      )
    ).onValue(listings => store.dispatch({
      type: 'NEW_LISTINGS',
      payload: listings
    }));

sessionTokenProperty
    .flatMap(sessionToken =>
      Bacon.fromPromise(Server.getFilters(sessionToken))
    ).onValue(filterOptions => store.dispatch({
      type: 'NEW_FILTER_OPTIONS',
      payload: filterOptions
    }));

sessionTokenProperty
  .flatMap(sessionToken =>
    interestContextsProperty.flatMap(() =>
      Bacon.fromPromise(Server.getAcolsInterestContexts(sessionToken))
    )
  ).onValue(interestContexts => store.dispatch({
    type: 'NEW_INTEREST_CONTEXTS',
    payload: interestContexts
}));

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
      <h1>Acols</h1>
      <ReduxAcols store={ store }/>
      <h1>Filters</h1>
      <ReduxFilters store={ store }/>
      <h1>Listings</h1>
      <ReduxListings store={ store }/>
    </div>;
  }
}

export default App;
