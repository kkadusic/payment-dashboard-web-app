import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { getToken } from "../../utilities/Common";
import { DatePicker, Select } from "antd";

function TransakcijeMjesec() {
	const [accounts, setAccounts] = useState([]);
	const [merchants, setMerchants] = useState([]);
	const [transactions, setTransactions] = useState([]);

	const [currentMerchant, setCurrentMerchant] = useState("all");
	const [currentYear, setCurrentYear] = useState("");
	const [currentAccount, setCurrentAccount] = useState("all");

	const [chartData, setChartData] = useState({});
	
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];	
	const monthlyCosts= []

	useEffect(() => {
		// setChartData({ labels: months })
		let year = new Date().getFullYear()
		setCurrentYear(year)

		getBankAccounts()
		getMerchants()
		getAllTransactionsFor(year, currentMerchant, currentAccount)
	}, []);
	
	const getAllTransactionsFor = (year, merchant, account) => {
		
		let startDateString = "01.01." + year + " 00:00:00"
		let endDateString = "31.12."+ year + " 23:59:59"
	  
		let data = {
			startDate: startDateString,
			endDate: endDateString
		};

		axios
			.post(
				"https://payment-server-si.herokuapp.com/api/transactions/date",
				data,
				{
					headers: {
					Authorization: "Bearer " + getToken(),
					},
				}
			)
			.then((response) => {
				var data = response.data
				
				if(account != "all") {
					data = data.filter(transaction => transaction.cardNumber == account)
				}

				if(merchant != "all") {
					data = data.filter(transaction => transaction.merchantName == merchant)
				}
				console.log("data: ",data)
				updateChartData(data);
				setTransactions(data);
				}
			)
			.catch((err) => {
			console.log(err);
			}
		);
	}

	const getBankAccounts = async () => {
		let response = await axios.get(
		  	"https://payment-server-si.herokuapp.com/api/accounts/all",
		  	{
				headers: { Authorization: "Bearer " + getToken() },
		  	}
		);
		setAccounts([...response.data]);
	};

	const getMerchants = async () => {
		let response = await axios.get(
		  "https://payment-server-si.herokuapp.com/api/merchants/all",
		  {
			headers: { Authorization: "Bearer " + getToken() },
		  }
		);
		setMerchants([...response.data]);
	};

	const handleYearChanged = value => {
		let year = value == undefined ? new Date().getFullYear() : value._d.getFullYear()
		setCurrentYear(year)
		getAllTransactionsFor(year, currentMerchant, currentAccount)
	}

	const handleAccChange = (value) => {
		setCurrentAccount(value)
		getAllTransactionsFor(currentYear, currentMerchant, value)
	}

	const handleMerchantChange = (value) => {
		setCurrentMerchant(value)
		getAllTransactionsFor(currentYear, value, currentAccount)
	
	}

	const updateChartData = (data) => {

		months.forEach((month) => {
			monthlyCosts[month] = 0
		})

		data.forEach((transaction) => {
			let month = months[parseInt(transaction.date.substr(5,2))-1]
			if (monthlyCosts.hasOwnProperty(month)) {
				monthlyCosts[month] += transaction.totalPrice
			} else {
				monthlyCosts[month] = transaction.totalPrice
			}
		})

		setChartData({
			labels: months,
			datasets: [
			  {
				label: "Money spent",
				data: Object.values(monthlyCosts),
				backgroundColor: "#597ef7",
			  },
			],
		});
	}
	
  return (
    <div>
      <h1>
        Za svakog merchanta, prikaz troškova u godini koju korisnik odabere, koristeći bar chart (za određeni ili
        za sve bankovne račune)
      </h1>
	  <DatePicker onChange={handleYearChanged} picker="year"/>
      <Select
        placeholder="Select Account"
        style={{ width: 200 }}
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
	  <Select
        placeholder="Select Merchant"
        style={{ width: 200 }}
        onChange={handleMerchantChange}
        defaultValue="all"
      >
        {merchants.map((title) => (
          <Select.Option key={title.merchantID} value={title.merchantName}>
            {title.merchantName}
          </Select.Option>
        ))}
        <Select.Option key="all" value="all">
          All Merchants
        </Select.Option>
      </Select>
	  <Bar
        data={chartData}
        width={100}
		height={50}
	
        options={
		  ({ maintainAspectRatio: true },
			
          {
            title: {
              display: true,
              text: "Spendings in a year",
            },
          })
        }
      />
    </div>
  );
}

export default TransakcijeMjesec;
