import {put,call,takeEvery,all,select} from 'redux-saga/effects';

import { 
    GET_LOGGEDIN_USER,
    GET_REGISTERED_USER
} 
from './types';

import {notification} from 'antd';

import api from '../../../utils/apiClientHelper';

import * as authActions from './actions';
// import homeSelector from './selectors';

const serverURL = 'http://localhost:8000';

function* getRegisteredUserSaga(req) {
    try{
        
        let userDetails = req?.req;
       
        const response = yield call(api.callPost,`${serverURL}/auth/RegisterUser`,userDetails);
        if(response && response?.data?.rc == 0){    
            const user = response?.data?.data ?? [];
            yield put(authActions.setLoggedInUserDetails(user));
            notification.success({
                message: 'Success',
                description: response?.data?.message ?? '',
            });
        }else if(response && response?.data?.rc == 8){
            notification.error({
                message: 'User registration failed',
                description: response?.data?.message ?? '',
            });
        }
       
    }catch(error){
        console.error('Error in sagas:',error);
    }
}

function* getLoggedInUserSaga(req) {
    try{
        
        let userDetails = req?.req;
       
        const response = yield call(api.callPost,`${serverURL}/auth/LoginUser`,userDetails);
        if(response && response?.data?.rc == 0){    
            const user = response?.data?.data ?? [];
            yield put(authActions.setLoggedInUserDetails(user));
            notification.success({
                message: 'Success',
                description: response?.data?.message ?? '',
            });
        }else if(response && response?.data?.rc == 8){
            notification.error({
                message: 'User login failed',
                description: response?.data?.message ?? '',
            });
        }
       
    }catch(error){
        console.error('Error in sagas:',error);
    }
}


function* watchgetRegisteredUserSaga(){
    yield takeEvery(GET_REGISTERED_USER, getRegisteredUserSaga);
}

function* watchgetLoggedInUserSaga(){
    yield takeEvery(GET_LOGGEDIN_USER, getLoggedInUserSaga);
}


export default function* combinedSaga() {
    yield all ([
        watchgetRegisteredUserSaga(),
        watchgetLoggedInUserSaga()
    ])
};