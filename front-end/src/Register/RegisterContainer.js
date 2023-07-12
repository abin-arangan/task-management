import React from 'react';
import Register from './Register';
import { Form, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import authOperations from '../state/features/Auth/operations';
import { selectors as authSelectors } from '../state/features/Auth';
import CryptoJS from 'crypto-js';

const RegisterContainer = (props) => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    })
    const [selectedPrefix, setSelectedPrefix] = useState('+971');

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
                name: value, email: user?.email ?? '', password: user?.password ?? '', phone: user?.phone ?? ''
            }
        } else if (input == 'email') {
            data = {
                name: user?.name ?? '', email: value, password: user?.password ?? '', phone: user?.phone ?? ''
            }
        } else if (input == 'password') {
            data = {
                name: user?.name ?? '', email: user?.email ?? '', password: value, phone: user?.phone ?? ''
            }
        } else if (input == 'phone') {
            let prefix = selectedPrefix;
            let mobileNumber = prefix.concat(value);
            data = {
                name: user?.name ?? '', email: user?.email ?? '', password: user?.password ?? '', phone: mobileNumber
            }
        }
        setUser(data)

    }

    const prefixMobileNumber = [
        {id: 1, prefix: '+971'},
        {id: 2, prefix: '+91'}
    ];

    const onSelectprefix = (value) =>{
        setSelectedPrefix(value);
    };

    const prefixSelector = (
        <>
            <Form.Item name="prefix" noStyle>
            <Select style={{ width: 75, backgroundColor: 'white'}} onSelect={onSelectprefix}>
                {
                    prefixMobileNumber.map(prefixData =>
                        <Select.Option value={prefixData?.prefix} key={prefixData?.id}>{prefixData?.prefix}</Select.Option>
                    )
                }
                 </Select>
            </Form.Item>
        </>
    );


    const onRegister = () => {
        const { name, email, password, phone } = user
        const key = 'secret-encrypt-password'; // Shared secret key
        const encrypted = CryptoJS.AES.encrypt(password, key).toString();
        user.password = encrypted;
        if (name && email && password && phone) {
            dispatchRegisterUser(user);
        }
    }

    return (
        <Register
            user={user}
            handleUserChange={handleUserChange}
            onRegister={onRegister}
            prefixSelector={prefixSelector}
        />
    )

}

export default RegisterContainer;