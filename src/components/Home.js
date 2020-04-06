import React from "react";
import "../App.css";
import "../css/Home.css";
import { Carousel } from "antd";
import slika1 from "../img/cards.png";
import slika2 from "../img/expenses.jpg";
import slika3 from "../img/analytics.jpg";
import slika4 from "../img/connect-mobile.png";
import { getUser } from "../utilities/Common";

function Home() {
  return (
    <div className="homeContainer">
      <h1>
        {" "}
        Welcome back,{" "}
        {JSON.parse(getUser()).firstName +
          " " +
          JSON.parse(getUser()).lastName}{" "}
        !
      </h1>
      <Carousel autoplay>
        <div>
          <h3>Manage payment options</h3>
          <img src={slika1}></img>
        </div>
        <div>
          <h3>Control your expenses</h3>
          <img src={slika2}></img>
        </div>
        <div>
          <h3>Find out what products do you spend most money on</h3>
          <img src={slika3}></img>
        </div>
        <div>
          <h3>Connect with your PayApp</h3>
          <img src={slika4}></img>
        </div>
      </Carousel>
    </div>
  );
}

export default Home;
export const user = JSON.parse(getUser());
