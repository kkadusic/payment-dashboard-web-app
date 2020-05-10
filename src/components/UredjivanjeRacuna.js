import React, { useState } from "react";
import { Modal, Input, Form, Button, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { getToken } from "../utilities/Common";
import axios from "axios";

const onFinish = (values) => {
  console.log(values);
  console.log(values.bankAccountId);
  const data = {
    balanceLowerLimit: values.balanceLowerLimit,
    monthlyLimit: values.monthlyLimit,
    transactionAmountLimit: values.transactionAmountLimit,
  };
  console.log(data);
  // axios
  //   .post(
  //     "https://payment-server-si.herokuapp.com/api/accounts/update/" + bankAccountId,
  //     values,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + getToken(),
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     if (res.data.success === true) history.push("/dodaniRacuni");
  //   })
  //   .catch((err) => {
  //     if (err.response.data.status === 404)
  //       message.error(err.response.data.message);
  //   });
};

const getForm = (bankAccountId) => {
  return (
    <Form onFinish={onFinish}>
      <Form.Item colon="false" label="Bank account ID: ">
        <Form.Item name="bankAccountId">
          <Input
            readOnly
            style={{ width: 200 }}
            initiaValue={bankAccountId}
            placeholder={bankAccountId}
          ></Input>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label={
          <span>
            Balance lower limit&nbsp;
            <Tooltip title="Least amount of money you have on bank account">
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
            style={{ width: 200 }}
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
          <Input style={{ width: 200 }} placeholder="Enter new monthly limit" />
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
            { required: true, message: "Transaction amount limit is required" },
            { message: "Only numbers can be entered", pattern: /^[0-9]+$/ },
          ]}
        >
          <Input
            style={{ width: 200 }}
            placeholder="Enter new transaction amount limit"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save change
        </Button>
      </Form.Item>
    </Form>
  );
};

export const showEditModal = (bankAccountId) => {
  const [form] = Form.useForm();
  <Modal
    visible={visible}
    title="Create a new collection"
    okText="Create"
    cancelText="Cancel"
    onCancel={onCancel}
    onOk={() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onFinish(values);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }}
  >
    <Form form={form} onFinish={onFinish}>
      <Form.Item colon="false" label="Bank account ID: ">
        <Form.Item name="bankAccountId">
          <Input
            readOnly
            style={{ width: 200 }}
            initiaValue={bankAccountId}
            placeholder={bankAccountId}
          ></Input>
        </Form.Item>
      </Form.Item>
      <Form.Item
        label={
          <span>
            Balance lower limit&nbsp;
            <Tooltip title="Least amount of money you have on bank account">
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
            style={{ width: 200 }}
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
          <Input style={{ width: 200 }} placeholder="Enter new monthly limit" />
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
            { required: true, message: "Transaction amount limit is required" },
            { message: "Only numbers can be entered", pattern: /^[0-9]+$/ },
          ]}
        >
          <Input
            style={{ width: 200 }}
            placeholder="Enter new transaction amount limit"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save change
        </Button>
      </Form.Item>
    </Form>
  </Modal>;
  // Modal.confirm({
  //   keyboard: false,
  //   mask: true,
  //   maskClosable: true,
  //   backdrop: "static",
  //   width: "500px",
  //   //title: "",
  //   content: getForm(bankAccountId),
  // });
};
