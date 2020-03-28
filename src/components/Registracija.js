import React from "react";
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {UserOutlined, MailOutlined, LockOutlined} from "@ant-design/icons";

const FormItem = Form.Item;

const Registracija = () => {

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form onFinish={onFinish}>

            <Form.Item name="firstName"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your first name!',
                           },
                       ]}
            >
                <Input prefix={<UserOutlined/>}
                       placeholder="First name"
                />
            </Form.Item>


            <Form.Item name="lastName"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your last name!',
                           },
                       ]}
            >
                <Input prefix={<UserOutlined/>}
                       placeholder="Last name"
                />
            </Form.Item>


            <Form.Item name="username"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your username!',
                           },
                       ]}
            >
                <Input prefix={<UserOutlined/>}
                       placeholder="Username"
                />
            </Form.Item>


            <Form.Item name="email"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your E-mail!',
                           },
                       ]}
            >
                <Input prefix={<MailOutlined/>}
                       type="email"
                       placeholder="E-mail"
                />
            </Form.Item>


            <Form.Item name="password"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your password!',
                           },
                       ]}
            >
                <Input prefix={<LockOutlined/>}
                       type="password"
                       placeholder="Password"
                />
            </Form.Item>


            <Form.Item name="confirmPassword"
                       rules={[
                           {
                               required: true,
                               message: 'Please confirm your password!',
                           },
                       ]}
            >
                <Input prefix={<LockOutlined/>}
                       type="password"
                       placeholder="Confirm password"
                />
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-button">
                    Register
                </Button>
            </Form.Item>


        </Form>
    );
};

export default Registracija;