import React from "react";
import { Divider } from "antd";
import { Bar, Line, Pie, Doughnut, Polar, Scatter } from "react-chartjs-2";

function TransakcijeMerchant() {
  return (
    <div>
      <h1>
        Prikaz dijagrama za iznos troškova po merchantima u odnosu na vremenski
        interval kojeg korisnik odabere (za određeni ili za sve bankovne račune)
        koristeći pie chart za vremenski period izabran na date (range) pickeru{" "}
      </h1>
      <Divider />
    </div>
  );
}

export default TransakcijeMerchant;
