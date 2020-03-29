import React from "react";
import "../css/DodavanjeRacuna.css";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const RacunUspjeh = () => {
  const history = useHistory();
  return (
    <Result
      status="success"
      title="Successfully Added New Bank Account"
      extra={[
        <Button
          type="primary"
          key="homepage"
          className="backHome"
          onClick={() => {
            history.push("/pocetna");
          }}
        >
          Go to HomePage
        </Button>,
        <Button
          key="accounts"
          onClick={() => {
            history.push("/dodaniRacuni");
          }}
        >
          View your accounts
        </Button>
      ]}
    />
  );
};

export default RacunUspjeh;
