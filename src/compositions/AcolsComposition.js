import React, { Component } from 'react';
import _ from 'lodash';
import InterestBox from '../components/InterestBox';

class AcolsComposition extends Component {
    constructor() {
        super();

        this.state = {
            selectedContext: false,
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        const interestContexts = this.props.interestContexts;
        const interestBoxes = _.map(interestContexts, (context, i) => <InterestBox key={i} {...context} />);

        return (
            <div className="interest-boxes">
              { interestBoxes }
            </div>
        )
    }
}

AcolsComposition.propTypes = {
    interestContexts: React.PropTypes.array,
}

export default AcolsComposition;