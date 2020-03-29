import React from "react";
import {Form, Input, Button} from 'antd';
import {LockOutlined} from "@ant-design/icons";
import { Label } from 'semantic-ui-react';
import "../css/PromjenaLozinke.css";


function PromjenaLozinke() {

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <React.Fragment>
      <div className="title">
          <h1>Change password</h1>
        </div>
        <br></br>
        <Form onFinish={onFinish}>
          <Label>
            Input your old password:
          </Label>
            <Form.Item name="Oldassword"
                       rules={[
                           {
                               required: true,
                               message: 'Please input your old password!',
                           },
                       ]}
            >
                <Input prefix={<LockOutlined/>}
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
                <Input prefix={<LockOutlined/>}
                       type="password"
                       placeholder="New password"
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

export default PromjenaLozinke;
