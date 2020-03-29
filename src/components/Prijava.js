import React, { useState } from 'react'
import '../css/Prijava.css'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { saveUserToken, saveUserData } from '../utilities/Common';
import axios from 'axios';

const Prijava = (props) => {

  const onFinish = values => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    // Send login request
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
        // Save user token to local storage
        saveUserToken(response.data.accessToken, response.data.tokenType)
        return response.data
      })
      .then((data) => {
        const token = data.tokenType + " " + data.accessToken
        // Send get user data request
        return axios.get(
          "https://payment-server-si.herokuapp.com/api/auth/user/me",
          {
            headers:
            {
              Authorization: token
            }
          }
        )
      })
      .then((response) => {
        //Create user object
        let user = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.userName,
          email: response.data.email
        }
        // Save user object to storage
        saveUserData(user)
        console.log("Login successful")
        props.history.push('/pocetna');
      })
      .catch(error => {
        // if (error.response.data.path == "/api/auth/signin") {
        // }
        if (error.response == null) {
          console.log("No internet")
          return;
        }
        if (error.response.status === 401)
          console.log("Wrong username or password/Auth error", error.response)
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
        <p> Or <a className="login-register-link" href="/registracija" key="register">register now!</a> </p>
      </Form.Item>
    </Form>
  );
};

export default Prijava




