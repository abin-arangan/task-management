import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import './Header.scss';


const Header = (props) => {

    return (
        <>
            <div className='headerStyle'>
                <Row>
                    <Col flex="1 1 200px"><h4 className='title'>{props?.title ?? ''}</h4></Col>
                    <Col flex="0 1 300px"><Button className='logout' onClick={props.onLogout}> Log out</Button></Col>

                </Row>
                <div >
                </div>
            </div>
        </>
    )
}

export default Header;

