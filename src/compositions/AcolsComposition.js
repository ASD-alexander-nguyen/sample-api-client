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

    handleClick(context) {
        const selectedContext = context.visualContext;
        this.setState({
            selectedContext
        });
    }

    render() {
        const interestContexts = this.props.interestContexts;
        const interestBoxes = _.map(interestContexts, (context, i) => { return <InterestBox key={i} selected={ this.state.selectedContext === context.visualContext } onClick={ _.bind(this.handleClick, this, context) } {...context} /> });

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