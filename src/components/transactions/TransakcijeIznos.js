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

    const comparedAccounts = [];
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


    let chartOptions = {
        maintainAspectRatio: true,
        responsive: true,
        title: {},
        legend: {},
        tooltips: {},
    };

    const initialize = (dbData) => {
        dbData.forEach((transaction) => {
            if (merchantPrice.hasOwnProperty(transaction.merchantName)) {
                merchantPrice[transaction.merchantName] += transaction.totalPrice;
            } else {
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

    function random_rgba() {
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',0.3)';
    }

    const initializeCompare = (myAccounts, myTransactions) => {
        myAccounts.forEach((account) => {
            comparedAccounts.push({
                cardNumber: account.cardNumber,
                merchantPrice: []
            });
        });

        myTransactions.forEach((transaction) => {
            for (let i = 0; i < comparedAccounts.length; i++) {
                comparedAccounts[i].merchantPrice[transaction.merchantName] = 0;
            }
        });

        myTransactions.forEach((transaction) => {
            for (let i = 0; i < comparedAccounts.length; i++) {
                if (transaction.cardNumber === comparedAccounts[i].cardNumber) {
                    comparedAccounts[i].merchantPrice[transaction.merchantName] += transaction.totalPrice;
                }
            }
        });


        let myDatasets = [];
        comparedAccounts.forEach((item) => {
            let color = random_rgba();
            myDatasets.push({
                label: item.cardNumber,
                backgroundColor: color,
                borderColor: 'gray',
                data: Object.values(item.merchantPrice),
            });
        });

        setChartData({
            labels: Object.keys(comparedAccounts[0].merchantPrice),
            datasets: myDatasets
        });
    };

    const handleAccChange = (value) => {
        setSelectedAccount(value);
        if (value === "all") {
            initialize(transactions);
        } else if (value === "compareAll") {
            initializeCompare(accounts, transactions);
        } else {
            const newTransactions = [];
            transactions.forEach((transaction) => {
                if (transaction.cardNumber === value) newTransactions.push(transaction);
            });
            initialize(newTransactions);
        }
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
                <Select.Option key="compareAll" value="compareAll">
                    Compare all accounts
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
