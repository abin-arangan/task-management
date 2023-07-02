import * as R from 'ramda';

const taskInformations = state => R.pathOr([],['Home','taskInformations'],state);

const selectors = {
    taskInformations
};

export default selectors;