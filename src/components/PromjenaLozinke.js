import React, { useState } from "react";
import { Form, Input, Button, Tooltip, message } from 'antd';
import { LockOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Label } from 'semantic-ui-react';
import "../css/PromjenaLozinke.css";
import { getToken } from '../utilities/Common';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function PromjenaLozinke() {

  // State
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  // history
  const history = useHistory();

  // when the form is sumbitted, sends post request wih given values
  const onFinish = values => {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log('Received values of form: ', values);
    axios.post("https://payment-server-si.herokuapp.com/api/change/newpassword",
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        answer: values.answer
      },
      config)
      .then(res => {
        if (res.data.success === true) history.push("/newPasswordAlert");
      })
      .catch(err => {
        console.log(err.response);
        console.log(err.request);
        if (err.response.data.status === 404)
          message.error(err.response.data.message);
      });
  };

  // Sending GET request to get security question
  axios.post("https://payment-server-si.herokuapp.com/api/change/securityquestion",
    {
      headers: {
        Authorization: "Bearer " + getToken()
      }
    })
    .then(res => {
      setQuestion(res.data.title);
      setDescription(res.data.description);
    });

  // form parameters
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 30 },
      sm: { span: 24 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <React.Fragment>
      <div style={styles.titleStyle}>
        <h1 style={styles.titleHeader}>Change password</h1>
      </div>
      <br></br>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >

        <Form.Item
          name="oldPassword"
          label="Old password:"
          rules={[
            {
              required: true,
              message: 'Please input your old password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />}
            type="password"
            placeholder="Old password"
          />
        </Form.Item>


        <Form.Item
          name="newPassword"
          label={
            <span>
              New password:&nbsp;
                        <Tooltip title="Your password should contain between 6 and 20 characters.">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
            ({ getFieldValue }) => ({
              validator() {
                if (getFieldValue('newPassword').length >= 6 && getFieldValue('newPassword').length <= 20) {
                  return Promise.resolve();
                }
                return Promise.reject('Password should contain between 6 and 20 characters!');
              }
            })
          ]}
        >
          <Input prefix={<LockOutlined />}
            type="password"
            placeholder="New password"
          />
        </Form.Item>

        <Form.Item
          style={
            {
              textAlign: "center",
            }
          }>
          <Label style={
            {
              fontStyle: "italic",
              fontWeight: "bold"
            }
          }>
            <span>
              Answer your security question: {question}
              <p style={styles.descriptionStyle}>{description}</p>
            </span>
          </Label>
          <Form.Item
          style = {
            {
              display: "inlineBlock"
            }
          }
            name="answer"
            rules={[
              {
                required: true,
                message: 'Please input the answer to your security question!',
              },
            ]}>

            <Input prefix={<QuestionCircleOutlined />}
              type="text"
              placeholder="Answer"
            />
          </Form.Item>
        </Form.Item>



        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
                </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

// style variables

const styles = {
  titleStyle: {
    background: "#030852",
    padding: "15px"
  },
  titleHeader: {
    fontStyle: "bold",
    fontSize: "20px",
    color: "#FFFFFF"
  },
  descriptionStyle: {
    fontSize: "12px",
    fontWeight: "normal"
  }
};

export default PromjenaLozinke;