import React from 'react';
import Login from './Login';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from '../state/features/Auth/operations';
import { selectors as authSelectors } from '../state/features/Auth';
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';


const LoginContainer = (props) =>{

    const navigate = useNavigate();
    const [loginUser,setLoginUser] = useState({
        email:"",
        password: ""
    })

    const dispatch = useDispatch();
    const dispatchLoginUser = authOperations.dispatchLoginUser(dispatch);

    const { loggedInUserDetails
    } = useSelector(state => ({
        loggedInUserDetails: authSelectors.loggedInUserDetails(state)

    }));

    useEffect(() => {
        if (Object.keys(loggedInUserDetails)?.length > 0) {
            props.setIsLoggedIn(true);
            navigate("/home");
        }
    }, [loggedInUserDetails]);

    const onLoginChange = (value, input) =>{
        let data;
        if(input == 'email'){
            data = {email: value, password: loginUser.password ?? ''}
        }else if(input == 'password'){
            data = {email: loginUser.email ?? '', password: value}
        }
        setLoginUser(data);
    }

    const onLogin =()=>{
        let {email, password} = loginUser;
        const key = 'secret-encrypt-password'; // Shared secret key
        const encrypted = CryptoJS.AES.encrypt(password, key).toString();
        loginUser.password = encrypted;
        if(email && password)
            dispatchLoginUser(loginUser);
    }

    return(
        <Login
        loginUser = {loginUser}
        onLogin = {onLogin}
        onLoginChange ={onLoginChange}
        />
    )

}

export default LoginContainer;