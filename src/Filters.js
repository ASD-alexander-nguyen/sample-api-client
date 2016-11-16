import React, { Component } from 'react';
import _ from 'lodash';

import './Filters.css';

class Filters extends Component {
  handleFilterChange() {
    this.props.onFilterChange({
      subjectArea: this.subjectArea.value,
      degrees: _(this.degrees.options)
          .filter(o => o.selected)
          .map(o => o.value)
          .value(),
      setting: this.setting.value,
    });
  };

  render() {
    return <div id='filters'>
      <div id='subjectArea' className='filter'>
        <h3>Subject Area</h3>
        <select defaultValue={ this.props.filters.subjectArea } onChange={ _.bind(this.handleFilterChange, this) } ref={ elem => {this.subjectArea = elem} }>
          <option key='all'></option>
          {
            _.map(this.props.filterOptions.subjectsArea, concentration => {
              const concentrationOption = <option value={ concentration.value } key={ concentration.value }>
                { concentration.displayName }
              </option>

              const specializationOptions = _.map(concentration.specializations, specialization => {
                return <option value={ specialization.value } key={ specialization.value }>
                  &nbsp;&nbsp;{ specialization.displayName }
                </option>
              })

              return [concentrationOption, specializationOptions]
            })
          }
        </select>
      </div>
      <div id='degrees' className='filter'>
        <h3>Degree</h3>
        <select defaultValue={ this.props.filters.degrees } onChange={ _.bind(this.handleFilterChange, this) } ref={ elem => {this.degrees = elem} } multiple>
          <option key='all'></option>
          {
            _.map(this.props.filterOptions.degree, degree => {
              return <option value={ degree.value } key={ degree.value }>
                { degree.displayName }
              </option>
            })
          }
        </select>
      </div>
      <div id='setting' className='filter'>
        <h3>Setting</h3>
        <select defaultValue={ this.props.filters.setting } onChange={ _.bind(this.handleFilterChange, this) } ref={ elem => {this.setting = elem} }>
          <option key='all'></option>
          {
            _.map(this.props.filterOptions.setting, setting => {
              return <option value={ setting.value } key={ setting.value }>
                { setting.displayName }
              </option>
            })
          }
        </select>
      </div>
    </div>
  }
}

Filters.propTypes = {
    filterOptions: React.PropTypes.object,
    // TODO shape
    filters: React.PropTypes.object,
    onFilterChange: React.PropTypes.func,
};

export default Filters
