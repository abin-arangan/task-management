import {put,call,takeEvery,all,select} from 'redux-saga/effects';

import { 
    GET_TASK_LIST
} 
from './types';

import {notification} from 'antd';

import api from '../../../utils/apiClientHelper';

import * as homeActions from './actions';
// import homeSelector from './selectors';

const serverURL = 'http://localhost:8000';

function* getTaskDetailsSaga(req) {
    try{
        // let req = req?.req ?? {};
        
        let taskTitle = req?.req?.req?.taskTitle ?? '';
        let description = req?.req?.req?.description ?? '';
        let dueDate = req?.req?.req?.dueDate ?? '';
        let actionType = req?.req?.type ?? '';
        let priority = req?.req?.req?.priority ?? '';
        let status = req?.req?.req?.status ?? '';
        let assignee = req?.req?.req?.assignee ?? '';
        let taskId = req?.req?.req?._id ?? '';


        const response = yield call(api.callGet, `${serverURL}/taskData/getTaskDetails?taskTitle=${taskTitle}&description=${description}&dueDate=${dueDate}&actionType=${actionType}&priority=${priority}&status=${status}&assignee=${assignee}&taskId=${taskId}`);
        
        if(response && response?.data?.rc == 0){    
            const tasks = response?.data?.data ?? [];
            yield put(homeActions.setTaskDetails(tasks));
           if(actionType != 'all'){
            notification.success({
                message: 'Success',
                description: response?.data?.message ?? '',
            });
           }
        }
       
    }catch(error){
        console.error('Error in sagas:',error);
    }
}


function* watchgettaskDetailsSaga(){
    yield takeEvery(GET_TASK_LIST, getTaskDetailsSaga);
}


export default function* combinedSaga() {
    yield all ([
        watchgettaskDetailsSaga()
    ])
};