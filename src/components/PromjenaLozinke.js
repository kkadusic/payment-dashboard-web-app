import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { LockOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Label } from 'semantic-ui-react';
import "../css/PromjenaLozinke.css";
import { getToken } from '../utilities/Common';
import axios from 'axios';


function PromjenaLozinke() {

  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <React.Fragment>
      <div style={styles.titleStyle}>
        <h1 style={styles.titleHeader}>Change password</h1>
      </div>
      <br></br>
      <Form onFinish={onFinish}>
        <Label>
          Input your old password:
          </Label>
        <Form.Item name="oldPassword"
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

        <Label>
          Input your new password:
            </Label>
        <Form.Item name="newPassword"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />}
            type="password"
            placeholder="New password"
          />
        </Form.Item>

        <Label>
          Answer your security question:
            </Label>
        <br></br>
        <p>{question}</p>
        <p style={styles.descriptionStyle}>{description}</p>

        <Form.Item name="answer"
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

        <Form.Item>
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
    background: "#adc6ff",
    padding: "15px"
  },
  titleHeader: {
    fontStyle: "bold",
    fontSize: "20px"
  },
  descriptionStyle: {
    fontSize: "15px"
  }
};

export default PromjenaLozinke;