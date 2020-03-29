import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { DatePicker } from "antd";
import "../css/DodavanjeRacuna.css";
import kartice from "../creditcards1.png";
import axios from "axios";

function DodavanjeRacuna() {
  const [accOwner, setAccOwner] = useState({ value: "space" });

  useEffect(() => {
    axios
      .get("https://payment-server-si.herokuapp.com/api/auth/user/me", {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTg1NDg2MDA0LCJleHAiOjE1ODYzNTAwMDR9.v-0WREeA9bq6n5_Tof8cV7ONh3gJsz8376aQD7ccwH3olO0rlOaUvEIrzAhD6IvZo2a8rcg-8S4M6OznweNjlA"
        }
      })
      .then(res => {
        console.log(res.data);
        setAccOwner(Object.assign({}, { value: res.data.firstName }));
        console.log(accOwner.value);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onFinish = values => {
    // console.log("Received values of form: ", values);

    axios
      .post(
        "https://payment-server-si.herokuapp.com/api/accounts/add",
        values,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNTg1NDg2MDA0LCJleHAiOjE1ODYzNTAwMDR9.v-0WREeA9bq6n5_Tof8cV7ONh3gJsz8376aQD7ccwH3olO0rlOaUvEIrzAhD6IvZo2a8rcg-8S4M6OznweNjlA"
          }
        }
      )
      .then(res => {
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
              name="brojKartice"
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
              name="datumIsteka"
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
              rules={[
                { required: true, message: "Cardholder name is required" },
                {
                  message: "Only letters can be entered",
                  pattern: /^[a-zšđčćž ]+$/gi
                }
              ]}
            >
              <Input
                readOnly
                style={{ width: 200 }}
                value={accOwner.firstLastName}
              ></Input>
              {/* placeholder="Enter your name" /> */}
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
