import React from 'react';
import {Layout} from 'antd';
import './Header.scss';


const Header = (props) =>{
    const {Header} = Layout;

    return(
        <>
            <Header className='headerStyle'> {props.title ?? ''}</Header>
        </>
    )
}

export default Header;

