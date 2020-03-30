import React from 'react';
import axios from 'axios';
import '../../css/UserRegistration.css';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Button,
    message
} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';


const RegistrationForm = (props) => {

    const onFinish = values => {
        let questionId = 1;

        console.log('Received values of form: ', values);
        for (var i = 0; i < questions.length; i++) {
            if (values.questions.toString() === questions[i].value) {
                questionId = questions[i].id;
                break;
            }
        }

        axios.post('https://payment-server-si.herokuapp.com/api/auth/signup/' + questionId, {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            username: values.username,
            password: values.password,
            answer: {
                text: values.answer
            }
        }).then(res => {
            console.log(res.data.message);
            props.history.push('/registracijaUspjeh');
        }).catch(error => {
            console.log(error);
        });

    };


    const questions = [];

    axios.get('https://payment-server-si.herokuapp.com/questions')
        .then(response => {
            for (const [index, value] of response.data.entries()) {
                let q = {
                    id: value.id,
                    value: value.title,
                    label: value.title,
                    description: value.description
                };
                questions.push(q);
            }
        })
        .catch(error => {
            console.log(error);
        });


    return (
        <Form
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            className="registration-form"
        >

            <div style={{textAlign: "center"}}>
                <h1 style={{fontSize: "30px"}}>Sign Up </h1>
            </div>

            <div>
                <h3>Personal data </h3>
            </div>

            <Form.Item
                name="firstName"
                label="First name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your first name!',
                    },
                    ({getFieldValue}) => ({
                        validator() {
                            if (getFieldValue('firstName').length >= 4 && getFieldValue('firstName').length <= 40) {
                                return Promise.resolve();
                            }
                            return Promise.reject('First name should contain between 4 and 40 characters!');
                        }
                    })
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="lastName"
                label="Last name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    },
                    ({getFieldValue}) => ({
                        validator() {
                            if (getFieldValue('lastName').length >= 4 && getFieldValue('lastName').length <= 40) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Last name should contain between 4 and 40 characters!');
                        }
                    })
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ({getFieldValue}) => ({
                        validator() {
                            axios.get('https://payment-server-si.herokuapp.com/api/auth/user/checkEmailAvailability?email=' + getFieldValue('email'))
                                .then(response => {
                                    if (response.data.available === false) {
                                        message.error("Email already exists!");
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            return Promise.resolve();
                        }
                    })
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="username"
                label={
                    <span>
                        Username&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <QuestionCircleOutlined/>
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true
                    },
                    ({getFieldValue}) => ({
                        validator() {
                            if (getFieldValue('username').length >= 3 && getFieldValue('username').length <= 15) {
                                axios.get('https://payment-server-si.herokuapp.com/api/auth/user/checkUsernameAvailability?username=' + getFieldValue('username'))
                                    .then(response => {
                                        if (response.data.available === false) {
                                            message.error("Username already taken!");
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                                return Promise.resolve();
                            }
                            return Promise.reject('Username should contain between 3 and 15 characters!');
                        }
                    })
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ({getFieldValue}) => ({
                        validator() {
                            if (getFieldValue('password').length >= 6 && getFieldValue('password').length <= 20) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Password should contain between 6 and 20 characters!');
                        }
                    })
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>


            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <div>
                <h3>Sequrity question </h3>
            </div>


            <Form.Item
                name="questions"
                label="Question:"
                rules={[
                    {
                        required: true,
                        message: 'Please select your prefered question!'
                    }
                ]}
            >
                <Cascader options={questions}/>
            </Form.Item>


            <Form.Item
                name="answer"
                label="Answer"
                rules={[
                    {
                        required: true,
                        message: 'Please input your answer!',
                    },
                    ({getFieldValue}) => ({
                        validator() {
                            if (getFieldValue('answer') != null) {
                                return Promise.resolve();
                            }
                            return Promise.reject('First name should contain between 4 and 40 characters!');
                        }
                    })
                ]}
            >
                <Input/>
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" className="registration-button">
                    Register
                </Button>
            </Form.Item>


        </Form>
    );
};

export default RegistrationForm;