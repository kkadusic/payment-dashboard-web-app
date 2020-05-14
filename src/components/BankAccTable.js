import React, { Component } from "react";
import "antd/dist/antd.css";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { getToken } from "../utilities/Common";
import axios from "axios";
import "../css/NotificationRow.css";

class BankAccTable extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
    key: 0,
  };

  componentWillMount() {
    this.getBankAccounts();
  }

  getBankAccounts() {
    axios
      .get("https://payment-server-si.herokuapp.com/api/accounts/all", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((response) => {
        const accounts = [];
        response.data.forEach((account) => {
          accounts.push({
            key: ++this.state.key,
            id: account.id,
            accountOwner: account.accountOwner,
            bankName: account.bankName,
            expiryDate: account.expiryDate.substr(0, 10),
            cardNumber: account.cardNumber,
          });
        });
        this.setState({ data: accounts }, () => {});
      })
      .catch((err) => console.log(err));
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Account owner",
        dataIndex: "accountOwner",
        key: "accountOwner",
        sorter: (a, b) => a.accountOwner.localeCompare(b.accountOwner),
        ...this.getColumnSearchProps("accountOwner"),
      },
      {
        title: "Bank name",
        dataIndex: "bankName",
        key: "bankName",
        sorter: (a, b) => a.bankName.localeCompare(b.bankName),
        ...this.getColumnSearchProps("bankName"),
      },
      {
        title: "Expiry date",
        dataIndex: "expiryDate",
        key: "expiryDate",
        sorter: (a, b) => {
          const day = parseInt(a.expiryDate.substr(0, 2));
          const month = parseInt(a.expiryDate.substr(3, 5)) - 1;
          const year = parseInt(a.expiryDate.substr(6, 10));
          const expiryDate1 = new Date(year, month, day);

          const day2 = parseInt(b.expiryDate.substr(0, 2));
          const month2 = parseInt(b.expiryDate.substr(3, 5)) - 1;
          const year2 = parseInt(b.expiryDate.substr(6, 10));
          const expiryDate2 = new Date(year2, month2, day2);

          return expiryDate1 < expiryDate2;
        },
        ...this.getColumnSearchProps("expiryDate"),
      },
      {
        title: "Card number",
        dataIndex: "cardNumber",
        key: "cardNumber",
        sorter: (a, b) => a.cardNumber - b.cardNumber,
        ...this.getColumnSearchProps("cardNumber"),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        rowClassName={(record, index) => {
          if (
            this.props.location.notification != null &&
            record.id == this.props.location.notification.subjectId
          ) {
            if (
              this.props.location.notification.notificationStatus === "INFO"
            ) {
              return "table-row-notification-info";
            } else if (
              this.props.location.notification.notificationStatus === "WARNING"
            ) {
              return "table-row-notification-warning";
            } else {
              return "table-row-notification-error";
            }
          }
        }}
      />
    );
  }
}

export default BankAccTable;
