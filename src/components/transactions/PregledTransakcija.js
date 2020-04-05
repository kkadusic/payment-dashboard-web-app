import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    cardNumber: "1111111111111112",
    merchant: "Bingo",
    date: "01/04/2020",
    price: 40
  },
  {
    key: "2",
    cardNumber: "1111111111111112",
    merchant: "Bingo",
    date: "01/03/2020",
    price: 40
  },
  {
    key: "3",
    cardNumber: "1111111111111112",
    merchant: "Bingo",
    date: "29/02/2020",
    price: 40
  },
  {
    key: "4",
    cardNumber: "1111111111111112",
    merchant: "Bingo",
    date: "15/02/2020",
    price: 540
  },
  {
    key: "5",
    cardNumber: "1111111111111117",
    merchant: "Bingo",
    date: "02/04/2020",
    price: 1230
  },
  {
    key: "6",
    cardNumber: "1111111111111112",
    merchant: "Mercator",
    date: "31/03/2020",
    price: 1730
  },
  {
    key: "7",
    cardNumber: "1111111111111115",
    merchant: "Cue",
    date: "31/03/2019",
    price: 1730
  },
  {
    key: "8",
    cardNumber: "1111111111111112",
    merchant: "Yamm",
    date: "26/11/2019",
    price: 20
  }
];

class PregledTransakcija extends Component {
  state = {
    searchText: "",
    searchedColumn: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
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
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Card number",
        dataIndex: "cardNumber",
        key: "cardNumber",
        width: "30%",
        sorter: (a, b) => a.cardNumber - b.cardNumber,
        ...this.getColumnSearchProps("cardNumber")
      },
      {
        title: "Merchant",
        dataIndex: "merchant",
        key: "merchant",
        width: "20%",
        sorter: (a, b) => { return a.merchant.localeCompare(b.merchant)},
        ...this.getColumnSearchProps("merchant")
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        filters: [
          {
            text: "24 hours",
            value: "24h"
          },
          {
            text: "Last month",
            value: "month"
          },
          {
            text: "Last year",
            value: "year"
          }
        ],
        onFilter: (value, record) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const yesterday = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 1
          );
          const monthAgo = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate()
          );
          const yearAgo = new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate()
          );

          const day = parseInt(record.date.substr(0, 2));
          const month = parseInt(record.date.substr(3, 5)) - 1;
          const year = parseInt(record.date.substr(6, 10));
          const date = new Date(year, month, day);

          if (value === "24h") {
            console.log(today + " " + date);
            return (
              date.getTime() === today.getTime() ||
              date.getTime() === yesterday.getTime()
            );
          } else if (value == "month") return monthAgo <= date && date <= today;
          return yearAgo <= date && date <= today;
        }
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        // Filters into categories of prices: low, lower medium, medium, upper medium, high
        filters: [
          {
            text: "Low (0-5 BAM)",
            value: "low"
          },
          {
            text: "Lower medium (5-20 BAM)",
            value: "lowMedium"
          },
          {
            text: "Medium (20-50 BAM)",
            value: "medium"
          },
          {
            text: "Upper medium (50-100 BAM)",
            value: "upMedium"
          },
          {
            text: "High (100+ BAM)",
            value: "high"
          }
        ],
        onFilter: (value, record) => {
          const price = record.price;
          const lowStart = 0, lowMediumStart = 5, mediumStart = 20, upMediumStart = 50, highStart = 100;
          switch(value) {
            case "low" :
              return (price >= lowStart && price < lowMediumStart);
            case "lowMedium":
              return (price >=lowMediumStart && price < mediumStart);
            case "medium":
              return (price >= mediumStart && price < upMediumStart);
            case "upMedium":
              return (price >= upMediumStart && price < highStart);
            case "high":
              return (price >= highStart);
            default:
              return true;
          }
        },
        sorter: (a, b) => a.price - b.price,
        ...this.getColumnSearchProps("price")
      }
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default PregledTransakcija;
