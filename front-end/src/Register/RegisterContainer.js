import React from 'react';
import Register from './Register';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import authOperations from '../state/features/Auth/operations';
import { selectors as authSelectors } from '../state/features/Auth';
// import bcrypt from 'bcryptjs';

const RegisterContainer = (props) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })

    const dispatch = useDispatch();
    const dispatchRegisterUser = authOperations.dispatchRegisterUser(dispatch);

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

    const handleUserChange = (value, input) => {
        let data;
        if (input == 'name') {
            data = {
                name: value, email: user?.email ?? '', password: user?.password ?? '',phone: user?.phone ?? ''
            }
        } else if (input == 'email') {
            data = {
                name: user?.name ?? '', email: value, password: user?.password ?? '',phone: user?.phone ?? ''
            }
        } else if (input == 'password') {
            data = {
                name: user?.name ?? '', email: user?.email ?? '', password: value, phone: user?.phone ?? ''
            }
        }else if(input == 'phone'){
            data = {
                name: user?.name ?? '', email: user?.email ?? '', password: user?.password ?? '', phone: value
            }
        }
        setUser(data)

    }

    const onRegister = () => {
        const { name, email, password, phone } = user

        if (name && email && password && phone) {
            dispatchRegisterUser(user);
        }
    }

    return (
        <Register
            user={user}
            handleUserChange={handleUserChange}
            onRegister={onRegister}
        />
    )

}

export default RegisterContainer;