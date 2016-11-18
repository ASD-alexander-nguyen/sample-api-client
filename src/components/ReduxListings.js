import Listings from './Listings'
import { connect } from 'react-redux'

const listingsStateToProps = state => {
  return { listings: state.listings };
}

export default connect(listingsStateToProps)(Listings);
