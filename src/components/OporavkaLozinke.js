import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../css/OporavkaLozinke.css";
import { useRecoveryContext } from "../context/PasswordRecovery/RecoveryContext";

// api/recover/securityquestion ->usernameorEmial
// api/recover/newpassword ->


function OporavkaLozinke() {
	const [input, setInput] = useState({
	});

	const {recoveryUser, setRecoveryUser} = useRecoveryContext();

	const history = useHistory();

	const onFinish = values => {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		axios
			.post(
				"https://payment-server-si.herokuapp.com/api/recover/securityquestion",
				{
					usernameOrEmail: values.email
				},
				config
			)
			.then(response => {
				setRecoveryUser({
					...response.data,
					usernameEmail: values.email
				});
				history.push("sigurnosnoPitanje");
				console.log(response.data);
			})
			.catch(error => {
				setInput({
					errorMsg: "Invalid username/email",
					status: "error"
				});
				console.log(error);
			});
	};

	return (
		<div>
			<h1 id="recoveryTitle">Recover your password</h1>
			<h2 id="recoverySubTitle">
				Enter your username or email in the field below
			</h2>
			<Form
				className="recoveryForm"
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
							message: "Please input your email!"
						}
					]}
					validateStatus={input.status}
					help={input.errorMsg}
					onChange={e => {
						setInput({
							...input,
							status: "success",
							errorMsg: ""
						});
					}}
				>
					<Input
						prefix={<UserOutlined />}
						placeholder="Username or Email"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-button"
					>
						Next
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default OporavkaLozinke;
