import React from "react";
import "../App.css";
import "../css/HomePage.css";
import { Row, Col } from "antd";
import slika1 from "../chart.png";

function HomePage() {
  return (
    <div className="container">
      <div>
        <div className="title">
          <h1>Dobrodošli nazad!</h1>
        </div>

        <div className="container">
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
    </div>
  );
}

export default HomePage;
