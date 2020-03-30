import React from "react";
import "../App.css";
import "../css/Home.css";
import { Row, Col } from "antd";
import slika1 from "../img/chart.png";

function Home() {
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

export default Home;
