import {
    getRegisteredUserDetails,
    getLoginUserDetails,
    setLoggedInUserDetails

} from './actions';


const dispatchRegisterUser = dispatch =>(req) =>{
    dispatch(getRegisteredUserDetails(req));
}

const dispatchLoginUser = dispatch =>(req) =>{
    dispatch(getLoginUserDetails(req));
}

const dispatchSetLoginUser = dispatch =>(req) =>{
    dispatch(setLoggedInUserDetails(req));
}

const operations = {
    dispatchRegisterUser,
    dispatchLoginUser,
    dispatchSetLoginUser
};

export default operations;