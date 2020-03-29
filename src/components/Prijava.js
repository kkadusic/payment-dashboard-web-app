import React, { useState } from 'react'
import '../css/Prijava.css'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Registracija from "./Registracija";
import { loginUser } from '../utilities/Common';
import axios from 'axios';;

const Prijava = (props) => {

  const onFinish = values => {
    console.log('Received values of form: ', values)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios
      .post(
        "https://payment-server-si.herokuapp.com/api/auth/signin", 
        {
          usernameOrEmail: values.email,
          password: values.password
        },
        config
      )
      .then((response) => {
        if (response.data.length === 0) {
          console.log("missing response")
        }
        console.log("Login successful")
        loginUser(response.data.accessToken, response.data.tokenType, values.username)
        props.history.push('/pocetna');
      })
      .catch(error => {
        if (error.response == null) {
          console.log("No internet")
          return;
        }
        if (error.response.status === 401)
          console.log("Wrong username or password")
        else
          console.log(error.response.data.message)
      });
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