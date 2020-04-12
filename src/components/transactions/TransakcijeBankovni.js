import React, {useEffect} from "react";
import axios from "axios";
import {getToken} from "../../utilities/Common";
import Chart from 'chart.js';
import {Button, DatePicker, Result, TimePicker, Tooltip} from "antd";
import moment from "moment";
import "../../css/TransakcijeBankovni.css"
import {message} from "antd";
import PieChartOutlined from "@ant-design/icons/lib/icons/PieChartOutlined";
const { RangePicker } = DatePicker;

function TransakcijeBankovni() {

    const rangePickerFormat = "DD.MM.YYYY HH:mm:ss"

    let interval = {
        startDate: moment().startOf('month').format(rangePickerFormat),
        endDate: moment().endOf('month').format(rangePickerFormat)
    }
    let data = {
        transactions: []
    };

    let ctx = null;
    let pieChart = null;
    const dataChart = {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: '# of Votes',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Expenses per account for Range: From (' + interval.startDate + ') To (' + interval.endDate +')'
            }
        }
    };

    const fetchData = () => {
        return axios.post("https://payment-server-si.herokuapp.com/api/transactions/date", JSON.stringify(interval), {
            headers: {
                Authorization: "Bearer " + getToken(),
                'Content-Type': 'application/json'
            }
        }).then()
            .catch(err => console.log(err))
    };

    const go = () => {
        if (!rangeDiffOk()) return;
        if ((interval.startDate == null || interval.startDate === "")
            || (interval.endDate == null || interval.endDate === "")) {
            message.error("Please choose your wanted times!");
            return;
        }
        fetchData().then(response => {
            if (!(response.status === 200 || response.statusText === 'OK')) {
                console.log(response);
                return [];
            }
            return response.data;
        }).then(loadData);
    };

    const loadData = transactions => {
        data.transactions = transactions;
        console.log(data);
        if (data.transactions.length === 0) return;
        fillChartData();
    };

    const fillChartData = () => {
        let labels = [];
        let map = new Map();
        let totals = [];
        // filling labels
        let index = 0;
        for (let t of data.transactions) {
            if (typeof map.get(t.cardNumber) === "undefined") { // doesn't exist
                map.set(t.cardNumber, index);
                labels.push(t.cardNumber);
                totals.push(t.totalPrice);
                index++;

            } else {
                totals[map.get(t.cardNumber)] += t.totalPrice;
            }
        }
        // filling colors
        let colors = [];
        for(let i = 0; i < map.size; i++) {
            colors.push(genColor());
        }
        dataChart.data.labels = labels;
        dataChart.data.datasets.forEach(set => {
            set.data = totals;
            set.backgroundColor = colors;
            set.borderColor = colors;
        });
        ctx = document.getElementById('pieChart');
        pieChart = new Chart(ctx, dataChart);
    };

    const genColor = () => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return 'rgb(' + r + ',' + g + ',' + b + ', 0.2)';
    };

    const pickTime = () => (
        <div className={"timePicker"}>
            <RangePicker
                className={"picker"}
                ranges={{
                    Today: [moment().startOf('day'), moment().endOf('day')],
                    'This Week': [moment().startOf('week'), moment().endOf('week')],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                defaultValue={[moment().startOf('month'), moment().endOf('month')]}
                showTime format={rangePickerFormat}
                onChange={onChangeTime}/>
            <Button className={"goButton"} type={"primary"} shape={"round"} onClick={go}>Filter</Button>
        </div>
    );

    const rangeDiffOk = () => {
        const duration = moment.duration(moment(interval.endDate).diff(moment(interval.startDate)));
        if (duration.asHours() < 1) {
            message.error("Range difference has to be bigger than 1 hour!")
            return false;
        }
        return true;
    }

    const onChangeTime = (value, stringTime) => {
        interval = {
            startDate: stringTime[0],
            endDate: stringTime[1]
        };
        go();
    }

    useEffect(() => {
        go();
    }, [])

    return (
        <div>
            {pickTime()}
            {
                (data.transactions === null || data.transactions.length === 0) ?
                    <Result icon={<PieChartOutlined />} title={"Filter selected range!"}/>
                    : <canvas id={"pieChart"} style={{margin: "auto"}} width="700" height="700"/>
            }

        </div>
    );
}

export default TransakcijeBankovni;
