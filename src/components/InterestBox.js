import React, { Component } from 'react';
import _ from 'lodash';

// import './InterestBox.css';

class InterestBox extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={`${this.props.visualContext} interest-box`}>
                <div className="interest-context-icon"/>
                <div className={`interest-context-description`}>
                    <h3>{ this.props.title }</h3>
                    <span>{ this.props.description }</span>
                </div>
            </div>
        )
    }
}

export default InterestBox;