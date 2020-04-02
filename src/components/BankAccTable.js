import React, {Component} from "react";
import "antd/dist/antd.css";
import {Table, Input, Button} from "antd";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";

const data = [
    {
        key: "1",
        accountOwner: "John Swift",
        bankName: "Deutsche Bank",
        expiryDate: "12.03.2021",
        cvc: "123",
        cardNumber: "1111111111111112"
    },
    {
        key: "2",
        accountOwner: "John Swift",
        bankName: "American Bank",
        expiryDate: "11.07.2020",
        cvc: "456",
        cardNumber: "1111111111111113"
    },
    {
        key: "3",
        accountOwner: "John Swift",
        bankName: "PNC",
        expiryDate: "22.10.2020",
        cvc: "443",
        cardNumber: "1111111111111155"
    },
    {
        key: "4",
        accountOwner: "John Swift",
        bankName: "Citibank",
        expiryDate: "01.05.2020",
        cvc: "987",
        cardNumber: "1111111111111119"
    },
    {
        key: "5",
        accountOwner: "John Swift",
        bankName: "JPMorgan-Chase",
        expiryDate: "09.01.2020",
        cvc: "385",
        cardNumber: "1111111111111112"
    }
];

class BankAccTable extends Component {
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
            <div style={{padding: 8}}>
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
                    style={{width: 188, marginBottom: 8, display: "block"}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined style={{color: filtered ? "#1890ff" : undefined}}/>
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
                    highlightStyle={{backgroundColor: "#ffc069", padding: 0}}
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
        this.setState({searchText: ""});
    };


    render() {
        const columns = [
            {
                title: "Account owner",
                dataIndex: "accountOwner",
                key: "accountOwner",
                sorter: (a, b) => a.accountOwner.localeCompare(b.accountOwner),
                ...this.getColumnSearchProps("accountOwner")
            },
            {
                title: "Bank name",
                dataIndex: "bankName",
                key: "bankName",
                sorter: (a, b) => a.bankName.localeCompare(b.bankName),
                ...this.getColumnSearchProps("bankName")
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
                ...this.getColumnSearchProps("expiryDate")
            },
            {
                title: "CVC",
                dataIndex: "cvc",
                key: "cvc",
                sorter: (a, b) => a.cvc - b.cvc,
                ...this.getColumnSearchProps("cvc")
            },
            {
                title: "Card number",
                dataIndex: "cardNumber",
                key: "cardNumber",
                sorter: (a, b) => a.cardNumber - b.cardNumber,
                ...this.getColumnSearchProps("cardNumber")
            }
        ];

        return <Table columns={columns} dataSource={data}/>;
    }
}

export default BankAccTable;
