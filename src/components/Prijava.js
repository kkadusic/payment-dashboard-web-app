import React from 'react'
import '../css/Prijava.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Prijava = () => {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="login-remember-checkbox">Remember me</Checkbox>
                </Form.Item>
                <a className="login-forgot-password-link" href="" >
                    Forgot password?
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-button">
                    Log in
                </Button>
                <p> Or <a className="login-register-link" href="" key="register">register now!</a> </p>
            </Form.Item>
        </Form>
    );
};

export default Prijava