import * as R from 'ramda';

const loggedInUserDetails = state => R.pathOr([],['Auth','loggedInUserDetails'],state);

const selectors = {
    loggedInUserDetails
};

export default selectors;