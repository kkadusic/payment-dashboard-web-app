import React, { useState } from "react";
import { Form, Input, Button, Tooltip, message } from "antd";
import { LockOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Label } from "semantic-ui-react";
import "../css/PromjenaLozinke.css";
import { getToken } from "../utilities/Common";
import axios from "axios";
import { useHistory } from "react-router-dom";

function PromjenaLozinke() {
  // State
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");

  // history
  const history = useHistory();

  // config variables for requests
  const config = {
    headers: { Authorization: `Bearer ` + getToken() }
  };

  const bodyParameters = {
    key: "value"
  };

  // when the form is sumbitted, sends post request wih given values
  const onFinish = values => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + getToken()
      }
    };
    console.log("Received values of form: ", values);
    axios
      .post(
        "https://payment-server-si.herokuapp.com/api/change/newpassword",
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          answer: values.answer
        },
        config
      )
      .then(res => {
        if (res.data.success === true) history.push("/newPasswordAlert");
        else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
      });
  };

  // Sending GET request to get security question
  axios
    .post(
      "https://payment-server-si.herokuapp.com/api/change/securityquestion",
      bodyParameters,
      config
    )
    .then(res => {
      setQuestion(res.data.title);
      setDescription(res.data.description);
    });

  return (
    <Form
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      className="change-password-form"
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "30px" }}>Change Password </h1>
      </div>

      <Form.Item
        name="oldPassword"
        label="Old password:"
        rules={[
          {
            required: true,
            message: "Please input your old password!"
          }
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" />
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
            message: "Please input your new password!"
          },
          ({ getFieldValue }) => ({
            validator() {
              if (
                getFieldValue("newPassword").length >= 6 &&
                getFieldValue("newPassword").length <= 20
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Password should contain between 6 and 20 characters!"
              );
            }
          })
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            }
          })
        ]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        style={{
          textAlign: "center"
        }}
      >
        <Label
          style={{
            fontStyle: "italic",
            fontWeight: "bold"
          }}
        >
          <span>
            Answer your security question: {question}
            <p style={styles.descriptionStyle}>{description}</p>
          </span>
        </Label>
        <Form.Item
          style={{
            display: "inlineBlock"
          }}
          name="answer"
          rules={[
            {
              required: true,
              message: "Please input the answer to your security question!"
            }
          ]}
        >
          <Input
            prefix={<QuestionCircleOutlined />}
            type="text"
            placeholder="Answer"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="change-password-button"
        >
          CHANGE PASSWORD
        </Button>
      </Form.Item>
    </Form>
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
    fontSize: "12px",
    fontWeight: "normal"
  }
};

export default PromjenaLozinke;
