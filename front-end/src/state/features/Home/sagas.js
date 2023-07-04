import { put, call, takeEvery, all, select } from 'redux-saga/effects';

import {
    GET_TASK_LIST
}
    from './types';

import { notification } from 'antd';

import api from '../../../utils/apiClientHelper';

import * as homeActions from './actions';
import authSelector from '../Auth/selectors';

const serverURL = 'http://localhost:8000';

function* getTaskDetailsSaga(req) {
    try {

        let actionType = req?.req?.type ?? '';
        let reqObj = req?.req;
        const loggedInUser = yield select(authSelector.loggedInUserDetails);
        reqObj.loggedInUser = loggedInUser;
        
        const response = yield call(api.callPost, `${serverURL}/taskData/getTaskDetails`, reqObj);
        if (response && response?.data?.rc == 0) {
            const tasks = response?.data?.data ?? [];
            yield put(homeActions.setTaskDetails(tasks));
            if (actionType != 'all') {
                notification.success({
                    message: 'Success',
                    description: response?.data?.message ?? ''
                });
            }
        } else if (response && response?.data?.rc == 8) {
            yield put(homeActions.setTaskDetails([]));
            notification.error({
                message: 'Error',
                description: response?.data?.message ?? ''
            });
        }


    } catch (error) {
        console.error('Error in sagas:', error);
    }
}


function* watchgettaskDetailsSaga() {
    yield takeEvery(GET_TASK_LIST, getTaskDetailsSaga);
}


export default function* combinedSaga() {
    yield all([
        watchgettaskDetailsSaga()
    ])
};