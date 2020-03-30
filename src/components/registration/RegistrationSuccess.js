import React from "react";
import "../../css/RegistrationSuccess.css";
import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

const RegistrationSuccess = () => {
    const history = useHistory();
    return (
        <Result
            status="success"
            title="Successfully Added New User Account"
            extra={[
                <Button
                    type="primary"
                    key="login"
                    onClick={() => {
                        history.push("/prijava");
                    }}
                >
                    Log Into Your Account
                </Button>,
                <Button
                    key="homepage"
                    className="backHome"
                    onClick={() => {
                        history.push("/pocetna");
                    }}
                >
                    Go to Homepage
                </Button>
            ]}
        />
    );
};

export default RegistrationSuccess;