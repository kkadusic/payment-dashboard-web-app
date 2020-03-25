import React from "react";
import "../App.css";
import { Row, Col } from "antd";
import slika1 from "../chart.png";

function HomePage() {
  return (
    <div>
      <div>
        <h1>Dobrodošli nazad!</h1>
      </div>

      <div>
        <Row>
          <Col span={12}>
            <img src={slika1} alt="slika"></img>
          </Col>
          <Col span={12}>
            <img src={slika1} alt="slika"></img>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <img src={slika1} alt="slika"></img>
          </Col>
          <Col span={12}>
            <img src={slika1} alt="slika"></img>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
