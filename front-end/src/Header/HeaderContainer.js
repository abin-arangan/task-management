import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import authOperations from '../state/features/Auth/operations';
import { useDispatch, useSelector } from 'react-redux';

const HeaderContainer = (props) =>{

    const dispatch = useDispatch();
    const dispatchSetLoginUser = authOperations.dispatchSetLoginUser(dispatch);


    const navigate = useNavigate();
    const onLogout = () =>{
        dispatchSetLoginUser({});
        navigate('/');
        props.setIsLoggedIn(false);

    }

    return(
        <Header title = {props.title}
        onLogout = {onLogout}
        />
    )

}

export default HeaderContainer;