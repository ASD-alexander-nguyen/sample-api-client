import React, { Component } from 'react';
import _ from 'lodash';
import SchemaForm from  "react-jsonschema-form";
import Server from './Server'

import './Listings.css';

class Listings extends Component {
  constructor() {
    super();

    this.state = {
      programId: null,
      rfiData: null,
    }
  }

  programSelectedHandler(programId) {
    Server.getRfi(this.props.sessionToken, programId)
        .then(result =>
          this.setState({
            programId: programId,
            rfiData: result.body
          })
        );
  }

  programSubmitHandler({formData}, bandName){
    formData.band = bandName;

    Server.postRfi(this.props.sessionToken, this.state.programId, formData)
        .then((result, errors) => {
          console.log(result);
          console.log(errors);
        });
  }

  render() {
    const bands = _(this.props.listings).map(band => {
      const bandName = <h1>{ band.displayName }</h1>;
      const schools = _(band.schools).map(school => {
        const schoolName = <h2>{ school.displayName }</h2>;
        const locations = _(school.locations).map(location => {
          const locationName = <h3>{ location.displayName }</h3>;
          const programs = _(location.programs).map(program => {
            return <div>
              <div>
                <a href='#' onClick={ () => this.programSelectedHandler(program.programId) }>
                  { program.displayName }
                </a>
              </div>
              {
                this.state.programId === program.programId ?
                    <SchemaForm schema={ this.state.rfiData.questions.schema }
                                onSubmit={ formData => this.programSubmitHandler(formData, band.name) }/> :
                    null
              }
            </div>;
          });

          return [locationName, programs];
        })

        return [schoolName, locations];
      });

      return [bandName, schools];
    }).value();

    return <div>
      { bands }
    </div>;
  }
}

export default Listings;
