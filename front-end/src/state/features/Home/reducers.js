import {
    SET_TASK_LIST,
    SET_MOVIE_DETAILS
} from './types';

const reducers = (state = {}, action) =>{
    switch(action.type){
        case SET_TASK_LIST :{
            const taskInformations = action.taskInformations;
            return{
                ...state, taskInformations
            }
        }
        default:
            return state

    }
}

export default reducers;