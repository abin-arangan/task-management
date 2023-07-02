import * as R from 'ramda';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

function CustomException(error) {
    return{
        endpoint: R.pathOr('',['response','config','url'],error),
        statusText: R.pathOr('',['response','statustext'],error),
        message: R.pathOr('',['message'],error),
        status: R.pathOr(500,['response','status'],error),
        data: R.pathOr(null,['response','data'],error),
    };
}

const get = (endpoint, headers, options = {}) =>{
    
    const commonHeaders = {
        'Content-Type': 'application/json',
        'x-correlation-id': uuidv4()
    };

    const commonOptions = {
        method: 'GET',
        responseType: 'json',
        ...options
    };

    return axios.get(endpoint,
        {
            ...commonOptions,
            headers: {...commonHeaders,...headers},
        })
        .then(response => {return response;})
        .catch((error) =>{
            throw new CustomException(error);
        });
};

const post = (endpoint,data, headers, options = {}) =>{
    
    const commonHeaders = {
        'Content-Type': 'application/json',
        'x-correlation-id': uuidv4()
    };

    const commonOptions = {
        method: 'POST',
        responseType: 'json',
        ...options
    };

    return axios.post(endpoint,
        {
            ...commonOptions,
            headers: {...commonHeaders,...headers},
            data
        })
        .then(response => {return response;})
        .catch((error) =>{
            throw new CustomException(error);
        });
};


function exportFunctions() {
    let callGet = get;
    let callPost = post;
    return{
        callGet,
        callPost

    };
}

export default exportFunctions();


