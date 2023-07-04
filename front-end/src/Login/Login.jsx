import React from 'react';
import './Login.scss';
import { Input, Button, Form, Space } from 'antd';
import Icon from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Login = (props) => {

    return (
        <>
        <div>
            <div className='centerLogin'>
                <h3  style={{ textAlign: 'center' }}>Login account</h3>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={props.onLogin}
                    className="login-form"
                    autoComplete='off'
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email Id' }]}
                        
                    >
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Email"
                            onChange={(e) => props.onLoginChange(e.target.value, 'email')}
                            autoComplete="off"
                            value={props?.loginUser?.email}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            onChange={(e) => props.onLoginChange(e.target.value, 'password')}
                            value={props?.loginUser?.password}

                        />
                    </Form.Item>
                    
                    <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: 250 }}
                        >
                            Login
                        </Button>
                        Or
                        <Link className='link' to='/register' >
                            <li>Register</li>
                        </Link>
                        </Space>
                    </Form.Item>
                    
                </Form>


            </div>
        </div>
           
        </>
    )
}

export default Login;

