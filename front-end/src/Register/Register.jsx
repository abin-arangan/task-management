import React from 'react';
import './Register.scss';
import { Input, Button, Form, Space } from 'antd';
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';


const Register = (props) => {

    return (
        <>
            <div>
                <div className='center'>
                    <h3 style={{ textAlign: 'center' }}>Register a new account</h3>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        onFinish={props.onRegister}
                        className="login-form"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your name' }]}
                        >
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="name"
                                placeholder="Name"
                                onChange={(e) => props.handleUserChange(e.target.value, 'name')}
                                value={props?.user?.name}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email Id' }]}
                        >
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="Email"
                                onChange={(e) => props.handleUserChange(e.target.value, 'email')}
                                value={props?.user?.email}
                            />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[
                                { required: true, message: 'Please input your phone number' },
                                () => ({
                                    validator(_, value) {
                                      if (isNaN(value)) {
                                        return Promise.reject("Mobile No. has to be a number.");
                                      }
                                      else if (value.length < 10) {
                                        return Promise.reject("Mobile No. can't be less than 10 digits");
                                      }
                                      else if (value.length > 10) {
                                        return Promise.reject("Mobile No. can't be more than 10 digits");
                                      }
                                      return Promise.resolve();
                                    },
                                  }),
                              ]}
                              validateTrigger= 'onBlur'
                        >
                            <Input  
                                placeholder="Phone Number"
                                minLength={10}
                                onChange={(e) => props.handleUserChange(e.target.value, 'phone')}
                                value={props?.user?.phone} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                onChange={(e) => props.handleUserChange(e.target.value, 'password')}
                                value={props?.user?.password}

                            />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: 250, marginLeft: 55 }}
                                // className="login-form-button"
                                >
                                    Register
                                </Button>
                                Or
                                <Link className='link' to='/' >
                                    <li>Login</li>
                                </Link>
                            </Space>
                        </Form.Item>

                    </Form>


                </div>
            </div>
        </>
    )
}

export default Register;

