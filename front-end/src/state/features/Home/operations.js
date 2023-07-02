import {
    getTaskDetails
} from './actions';


const dispatchTaskDetails = dispatch =>(req) =>{
    dispatch(getTaskDetails(req));
}

const operations = {
    dispatchTaskDetails
};

export default operations;