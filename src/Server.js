import superagent from 'superagent';

// const baseUrl = 'http://localhost:8080/api/v3';
const baseUrl = 'http://partners.perf.allstardirectories.com/api/v3';
// const baseUrl = 'http://apitest.allstardirectories.com/api/v3';
const marketContext = 'abs';
const source = 'asd';
const medium = 'seo';

class Server {
  static createSession() {
    return superagent.post(`${baseUrl}/session`)
        .query({
          marketContext: marketContext
        })
        .send({
          source: source,
          medium: medium,
          landingUrl: location.href
        })
        .then(result => result.body.s);
  }

  static getListings(sessionToken, filters) {
    return superagent.get(`${baseUrl}/listings`)
        .query({
          s: sessionToken,
          marketContext: marketContext,
          subjectArea: filters.subjectArea,
          degree: filters.degrees,
          setting: filters.setting,
          postalCode: '98166',
          distance: 100,
          resultSize: 20
        })
        .then(result => result.body.listings);
  }

  static getFilters(sessionToken) {
    return superagent.get(`${baseUrl}/filters`)
        .query({
          s: sessionToken,
          marketContext: marketContext
        })
        .then(result => result.body.filters);
  }

  static getRfi(sessionToken, programId) {
    return superagent.get(`${baseUrl}/rfi/${programId}`)
        .query({
          s: sessionToken,
          marketContext: marketContext
        });
  }

  static postRfi(sessionToken, programId, formData) {
    return superagent.post(`${baseUrl}/rfi/${this.state.programId}`)
        .query({
          s: this.state.sessionToken,
          marketContext: marketContext
        })
        .send(formData);
  }
}

export default Server;
