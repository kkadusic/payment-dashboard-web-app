import React from "react";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const NewPasswordAlert = () => {
  const history = useHistory();
  return (
    <Result
      status="success"
      title="Successfully changed the password"
      extra={[
        <Button
          type="primary"
          key="homepage"
          onClick={() => {
            history.push("/pocetna");
          }}
        >
          Go to HomePage
        </Button>,
        <Button
          key="accounts"
          onClick={() => {
            history.push("/pregledProfila");
          }}
        >
          View your profile
        </Button>
      ]}
    />
  );
};

export default NewPasswordAlert;