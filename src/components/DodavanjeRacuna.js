import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "../css/DodavanjeRacuna.css";
import kartice from "../creditcards1.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getToken } from "../utilities/Common";

function DodavanjeRacuna() {
  const [accOwner, setAccOwner] = useState({ value: "" });
  const history = useHistory();

  useEffect(() => {
    console.log();
    let mounted = true;
    axios
      .get("https://payment-server-si.herokuapp.com/api/auth/user/me", {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(res => {
        console.log(res.data);
        if (mounted)
          setAccOwner({ value: res.data.firstName + " " + res.data.lastName });
      })
      .catch(err => {
        console.log(err);
      });
    return () => (mounted = false);
  }, []);

  const onFinish = values => {
    console.log("Received values of form: ", values);

    const data = {
      accountOwner: accOwner.value,
      bankName: values.bankName,
      expiryDate:
        "01." +
        ("0" + (values.expiryDate._d.getMonth() + 1)).slice(-2) +
        "." +
        values.expiryDate._d.getFullYear(),
      cvc: values.cvc,
      cardNumber: values.cardNumber
    };

    axios
      .post("https://payment-server-si.herokuapp.com/api/accounts/add", data, {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(res => {
        if (res.success == true) history.push("/racunUspjeh");
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Add new bank account</h1>
      <div className="container">
        <Form name="add-account" className="accForm" onFinish={onFinish}>
          <Form.Item label="Card number" colon="false">
            <Form.Item
              name="cardNumber"
              rules={[
                { required: true, message: "Card number is required" },
                { len: 16, message: "Card number must have 16 digits" },
                { message: "Only numbers can be entered", pattern: /^[0-9]+$/ }
              ]}
            >
              <Input style={{ width: 200 }} placeholder="Enter card number" />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="Expiration date">
            <Form.Item
              name="expiryDate"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker
                picker="month"
                style={{ width: 150 }}
                placeholder="Pick a date"
                bordered={true}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="CVC">
            <Form.Item
              name="cvc"
              rules={[
                { required: true, message: "CVC is required" },
                { len: 3, message: "Card number must have 3 digits" },
                { message: "Only numbers can be entered", pattern: /^[0-9]+$/ }
              ]}
            >
              <Input style={{ width: 150 }} placeholder="Enter CVC" />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="Bank name">
            <Form.Item
              name="bankName"
              rules={[
                { required: true, message: "Bank name is required" },
                {
                  message: "Only letters can be entered",
                  pattern: /^[a-zšđčćž ]+$/gi
                }
              ]}
            >
              <Input style={{ width: 200 }} placeholder="Enter bank name" />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="Cardholder name: ">
            <Form.Item
              name="imeVlasnika"
              // rules={[
              //   { required: true, message: "Cardholder name is required" },
              //   {
              //     message: "Only letters can be entered",
              //     pattern: /^[a-zšđčćž ]+$/gi
              //   }
              // ]}
            >
              <Input
                readOnly
                style={{ width: 200 }}
                defaultValue={accOwner.value}
                placeholder={accOwner.value}
                suffix={
                  <Tooltip title="You must be account owner">
                    <QuestionCircleOutlined />
                  </Tooltip>
                }
              ></Input>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button className="dodajRacun" type="primary" htmlType="submit">
              Add account
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="imgContainer">
        <img src={kartice} alt="kartice"></img>
      </div>
    </div>
  );
}

export default DodavanjeRacuna;
