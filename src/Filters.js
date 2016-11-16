import React from 'react';
import _ from 'lodash';

const Filters = (props) => {
  console.log(props.filterOptions)

  return <div id='filters'>
    <div id='subjectArea'>
      <h3>Subject Area</h3>
      <select onChange={ props.onFilterChange }>
        {
          _.map(props.filterOptions.subjectsArea, concentration => {
            console.log(concentration);
            const concentrationOption = <option value={ concentration.value }>
              { concentration.displayName }
            </option>

            const specializationOptions = _.map(concentration.specializations, specialization => {
              return <option value={ specialization.value } selected={ props.filters.subjectArea === specialization.value }>
                &nbsp;&nbsp;{ specialization.displayName }
              </option>
            })

            return [concentrationOption, specializationOptions]
          })
        }
      </select>
    </div>
    <div id='degree'>

    </div>
    <div id='setting'>

    </div>
  </div>
}

Filters.propTypes = {
    filterOptions: React.PropTypes.object,
    // TODO shape
    filters: React.PropTypes.object,
    onFilterChange: React.PropTypes.func,
};

export default Filters
