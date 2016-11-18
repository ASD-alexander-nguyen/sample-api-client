import { combineReducers } from 'redux'

// TODO FSA?
// TODO action name constants
const filters = (state = {}, action) => {
  switch(action.type) {
    case 'NEW_FILTERS':
      return action.payload;
    default:
      return state;
  }
}

const filterOptions = (state = {}, action) => {
  switch(action.type) {
    case 'NEW_FILTER_OPTIONS':
      return action.payload;
    default:
      return state;
  }
}

const listings = (state = [], action) => {
  switch(action.type) {
    case 'NEW_LISTINGS':
      return action.payload;
    default:
      return state;
  }
}

const sessionToken = (state = null, action) => {
  switch(action.type) {
    case 'NEW_SESSION_TOKEN':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({ filters, filterOptions, listings, sessionToken })
