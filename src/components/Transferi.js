import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken, getNotification, getTransfer } from "../utilities/Common";
import { Table, Tag, Select } from "antd";
import "antd/dist/antd.css";
import "../css/Transferi.css";

function Transferi() {
  const [transfers, setTransfers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [defaultAccount, setDefaultAccount] = useState(
    getTransfer().sourceCardNumber
  );
  // const [selectedRowKeys, setSelectedRowKeys] = useState([
  //   getNotification().subjectId,
  // ]);

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

  useEffect(() => {
    console.log(getTransfer().sourceCardNumber);
    getBankAccounts();
    // setDefaultAccount(getTransfer().sourceCardNumber);
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
      key: "age",
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
    getTransfers(value.key);
  };

  return (
    <div>
      <Select
        labelInValue
        placeholder="Select bank account"
        style={{ width: 200 }}
        onChange={handleAccChange}
        defaultValue={defaultAccount}
      >
        {accounts.map((title) => (
          <Select.Option key={title.id} value={title.id}>
            {title.cardNumber}
          </Select.Option>
        ))}
      </Select>
      <br></br>
      <br></br>
      <Table
        dataSource={transfers}
        columns={columns}
        rowKey="id"
        rowClassName={(record, index) => {
          const notification = getNotification();
          if (notification != null && record.key === notification.subjectId) {
            if (notification.notificationStatus === "INFO") return "tr-info";
            else if (notification.notificationStatus === "WARNING")
              return "tr-warning";
            else return "tr-error";
          }
        }}
      />
    </div>
  );
}

export default Transferi;
