import React, { useState, useCallback, useEffect} from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../css/OporavkaLozinke.css";
import { useRecoveryContext } from "../context/PasswordRecovery/RecoveryContext";
import axios from "axios";
import {useHistory} from "react-router-dom"

const FormStyle = {
	margin: "auto"
};

// api/recover/securityquestion ->usernameorEmial
// api/recover/newpassword ->

function OporavkaLozinke() {
    const { recoveryUser, setRecoveryUser } = useRecoveryContext();
    const [username, setUsername] = useState(recoveryUser.usernameEmail);
   
	const [counter, setCounter] = useState(0);
	console.log("USLI SMO" + recoveryUser);
	const [input, setInput] = useState({});
    const [values, setValues] = useState({});
    const history = useHistory();


	useEffect(() => {
		if (counter == 0 || recoveryUser.success) return;  //do not enter the first time
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		axios
			.post(
				"https://payment-server-si.herokuapp.com/api/recover/newpassword",
				{
					usernameOrEmail: username,
					answer: values.answer
				},
				config
			)
			.then(response => {
				console.log("Counter: " + counter);
				if (!response.data.success) {
					setInput({
						errorMsg: "Invalid answer",
						status: "error"
                    });
                    if(counter==3){
                        alert("You tried too many times!");
                        history.push("/prijava");
                    }
                }
                else{
                    setRecoveryUser(response.data);
                	history.push("/novaSifra");
                }
				console.log(response.data);
			})
			.catch(error => {
				alert("Doslo je do greske!");
				console.log(error);
			});
	}, [counter]);

	return (
		<div>
			<h1 id="recoveryTitle">Security Question</h1>
			<h2 id="recoverySubTitle">{recoveryUser.title}</h2>
			<Form
				className="recoveryForm"
				initialValues={{
					remember: true
				}}
				onFinish={v => {
					setValues(v);
					setCounter(c => c + 1);
				}}
			>
				<Form.Item
					name="answer"
					rules={[
						{
							required: true,
							message: "Please input your answer!"
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
						placeholder="Answer the question above"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-button"
					>
						Recover password
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default OporavkaLozinke;
