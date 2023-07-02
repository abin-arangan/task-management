import {all} from 'redux-saga/effects';
import {combinedSaga as homeSaga} from './Home';

export default function* rootSaga() {
    yield all([
        homeSaga()
    ]);
}