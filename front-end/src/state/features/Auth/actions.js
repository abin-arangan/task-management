import {
    GET_REGISTERED_USER,
    SET_LOGGEDIN_USER,
    GET_LOGGEDIN_USER
} from './types';

const getRegisteredUserDetails = (req) =>({
    type: GET_REGISTERED_USER,
    req
});

const setLoggedInUserDetails = (loggedInUserDetails) =>({
    type: SET_LOGGEDIN_USER,
    loggedInUserDetails
});

const getLoginUserDetails = (req) =>({
    type: GET_LOGGEDIN_USER,
    req
});


export {
    getRegisteredUserDetails,
    setLoggedInUserDetails,
    getLoginUserDetails
};