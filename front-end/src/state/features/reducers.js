import { combineReducers } from "redux";
import {reducers as Home} from './Home';
import {reducers as Auth} from './Auth';

const rootReducer = combineReducers({
    Home,
    Auth
});

export default rootReducer;