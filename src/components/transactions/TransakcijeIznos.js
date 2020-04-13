import React, {useState, useEffect} from "react";
import {Divider, Select} from "antd";
import {Radar} from "react-chartjs-2";
import axios from "axios";
import {getToken} from "../../utilities/Common";

const TransakcijeMerchant = () => {
    const [chartData, setChartData] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("all");

    const merchantPrice = [];

    useEffect(() => {
        getTransactions();
        getBankAccounts();
    }, []);

    const getTransactions = () => {
        axios
            .get("https://payment-server-si.herokuapp.com/api/transactions/all", {
                headers: {Authorization: "Bearer " + getToken()},
            })
            .then((response) => {
                setTransactions(response.data);
                initialize(response.data);
            })
            .catch((err) => console.log(err));
    };

    const getBankAccounts = () => {
        axios
            .get("https://payment-server-si.herokuapp.com/api/accounts/all", {
                headers: {Authorization: "Bearer " + getToken()},
            })
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((err) => console.log(err));
    };


    useEffect(() => {
        handleAccChange(selectedAccount);
    }, [transactions]);


    const initialize = (dbData) => {
        dbData.forEach((transaction) => {
            if (merchantPrice.hasOwnProperty(transaction.merchantName)) {
                merchantPrice[transaction.merchantName] += transaction.totalPrice;
            }
            else {
                merchantPrice[transaction.merchantName] = transaction.totalPrice;
            }
        });

        setChartData({
            labels: Object.keys(merchantPrice),
            datasets: [
                {
                    label: "Spendings by merchant",
                    backgroundColor: 'rgba(0,125,200,0.3)',
                    borderColor: 'gray',
                    data: Object.values(merchantPrice),
                }
            ]
        });
    };

    const handleAccChange = (value) => {
        setSelectedAccount(value);
        if (value !== "all") {
            const newTransactions = [];
            transactions.forEach((transaction) => {
                if (transaction.cardNumber === value) newTransactions.push(transaction);
            });
            initialize(newTransactions);
        } else {
            initialize(transactions);
        }
    };

    const chartOptions = {
        maintainAspectRatio: true,
        responsive: true,
        title: {
            display: true,
            text: "Spendings on merchants",
            fontColor: "#030852",
            fontSize: 16,
        },
        legend: {
            display: false,
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return (
                        data["labels"][tooltipItem["index"]] + ": " +
                        data["datasets"][0]["data"][tooltipItem["index"]] + " KM"
                    );
                },
            },
        },
    };


    return (
        <div>
            <h1>
                Chart showing how much money is spent on each merchant by each bank account
            </h1>
            <Select
                placeholder="Select bank account"
                style={{width: 200}}
                onChange={handleAccChange}
                defaultValue="all"
            >
                {accounts.map((title) => (
                    <Select.Option key={title.id} value={title.cardNumber}>
                        {title.cardNumber}
                    </Select.Option>
                ))}
                <Select.Option key="all" value="all">
                    All accounts
                </Select.Option>
            </Select>

            <Divider/>
            <Radar
                data={chartData}
                options={chartOptions}
            />
        </div>
    );
};

export default TransakcijeMerchant;