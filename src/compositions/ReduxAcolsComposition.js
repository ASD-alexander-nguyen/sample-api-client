import AcolsComposition from './AcolsComposition'
import { connect } from 'react-redux'

const filtersStateToProps = state => {
    return {
        interestContexts: state.interestContexts,
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

export default connect(filtersStateToProps, null)(AcolsComposition);
