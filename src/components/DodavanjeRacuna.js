import React from "react";
import { Form, Input, Select, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import "../css/DodavanjeRacuna.css";
import kartice from "../creditcards1.png";

function DodavanjeRacuna() {
  const onFinish = values => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <h1>Dodaj novi račun</h1>
      <div className="container">
        <Form name="add-account" className="accForm" onFinish={onFinish}>
          <Form.Item label="Broj kartice" colon="false">
            <Form.Item
              name="brojKartice"
              rules={[{ required: true, message: "Broj kartice je neophodan" }]}
            >
              <Input style={{ width: 300 }} placeholder="Unesi broj kartice" />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="Datum isteka">
            <Form.Item
              name="datumIsteka"
              rules={[{ required: true, message: "Datum isteka je neophodan" }]}
            >
              <DatePicker
                picker="month"
                style={{ width: 150 }}
                placeholder="Odaberi datum"
                bordered={true}
              />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="CVC">
            <Form.Item
              name="cvc"
              rules={[{ required: true, message: "CVC je neophodan" }]}
            >
              <Input style={{ width: 150 }} placeholder="Unesi CVC" />
            </Form.Item>
          </Form.Item>

          <Form.Item colon="false" label="Vlasnik računa: ">
            <Form.Item
              name="imeVlasnika"
              rules={[{ required: true, message: "Ime vlasnika je neophodno" }]}
            >
              <Input style={{ width: 300 }} placeholder="Unesi ime vlasnika" />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button className="dodajRacun" type="primary" htmlType="submit">
              Dodaj račun
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
