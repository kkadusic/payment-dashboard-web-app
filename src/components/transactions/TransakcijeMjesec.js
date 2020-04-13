import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { getToken } from "../../utilities/Common";
import { DatePicker, Select, Divider } from "antd";

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

	const colors = []
	var customColors = ["#95de64", "#d3f261", "#fff566", "#ffd666", "#ffc069", "#ff9c6e", "#ff7875"];

	const setColorValues = () => {

		var sortedMonthlyValues = Object.keys(monthlyCosts).sort((a, b) => monthlyCosts[a] - monthlyCosts[b]);
		
		var customColorIndex = 0;
	
		sortedMonthlyValues.forEach((month) => {
			if(monthlyCosts[month] != 0) { 
				colors[month] = customColors[customColorIndex]
				if(customColorIndex != 6) {
					customColorIndex++;
				}
			 }	
		})
	  };

	const updateChartData = (data) => {

		months.forEach((month) => {
			monthlyCosts[month] = 0
			colors[month] = "#d3f261"
		})

		data.forEach((transaction) => {
			let month = months[parseInt(transaction.date.substr(5,2))-1]
			monthlyCosts[month] += transaction.totalPrice	
		})

		setColorValues()
		setChartData({
			labels: months,
			datasets: [
			  {
				// label: "Money spent",
				data: Object.values(monthlyCosts),
				backgroundColor: Object.values(colors),
			  },
			],
		});
	}
	
  return (
    <div>
      <h1>
		Check your monthly expenses for chosen or all merchants
      </h1>

	  <Select
        placeholder="Select Merchant"
        style={{ width: 200 }}
        onChange={handleMerchantChange}
        defaultValue="all"
      >
        {merchants.map((title) => (
          <Select.Option key={title.merchantId} value={title.merchantName}>
            {title.merchantName}
          </Select.Option>
        ))}
        <Select.Option key="all" value="all">
          All Merchants
        </Select.Option>
      </Select>

      <Select
        placeholder="Select Account"
        style={{ width: 200, marginLeft:"30px"}}
        onChange={handleAccChange}
		defaultValue="all"
      >
        {accounts.map((title) => (
          <Select.Option key={"account"+title.id} value={title.cardNumber}>
            {title.cardNumber}
          </Select.Option>
        ))}
        <Select.Option key="all" value="all">
          All accounts
        </Select.Option>
      </Select>

	  <DatePicker onChange={handleYearChanged} picker="year" style={{float: "right" }}/>

	  <Divider></Divider>
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
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					display: true,
					ticks: {
						suggestedMin: 0,
						suggestedMax: 100
					}
				}]		
			}
          })
        }
      />
    </div>
  );
}

export default TransakcijeMjesec;
