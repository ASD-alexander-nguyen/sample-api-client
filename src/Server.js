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

  static getAcolsInterestContexts(sessionToken) {
      if (!sessionToken) return Promise.reject([]);
      return Promise.resolve([
          {
              title: 'Video Games',
              pageTitle: 'Create New Worlds | Video Game Schools and Degrees',
              visualContext: 'vgd',
              marketContext: 'video-game-degrees',
              route: 'videogames',
              description: '',
              headerTitle: 'Explore these exciting video game degrees!'
          },
          {
              title: 'Art & Design',
              pageTitle: 'Define Your Style—Find Art and Design Schools | All College Search',
              visualContext: 'aas',
              marketContext: 'art-acs',
              route: 'art',
              description: 'Design your own life. Work with art and design in communications, production or multimedia fields. Are your creative juices flowing yet?',
              defaultSubjectArea: 'interior-design'
          },
          {
              title: 'Business',
              pageTitle: 'Take the Lead—Find Business and Finance Schools | All College Search',
              visualContext: 'abs',
              marketContext: 'business-acs',
              route: 'business',
              description: 'By the numbers or outside the box: find your fit. Manage a team and lead projects to greatness. In business, hard work and focus will take you far.'
          },
          {
              title: 'Criminal Justice',
              pageTitle: 'Protect and Serve—Find Criminal Justice Schools | All College Search',
              visualContext: 'acjs',
              marketContext: 'criminal-justice-acs',
              route: 'criminal-justice',
              description: 'If community is your priority, join leadership-minded students who work to protect and serve. Support the legal process on the ground or in the office.'
          },
          {
              title: 'Culinary & Hospitality',
              pageTitle: 'Savor Your Success—Find Culinary Arts and Baking Schools | All College Search',
              visualContext: 'acs',
              marketContext: 'culinary-acs',
              route: 'culinary',
              description: 'Learn what it takes to create special memories with exceptional service and management. Delight people with outstanding products, and a commitment to high quality.'
          },
          {
              title: 'Education',
              pageTitle: 'Keep Learning—Find Education and Teaching Schools | All College Search',
              visualContext: 'aes',
              marketContext: 'education-acs',
              route: 'education',
              description: 'The more you know, the farther you’ll go. Learning is a constant for those in this ever-changing field. Patience and persistence will earn high marks.'
          },
          {
              title: 'Healthcare',
              pageTitle: 'Be the Heartbeat of Healthcare—Find Allied Health Schools | All College Search',
              visualContext: 'ahs',
              marketContext: 'health-acs',
              route: 'health',
              description: 'Compassionate and skilled professionals are the vital signs of this thriving industry. Work broadly or with specialized contexts and populations.'
          },
          {
              title: 'Nursing',
              pageTitle: 'Administer Superior Care—Find Nursing Schools | All College Search',
              visualContext: 'ans',
              marketContext: 'nursing-acs',
              route: 'nursing',
              description: 'Tough and tender spirits excel in nursing. Nurses manage heavy workloads and demanding schedules while providing precise and caring service.'
          },
          {
              title: 'Psychology',
              pageTitle: 'Improve Minds—Find Psychology and Counseling Schools | All College Search',
              visualContext: 'apsy',
              marketContext: 'psychology-acs',
              route: 'psychology',
              description: 'The mind matters. Strengthen yours by helping others. Discover your options in a wide-ranging field that strives to improve the well-being of communities and individuals.'
          },
          {
              title: 'Technology & Engineering',
              pageTitle: 'Rule the Wired World—Find Technology and Engineering Schools | All College Search',
              visualContext: 'acom',
              marketContext: 'technology-acs',
              route: 'technology',
              description: 'As the backbone of modern business, you’ll provide imagination and essential support to a variety of industries. Creativity + tech-savvy = no limits.'
          },
          {
              title: 'Trade & Beauty',
              pageTitle: 'Hone your Skills—Find Vocational Schools | All College Search',
              visualContext: 'voc',
              marketContext: 'vocational-acs',
              route: 'trade-beauty',
              description: 'You have an eye for detail and a steady hand. Whether you strive to be a hairstylist or HVAC technician, vocational training gives you the skills to advance.'
          }
      ]);
  }
}

export default Server;
