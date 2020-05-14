import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Card, Form, Input, Tooltip, message } from "antd";
import { getToken } from "../../utilities/Common";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "./accountComponent.css";

function AccountComponent(props) {
  const [state, setState] = useState({ visible: false, editVisible: false });
  const history = useHistory();
  const [form] = Form.useForm();

  const showModal = () => {
    setState({ visible: true });
  };

  const showEditModal = () => {
    setState({ editVisible: true });
  };

  const handleOk = (e) => {
    props.deleteAccount(props.account.id);
    hideModal();
  };

  const hideModal = (e) => {
    setState({ visible: false });
  };

  const hideEditModal = () => {
    setState({ editVisible: false });
  };

  const onFinish = (values, id) => {
    axios
      .post(
        "https://payment-server-si.herokuapp.com/api/accounts/update/" + id,
        values,
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((res) => {
        hideEditModal();
        if (res.data.success === true) {
          message.success(res.data.message);
          history.push({
            pathname: "/dodaniRacuni",
            reload: true,
          });
        }
      })
      .catch((err) => {
        if (err.response.data.status === 404)
          message.error(err.response.data.message);
      });
  };

  return (
    <Card>
      <div>
        <p>Account owner: {props.account.accountOwner}</p>
        <p>
          Expiration date:{" "}
          {props.account.expiryDate.substr(0, 7).replace(/-/g, "/")}
        </p>
        <p>Card number: {props.account.cardNumber}</p>
        <p>Balance lower limit: {props.account.balanceLowerLimit} KM</p>
        <p>Monthly limit: {props.account.monthlyLimit} KM</p>
        <p>
          Transaction amount limit: {props.account.transactionAmountLimit} KM
        </p>
        <Button style={{ float: "right" }} onClick={showModal} danger>
          Delete
        </Button>
        <Button
          style={{
            float: "right",
            marginRight: "10px",
            border: "1px solid #030852",
            color: "#030852",
          }}
          onClick={showEditModal}
        >
          Edit
        </Button>
      </div>
      <Modal
        title="Are you sure you want to delete this account?"
        visible={state.visible}
        onOk={handleOk}
        onCancel={hideModal}
      ></Modal>
      <Modal
        visible={state.editVisible}
        title="Edit bank account"
        okText="Save changes"
        cancelText="Cancel"
        onCancel={hideEditModal}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values, props.account.id);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} className="edit-account">
          <Form.Item
            label={
              <span>
                Balance lower limit&nbsp;
                <Tooltip title="What is the least amount of money you have on bank account?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            colon="false"
          >
            <Form.Item
              name="balanceLowerLimit"
              rules={[
                { required: true, message: "Balance lower limit is required" },
                { message: "Only numbers can be entered", pattern: /^[0-9]+$/ },
              ]}
            >
              <Input
                style={{ width: 250 }}
                placeholder="Enter new balance lower limit"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label={
              <span>
                Monthly limit&nbsp;
                <Tooltip title="What is limit of your monthly expenses?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            colon="false"
          >
            <Form.Item
              name="monthlyLimit"
              rules={[
                { required: true, message: "Monthly limit is required" },
                { message: "Only numbers can be entered", pattern: /^[0-9]+$/ },
              ]}
            >
              <Input
                style={{ width: 250 }}
                placeholder="Enter new monthly limit"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label={
              <span>
                Transaction amount limit&nbsp;
                <Tooltip title="What is the highest price you want to pay for one transaction?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            colon="false"
          >
            <Form.Item
              name="transactionAmountLimit"
              rules={[
                {
                  required: true,
                  message: "Transaction amount limit is required",
                },
                { message: "Only numbers can be entered", pattern: /^[0-9]+$/ },
              ]}
            >
              <Input
                style={{ width: 250 }}
                placeholder="Enter new transaction amount limit"
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default AccountComponent;
