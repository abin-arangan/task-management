import {
    SET_TASK_LIST
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