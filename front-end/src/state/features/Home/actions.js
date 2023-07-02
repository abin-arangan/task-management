import {
    GET_TASK_LIST,
    SET_TASK_LIST
} from './types';

const getTaskDetails = (req) =>({
    type: GET_TASK_LIST,
    req
});

const setTaskDetails = (taskInformations) =>({
    type: SET_TASK_LIST,
    taskInformations
});


export {
    getTaskDetails,
    setTaskDetails
};