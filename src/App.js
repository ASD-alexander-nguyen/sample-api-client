import React, { Component } from 'react';
import superagent from 'superagent';
import _ from 'lodash';
import SchemaForm from  "react-jsonschema-form";
import Filters from './Filters'

import './App.css';

const baseUrl = 'http://localhost:8080/api/v3';
// const baseUrl = 'http://partners.perf.allstardirectories.com/api/v3';
// const baseUrl = 'http://apitest.allstardirectories.com/api/v3';
const marketContext = 'abs';
const source = 'asd';
const medium = 'seo';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sessionToken: null,
      listings: [],
      programId: null,
      rfiData: null,
      filters: {
        subjectArea: null,
        degrees: [],
        setting: null
      },
      filterOptions: null
    }
  }

  componentDidMount() {
    const sessionPromise = superagent.post(`${baseUrl}/session`)
        .query({
          marketContext: marketContext
        })
        .send({
          source: source,
          medium: medium,
          landingUrl: location.href
        })
        .then(result => {
          this.setState({
            sessionToken: result.body.s
          })

          return result.body.s;
        })

        // listings
        sessionPromise.then(sessionToken => this.listingsUpdate(sessionToken));

        // filters
        sessionPromise.then(sessionToken => {
          return superagent.get(`${baseUrl}/filters`)
              .query({
                s: sessionToken,
                marketContext: marketContext
              })
              .then(result =>
                this.setState({
                  filterOptions: result.body.filters
                })
              );
        });
  }

  listingsUpdate(sessionToken) {
    return superagent.get(`${baseUrl}/listings`)
        .query({
          s: sessionToken,
          marketContext: marketContext,
          subjectArea: this.state.filters.subjectArea,
          degree: this.state.filters.degrees,
          setting: this.state.filters.setting,
          postalCode: '98166',
          distance: 100,
          resultSize: 20,
          inquiries: {
            '178254_1': new Date().toJSON(),
            '178255_1': new Date().toJSON()
          }
        })
        .then(result =>
          this.setState({
            listings: result.body.listings
          })
        );
  }

  filtersUpdateHandler(filters) {
    this.setState({
      filters: filters
    });
  }

  programSelectedHandler(programId) {
    superagent.get(`${baseUrl}/rfi/${programId}`)
        .query({
          s: this.state.sessionToken,
          marketContext: marketContext
        })
        .then(result =>
          this.setState({
            programId: programId,
            rfiData: result.body
          })
        );
  }

  programSubmitHandler({formData}, bandName){
    formData.band = bandName;

    superagent.post(`${baseUrl}/rfi/${this.state.programId}`)
        .query({
          s: this.state.sessionToken,
          marketContext: marketContext
        })
        .send(formData)
        .then((result, errors) => {
          console.log(result);
          console.log(errors);
        });
  }

  render() {
    const bands = _(this.state.listings).map(band => {
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
      <h1>Filters</h1>
      { this.state.filterOptions ? <Filters filterOptions={ this.state.filterOptions } filters={ this.state.filters } onFilterChange={ (filters) => this.filtersUpdateHandler(filters) }/> : null }
      <h1>Listings</h1>
      { bands }
    </div>;
  }
}

export default App;
