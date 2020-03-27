import React from "react";
import { Form, Input, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import "../css/DodavanjeRacuna.css";
import kartice from "../creditcards1.png";

function DodavanjeRacuna() {
  const onFinish = values => {
    if (values.brojKartice) console.log("Received values of form: ", values);
  };

  function isCardValid() {}

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
              <Input style={{ width: 300 }} placeholder="Enter card number" />
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
              rules={[{ required: true, message: "CVC is required" }]}
            >
              <Input style={{ width: 150 }} placeholder="Enter CVC" />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="Cardholder name: ">
            <Form.Item
              name="imeVlasnika"
              rules={[
                { required: true, message: "Cardholder name is required" }
              ]}
            >
              <Input
                style={{ width: 300 }}
                placeholder="Enter cardholder name"
              />
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
