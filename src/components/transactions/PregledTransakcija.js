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
  Row,
  Col,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, FilterFilled } from "@ant-design/icons";
import { getToken } from "../../utilities/Common";
import axios from "axios";
import moment from "moment";
import uuid from "react-uuid";
import "../../css/Transactions.css";

import numeral from "numeral";
import Slider from "antd/lib/slider";

const { Text } = Typography;
const { RangePicker } = DatePicker;

class PregledTransakcija extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
    key: 0,
    expandedKeys: [],
    maxPrice: 0,
    minPrice: 0,
    total: 0,
  };

  load = (response) => {
    const transactions = [];
    let suma = 0;
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
      suma += transaction.totalPrice;
    });
    this.setState({ data: transactions, total: suma }, () => {
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
      .then((response) => {
        this.load(response);
        // za potrebe slidera: slider ide od najmanje do najvece cijene u transakcijama
        let maxP = 0;
        for (let i = 0; i < this.state.data.length; i++) {
          if (parseFloat(this.state.data[i].totalPrice) > maxP) {
            maxP = parseFloat(this.state.data[i].totalPrice);
          }
        }
        this.setState({ maxPrice: maxP }, () => {
          console.log(this.state.maxPrice);
        });

        let minP = this.state.data[0].totalPrice;
        for (let i = 0; i < this.state.data.length; i++) {
          if (parseFloat(this.state.data[i].totalPrice) < minP) {
            minP = parseFloat(this.state.data[i].totalPrice);
          }
        }
        this.setState({ minPrice: minP }, () => {
          console.log(this.state.minPrice);
        });
      })
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
        {dataIndex === "service" ? <p>Filter by product</p> : null}
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
            /*dataIndex !== "service"
              ? this.handleReset(clearFilters)
              : this.getTransactions();*/
            if (dataIndex === "service") this.getTransactions();
            this.handleReset(clearFilters);
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

  // price filtering function

  getTransactionsByPriceRange = (selectedKeys) => {
    console.log(selectedKeys);

    let data = {
      minPrice: parseFloat(selectedKeys[0]),
      maxPrice: parseFloat(selectedKeys[1]),
    };
    console.log(data);
    axios
      .post(
        "https://payment-server-si.herokuapp.com/api/transactions/price",
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

  // price slider filtering
  getPriceSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        className="price-filter"
        style={{ minWidth: "20rem", padding: "0.5rem 1rem" }}
      >
        <Row>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <strong>Min:</strong>
              </div>
              <div>
                {numeral(this.state.minPrice).format("0.0a")} <br></br> {"KM"}{" "}
              </div>
            </div>
          </Col>
          <Col span={16}>
            <Slider
              id="slider"
              name="slider"
              range
              min={parseFloat(this.state.minPrice)}
              max={parseFloat(this.state.maxPrice)}
              tipFormatter={(value) => {
                return numeral(value).format("0.0a");
              }}
              step="0.1"
              onChange={(e) => {
                console.log(e);
                setSelectedKeys([parseFloat(e[0]), parseFloat(e[1])]);
              }}
            />
          </Col>
          <Col span={4}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <strong>Max:</strong>
              </div>
              <div>
                {numeral(this.state.maxPrice).format("0.0a")} <br></br> {"KM"}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Button
            type="primary"
            onClick={() => {
              this.getTransactionsByPriceRange(selectedKeys);
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            OK
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
        </Row>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />
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

  handleSearchPrice = (selectedKeys, confirm, dataIndex) => {
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
        title: "Transaction ID",
        dataIndex: "key",
        key: "key",
        width: "18%",
      },
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
        width: "18%",
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
        ...this.getPriceSearchProps("totalPrice"),
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
        onChange={(pagination, filter, sorter, currentTable) => {
          let suma = 0;
          console.log(currentTable.currentDataSource);
          currentTable.currentDataSource.forEach((red) => {
            suma += red.totalPrice;
          });
          this.setState({ ...this.state, total: suma });
        }}
        summary={(pageData) => {
          let pageSum = 0;
          pageData.forEach((row) => {
            pageSum += row.totalPrice;
          });
          return (
            <>
              <tr>
                <td></td>
                <th>Total</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="totalSum">
                  {<Text strong>{pageSum.toFixed(3)} KM</Text>}
                </td>
              </tr>

              <tr>
                <td></td>
                <th>Grand total</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td id="totalSum">
                  {<Text strong>{this.state.total.toFixed(3)} KM</Text>}
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
