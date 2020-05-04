import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../utilities/Common";
import { Table, Tag, Select, message } from "antd";
import "antd/dist/antd.css";
import "../css/Transferi.css";

function Transferi(props) {
  const [transfers, setTransfers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transfer, setTransfer] = useState();
  const [defaultAccount, setDefaultAccount] = useState({});

  const getTransfers = (id) => {
    axios
      .get(
        "https://payment-server-si.herokuapp.com/api/accounts/moneyTransfer/allSends/" +
          id,
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        setTransfers(response.data.transfers);
      })
      .catch((error) => console.log(error));
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

  const getAccountId = (cardNumber, accounts) => {
    console.log(cardNumber);
    console.log(accounts);
    accounts.forEach((account) => {
      if (account.cardNumber === cardNumber) {
        console.log(account.id);
        getTransfers(account.id);
        return account.id;
      }
    });
  };

  const transferDetails = async (id) => {
    let response = await axios.get(
      "https://payment-server-si.herokuapp.com/api/accounts/moneyTransfer/" +
        id,
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    );
    success(response.data.transfers[0]);
  };

  const success = (transfer) => {
    message.success(
      "Please select bank account with card number: " +
        transfer.sourceCardNumber
    );
  };

  useEffect(() => {
    getBankAccounts();
    if (props.location.hasOwnProperty("notification"))
      transferDetails(props.location.notification.subjectId);
  }, []);

  const columns = [
    {
      title: "Transfer ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Money transfered to",
      dataIndex: "destCardNumber",
      key: "destCardNumber",
    },
    {
      title: "Date",
      dataIndex: "transferDateAndTime",
      key: "transferDateAndTime",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Tag id="tagIznosa" color="red">
          {amount} KM
        </Tag>
      ),
    },
  ];

  const handleAccChange = (value) => {
    console.log("promjena");
    getTransfers(value.key);
  };

  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <p style={{ float: "left", marginRight: "10px", color: "#030852" }}>
          Money is transfered from account:{" "}
        </p>
        <Select
          labelInValue
          placeholder="Select bank account"
          style={{ width: 200 }}
          onChange={handleAccChange}
        >
          {accounts.map((title) => (
            <Select.Option key={title.id} value={title.id}>
              {title.cardNumber}
            </Select.Option>
          ))}
        </Select>
      </div>
      <br></br>
      <br></br>
      <Table
        dataSource={transfers}
        columns={columns}
        rowKey="id"
        rowClassName={(record, index) => {
          if (props.location.hasOwnProperty("notification")) {
            const notification = props.location.notification;
            if (notification != null && record.id === notification.subjectId) {
              if (notification.notificationStatus === "INFO") return "tr-info";
              else if (notification.notificationStatus === "WARNING")
                return "tr-warning";
              else return "tr-error";
            }
          }
        }}
      />
    </div>
  );
}

export default Transferi;
