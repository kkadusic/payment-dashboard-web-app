import React, {useState} from "react";
import "../css/Prijava.css";
import {Form, Input, Button, Checkbox, Alert} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {saveUserToken, saveUserData} from "../utilities/Common";
import axios from "axios";

function Prijava() {
    const history = useHistory();
    const [warning, setWarning] = useState(false);
    const [error, setError] = useState("");
    const hideWarning = () => {
        setWarning(false);
    };
    const onFinish = values => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        // Send login request
        axios
            .post(
                "https://payment-server-si.herokuapp.com/api/auth/signin",
                {
                    usernameOrEmail: values.email,
                    password: values.password
                },
                config
            )
            .then(response => {
                // Save user token to local storage
                saveUserToken(response.data.accessToken, response.data.tokenType);
                // setToken({token: response.data.accessToken})
                return response.data;
            })
            .then(data => {
                const accessToken = data.tokenType + " " + data.accessToken;
                // Send get user data request
                return axios.get(
                    "https://payment-server-si.herokuapp.com/api/auth/user/me",
                    {
                        headers: {
                            Authorization: accessToken
                        }
                    }
                );
            })
            .then(response => {
                //Create user object
                let user = {
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email
                };

                console.log(response);

                // Save user object to storage
                saveUserData(user);
                // setUser(user)
                console.log("Login successful");
            })
            .then(() => {
                history.push("/pocetna");
            })
            .catch(error => {
                // if (error.response.data.path == "/api/auth/signin") {
                // }
                setWarning(true);
                if (error.response == null) {
                    console.log("No internet");
                    setError("No internet");
                    return;
                }
                if (error.response.status === 401) {
                    setError("Wrong username or password!");
                    console.log("Wrong username or password/Auth error", error.response);
                } else console.log(error.response.data.message);
            });
    };

    return (
        <div>
            <div className="split left">
                <div>
                </div>
            </div>
            <div className="split loginContainer">
                <h1 className="tekst" style={{color: "black", fontSize: "30px"}}>
                    Payment dashboard, made for you!
                </h1>
                <h2 style={{color: "gray", fontSize: "16px"}}>
                    Organize your bank accounts and transactions all in one place.
                </h2>
                <div>
                    <Form
                        className="login-form"
                        initialValues={{
                            remember: true
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username or email!"
                                }
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined/>}
                                placeholder="Username or Email"
                                onChange={hideWarning}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!"
                                }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="Password"
                                onChange={hideWarning}
                            />
                        </Form.Item>
                        {warning ? (
                            <Alert
                                message="Error"
                                description={error}
                                type="error"
                                style={{marginBottom: "10px"}}
                                showIcon
                            />
                        ) : null}
                        <Form.Item>
                            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="login-remember-checkbox">
                  Remember me
                </Checkbox>
              </Form.Item> */}
                            <a className="login-forgot-password-link" href="/oporavkaLozinke">
                                Forgot password?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button">
                                Log in
                            </Button>
                            <p>
                                {" "}
                                Or{" "}
                                <a
                                    className="login-register-link"
                                    href="/registracija"
                                    key="register"
                                >
                                    register now!
                                </a>{" "}
                            </p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Prijava;
