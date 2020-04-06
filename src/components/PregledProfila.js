import React, {useEffect, useState} from "react";
import {getToken, getUser} from "../utilities/Common";
import axios from "axios";
import '../css/UserProfile.css';
import userPhoto from '../img/userPhoto.png';
import {Spin} from "antd";


const PregledProfila = () => {

    const [accounts, setAccounts] = useState({
        data: [],
        loading: true
    });

    const [transactions, setTransactions] = useState({
        data: [],
        loading: true
    });

    const userData = JSON.parse(getUser());

    const loadData = () => {
        axios.get(
            "https://payment-server-si.herokuapp.com/api/accounts/all", {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        ).then(res => {
            setAccounts({
                data: (res.data.length !== 0)? Object.keys(res.data).length : '0',
                loading: false
            });
        }).catch(err => {
            console.log(err);
        });

        axios.get(
            "https://payment-server-si.herokuapp.com/api/transactions/all", {
                headers: {
                    Authorization: "Bearer " + getToken()
                }
            }
        ).then(res => {
            setTransactions({
                data: (res.data.length !== 0)? Object.keys(res.data).length : '0',
                loading: false
            });
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(loadData, []);

    return (
        <div>
            {(accounts.loading || !accounts.data || transactions.loading || !transactions.data) ? (
                <Spin size="large" style={{"margin": "0"}}/>
            ) : (
                <div className="wrapper">
                    <div className="left">
                        <img src={userPhoto}
                             alt="user"/>
                        <h3 style={{color: "white"}}>{userData.firstName} {userData.lastName}</h3>
                    </div>
                    <div className="right">
                        <div className="info">
                            <h3>Information</h3>
                            <div className="info_data">
                                <div className="data">
                                    <h4>Email</h4>
                                    <p>{userData.email}</p>
                                </div>
                                <div className="data">
                                    <h4>Username</h4>
                                    <p>{userData.username}</p>
                                </div>
                            </div>
                        </div>

                        <div className="projects">
                            <h3>Bank accounts</h3>
                            <div className="projects_data">
                                <div className="data">
                                    <h4>Currently </h4>
                                    <p>{accounts.data}</p>
                                </div>
                            </div>
                        </div>

                        <div className="projects">
                            <h3>Transactions</h3>
                            <div className="projects_data">
                                <div className="data">
                                    <h4>Currently </h4>
                                    <p>{transactions.data}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PregledProfila;
