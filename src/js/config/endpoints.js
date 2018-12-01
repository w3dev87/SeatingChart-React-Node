const sampleGuestsList = require('../../../endpoints/guests-list.sample.endpoint');

// env variable post-loaded into browser trough envify and webpack only for this file
const isDevelopment = process.env.NODE_ENV === 'development';

export const GUESTS_LIST_ENDPOINT = isDevelopment
  ? `http://localhost:3000${ sampleGuestsList }`
  : `https://seatingchartstg.herokuapp.com${ sampleGuestsList }`;
  // : 'http://gowed.com.au/guest-list.json';
