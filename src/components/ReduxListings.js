import Listings from './Listings'
import { connect } from 'react-redux'

const listingsStateToProps = state => {
  return {
    sessionToken: state.sessionToken,
    listings: state.listings
   };
}

export default connect(listingsStateToProps)(Listings);
