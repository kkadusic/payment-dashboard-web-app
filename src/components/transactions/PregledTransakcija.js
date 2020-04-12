import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Table,
  Input,
  Button,
  Tag,
  Typography,
  DatePicker,
  Space,
  Divider,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { getToken } from "../../utilities/Common";
import axios from "axios";
import moment from "moment";
import "../../css/Transactions.css";

const { Text } = Typography;
const { RangePicker } = DatePicker;

class PregledTransakcija extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
    key: 0,
    expandedKeys: [],
  };

  load = (response) => {
    const transactions = [];
    response.data.forEach((transaction) => {
      transactions.push({
        key: transaction.transactionId,
        cardNumber: transaction.cardNumber,
        merchantName: transaction.merchantName,
        totalPrice: transaction.totalPrice,
        date:
          transaction.date.substr(0, 10) + " " + transaction.date.substr(11, 8),
        service: transaction.service,
      });
    });
    this.setState({ data: transactions }, () => {
      console.log(this.state.data);
    });
  };

  componentWillMount() {
    this.getTransactions();
  }

  getTransactions() {
    axios
      .get("https://payment-server-si.herokuapp.com/api/transactions/all", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then(this.load)
      .catch((err) => console.log(err));
  }

  formatDate = (date) => {
    return (
      ("0" + date.getDate()).slice(-2) +
      "." +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "." +
      date.getFullYear() +
      " " +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };

  getTransactionsByDate = (selectedKeys) => {
    console.log(selectedKeys);

    let data = {
      startDate: this.formatDate(selectedKeys[0]),
      endDate: this.formatDate(selectedKeys[1]),
    };
    console.log(data);
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
      .then(this.load)
      .catch((err) => {
        console.log(err);
      });
  };

  getTransactionsByService = (selectedKeys) => {
    axios
      .get(
        "https://payment-server-si.herokuapp.com/api/transactions/service/" +
          selectedKeys,
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then(this.load)
      .catch((err) => console.log(err));
  };

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
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => {
            dataIndex !== "service"
              ? this.handleSearch(selectedKeys, confirm, dataIndex)
              : this.getTransactionsByService(selectedKeys);
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            dataIndex !== "service"
              ? this.handleReset(clearFilters)
              : this.getTransactions();
          }}
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

  getDateSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8, textAlign: "center" }}>
        <Space direction="vertical">
          <RangePicker
            showTime={{
              defaultValue: [
                moment("00:00:00", "HH:mm:ss"),
                moment("23:59:59", "HH:mm:ss"),
              ],
            }}
            format="YYYY-MM-DD HH:mm:ss"
            allowClear={false}
            id="date"
            name="date"
            onChange={(e) => {
              setSelectedKeys([e[0]._d, e[1]._d]);
            }}
          ></RangePicker>

          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                this.getTransactionsByDate(selectedKeys);
                confirm();
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                this.getTransactions();
                clearFilters();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    render: (text) => text,
  });

  handleDateSearch = (selectedKeys, confirm, dataIndex) => {
    console.log(selectedKeys);
    confirm();
    this.setState({
      searchText: [selectedKeys[0], selectedKeys[1]],

      searchedColumn: dataIndex,
    });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({
      searchText: "",
    });
  };

  onTableRowExpand(expanded, record) {
    var keys = [];
    if (expanded) {
      keys.push(record.key);
    }

    this.setState({ expandedKeys: keys });
  }

  expandedRowRender = (rowData) => {
    const service = rowData.service;
    const columns = [
      { title: "Item", dataIndex: "item", key: "item" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const items = service.split(",");
    const collapsedData = [];

    for (let i = 0; i < items.length; ++i) {
      let itemData = items[i].split("(");
      collapsedData.push({
        key: i,
        item: itemData[0],
        quantity: itemData[1].substr(0, itemData[1].length - 1),
      });
    }
    return (
      <Table columns={columns} dataSource={collapsedData} pagination={false} />
    );
  };

  render() {
    let things = {};
    things.thing = [];

    for (let i = 0; i < this.state.data.length; i++) {
      things.thing.push({
        text: this.state.data[i].cardNumber,
        value: this.state.data[i].cardNumber,
      });
    }

    // Remove duplicate card numbers
    things.thing = things.thing.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.text === thing.text && t.value === thing.value)
    );

    const columns = [
      {
        title: "Card number",
        dataIndex: "cardNumber",
        key: "cardNumber",
        width: "20%",
        sorter: (a, b) => a.cardNumber - b.cardNumber,
        defaultSortOrder: "ascend",
        filters: things.thing,
        onFilter: (value, record) => record.cardNumber.indexOf(value) === 0,
      },
      {
        title: "Merchant",
        dataIndex: "merchantName",
        key: "merchantName",
        width: "15%",
        sorter: (a, b) => {
          return a.merchantName.localeCompare(b.merchantName);
        },
        ...this.getColumnSearchProps("merchantName"),
      },
      {
        title: "Service",
        dataIndex: "service",
        key: "service",
        ellipsis: true,
        ...this.getColumnSearchProps("service"),
      },
      {
        title: "Date and time",
        dataIndex: "date",
        key: "date",
        sorter: (a, b) => {
          return a.date.localeCompare(b.date);
        },
        ...this.getDateSearchProps("date"),
      },
      {
        title: "Value",
        dataIndex: "totalPrice",
        key: "totalPrice",
        sorter: (a, b) => a.totalPrice - b.totalPrice,
        render: (price) => (
          <Tag id="tagIznosa" color="red">
            {price} KM
          </Tag>
        ),
        // Filters into categories of prices: low, lower medium, medium, upper medium, high
        filters: [
          {
            text: "Low (0-5 BAM)",
            value: "low",
          },
          {
            text: "Lower medium (5-20 BAM)",
            value: "lowMedium",
          },
          {
            text: "Medium (20-50 BAM)",
            value: "medium",
          },
          {
            text: "Upper medium (50-100 BAM)",
            value: "upMedium",
          },
          {
            text: "High (100+ BAM)",
            value: "high",
          },
        ],
        onFilter: (value, record) => {
          const price = record.totalPrice;
          const lowStart = 0,
            lowMediumStart = 5,
            mediumStart = 20,
            upMediumStart = 50,
            highStart = 100;
          switch (value) {
            case "low":
              return price >= lowStart && price < lowMediumStart;
            case "lowMedium":
              return price >= lowMediumStart && price < mediumStart;
            case "medium":
              return price >= mediumStart && price < upMediumStart;
            case "upMedium":
              return price >= upMediumStart && price < highStart;
            case "high":
              return price >= highStart;
            default:
              return true;
          }
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={this.state.data}
        onExpand={(expanded, render) => this.onTableRowExpand(expanded, render)}
        expandable={{
          expandedRowRender: (record) => this.expandedRowRender(record),
        }}
        expandedRowKeys={this.state.expandedKeys}
        summary={(pageData) => {
          let total = 0;
          pageData.forEach(({ totalPrice }) => {
            total += totalPrice;
          });
          return (
            <>
              <tr>
                <td></td>
                <th>Total</th>
                <td></td>
                <td></td>
                <td></td>
                <td id="totalSum">
                  <Text strong>{total.toFixed(3)} KM</Text>
                </td>
              </tr>
            </>
          );
        }}
      />
    );
  }
}

export default PregledTransakcija;
