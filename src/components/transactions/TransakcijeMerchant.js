import React, { useState, useEffect } from "react";
import { Divider, DatePicker, Select, Modal, Empty, Button } from "antd";
import moment from "moment";
import { Bar, Line, Pie, Doughnut, Polar, Scatter } from "react-chartjs-2";
import axios from "axios";
import { getToken } from "../../utilities/Common";
//import "chart.piecelabel.js";
import "chartjs-plugin-piechart-outlabels";
//import "chartjs-plugin-labels";
import "../../css/TransakcijeMerchant.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

function TransakcijeMerchant() {
  const [chartData, setChartData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  //const accounts = [];
  //const [merchants, setMerchants] = useState([]);
  const [selectedAcc, setSelectedAcc] = useState("all");
  const [chosenDate, setChosenDate] = useState({});
  const [visible, setVisible] = useState(false);

  const merchants = [];
  const prices = [];
  const colors = [];
  var merchantPrice = [];

  useEffect(() => {
    getTransactions();
    getBankAccounts();
  }, []);

  const getTransactions = () => {
    axios
      .get("https://payment-server-si.herokuapp.com/api/transactions/all", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((response) => {
        setTransactions(response.data);
        initialize(response.data);
      })
      .catch((err) => console.log(err));
  };

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
    // setMerchants([...response.data]);
    console.log(merchants);
  };

  const getTransactionsByDate = (startDate, endDate) => {
    let data = {
      startDate: startDate,
      endDate: endDate,
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
        console.log(response.data);
        setTransactions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleAccChange(selectedAcc);
  }, [transactions]);

  const isEmpty = (object) => {
    return JSON.stringify(object) === "{}";
  };

  const generateColor = () => {
    return "#" + Math.random().toString(16).substr(-6);
  };

  const initialize = (dbData) => {
    dbData.forEach((transaction) => {
      merchants.push(transaction.merchantName);
      prices.push(transaction.totalPrice);
    });
    var merchantPriceUnsorted = [];
    dbData.forEach((transaction) => {
      if (merchantPriceUnsorted.hasOwnProperty(transaction.merchantName)) {
        merchantPriceUnsorted[transaction.merchantName] +=
          transaction.totalPrice;
      } else
        merchantPriceUnsorted[transaction.merchantName] =
          transaction.totalPrice;
      colors.push(generateColor());
    });
    merchantPrice = sortArray(merchantPriceUnsorted);

    if (merchantPrice.length === 0) {
      setVisible(true);
    }

    setChartData({
      labels: Object.keys(merchantPrice),
      datasets: [
        {
          label: "Spendings by merchant",
          data: Object.values(merchantPrice),
          backgroundColor: colors,
        },
      ],
    });
    console.log(merchantPrice);
  };

  const sortArray = (array) => {
    var keys = Object.keys(array).sort((a, b) => array[b] - array[a]);
    var sortedArray = [];
    keys.forEach((key) => {
      sortedArray[key] = array[key];
    });
    return sortedArray;
  };

  const handleAccChange = (value) => {
    setSelectedAcc(value);
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

  const makeDoubleDigit = (value) => {
    return ("0" + value).slice(-2);
  };

  const formatDate = (fullDate) => {
    return (
      makeDoubleDigit(fullDate.getDate()) +
      "." +
      makeDoubleDigit(fullDate.getMonth() + 1) +
      "." +
      fullDate.getFullYear() +
      " " +
      makeDoubleDigit(fullDate.getHours()) +
      ":" +
      makeDoubleDigit(fullDate.getMinutes()) +
      ":" +
      makeDoubleDigit(fullDate.getSeconds())
    );
  };

  const onDateOk = (value) => {
    console.log(value);
    if (value !== undefined)
      setChosenDate(
        {
          startDate: formatDate(value[0]._d),
          endDate: formatDate(value[1]._d),
        },
        getTransactionsByDate(formatDate(value[0]._d), formatDate(value[1]._d))
      );
  };

  const handleClearDate = (value) => {
    if (value === null) getTransactions();
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    title: {
      display: true,
      text: "Spendings by merchant",
      position: "left",
    },
    layout: {
      padding: 60,
    },
    legend: {
      display: false,
    },
    plugins: {
      outlabels: {
        text: "%l (%p)",
        textAlign: "center",
        stretch: 20,
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return (
            data["labels"][tooltipItem["index"]] +
            ": " +
            data["datasets"][0]["data"][tooltipItem["index"]] +
            " KM"
          );
        },
      },
    },
  };

  const info = () => {
    Modal.info({
      title:
        "You haven't made any transaction with selected bank account or within chosen dates!",
      content: <Empty />,
      onOk() {},
    });
  };

  return (
    <div>
      <h1>
        Prikaz dijagrama za iznos troškova po merchantima u odnosu na vremenski
        interval kojeg korisnik odabere (za određeni ili za sve bankovne račune)
        koristeći pie chart za vremenski period izabran na date (range) pickeru{" "}
      </h1>
      <RangePicker
        allowClear={true}
        showTime={{
          defaultValue: [
            moment("00:00:00", "HH:mm:ss"),
            moment("23:59:59", "HH:mm:ss"),
          ],
        }}
        format="DD.MM.YYYY HH:mm:ss"
        onOk={onDateOk}
        onChange={handleClearDate}
      />
      <Select
        placeholder="Select bank account"
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
      <Divider />
      <Pie data={chartData} width={100} height={50} options={options} />
      <Modal
        visible={visible}
        title="Title"
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close window
          </Button>,
        ]}
      >
        <Empty></Empty>
      </Modal>
    </div>
  );
}

export default TransakcijeMerchant;
