import {
    SET_LOGGEDIN_USER
} from './types';

const reducers = (state = {}, action) =>{
    switch(action.type){
        case SET_LOGGEDIN_USER :{
            const loggedInUserDetails = action.loggedInUserDetails;
            return{
                ...state, loggedInUserDetails
            }
        }
        default:
            return state

    }
}

export default reducers;