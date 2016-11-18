import Filters from './Filters'
import { connect } from 'react-redux'

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

export default connect(filtersStateToProps, filtersDispatchToProps)(Filters);
