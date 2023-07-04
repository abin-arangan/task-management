import {all} from 'redux-saga/effects';
import {combinedSaga as homeSaga} from './Home';
import {combinedSaga as authSaga} from './Auth';

export default function* rootSaga() {
    yield all([
        homeSaga(),
        authSaga()
    ]);
}