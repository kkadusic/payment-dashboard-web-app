import React, {useEffect, useState} from "react";
import axios from "axios";
import {getToken} from "../../utilities/Common";
import Chart from 'chart.js';
import {DatePicker, TimePicker, Tooltip} from "antd";
import moment from "moment";
import "../../css/TransakcijeBankovni.css"

function TransakcijeBankovni() {

    const [state, setState] = useState({
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        interval: {
            startDate: null,
            endDate: null
        }
    });

    const timeFormat = 'HH:mm';
    const dateFormat = "DD.MM.YYYY";

    let ctx = null;
    let startDatePicker = null;
    let endDatePicker = null;
    let dataChart = {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

    const fetchData = () => {
        return axios.post("https://payment-server-si.herokuapp.com/api/transactions/date", state.interval, {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }).catch(err => console.log(err))
    };

    useEffect(() => {
        ctx = document.getElementById('pieChart');
        startDatePicker = document.getElementById('startDate');
        endDatePicker = document.getElementById('endDate');
        let dates = getDefaultDates();

        startDatePicker.setAttribute("defaultValue", dates.startDate);
        endDatePicker.setAttribute("defaultValue", dates.endDate);
        setState({
            interval: {
                startDate: state.startDate + " " + state.startTime,
                endDate: state.endDate + " " + state.endTime
            }
        })
        fetchData().then(data => {
            console.log(data);
        });

    }, [])

    const loadDate = data => {

    };

    const startDate = (date, dateString) => {
        console.log("Chose: " + dateString + " as starting date!")
        setState({
            startDate: dateString
        });
    };

    const startTime = (time, timeString) => {
        console.log("Chose: " + timeString + " as starting time!")
        setState({
            startTime: timeString
        });
    };

    const endDate = (date, dateString) => {
        console.log("Chose: " + dateString + " as ending date!")
        setState({
            endDate: dateString
        });
    };

    const endTime = (time, timeString) => {
        console.log("Chose: " + timeString + " as ending time!")
        setState({
            endTime: timeString
        });
    };


    const getDefaultDates = () => {
        let end = new Date();
        let endDay = end.getDate();
        if (endDay < 10) endDay = "0" + endDay;
        let endMonth = end.getMonth() + 1;
        if (endMonth < 10) endMonth = "0" + endMonth;


        let start = end; // setting week before
        start.setDate(endDay - 7);
        let startDay = start.getDate();
        if (startDay < 10) startDay = "0" + startDay;
        let startMonth = start.getMonth() + 1;
        if (startMonth < 10) startMonth = "0" + startMonth;

        return {
            startDate: startDay + "." + startMonth + "." + start.getFullYear(),
            endDate: endDay + "." + endMonth + "." + end.getFullYear()
        }

    }

    return (
        <div>
            <div className={"timePicker"}>From
                <Tooltip title={"Pick starting date"}>
                    <DatePicker id={"startDate"} onChange={startDate} className={"picker"} format={dateFormat}/>
                </Tooltip>
                <Tooltip title={"Pick starting time"}>
                    <TimePicker className={"picker"} style={{display: "inline-block"}} onChange={startTime} format={timeFormat}/>
                </Tooltip>
            </div>
            <div className={"timePicker"}>To
                <Tooltip title={"Pick ending date"}>
                    <DatePicker id={"endDate"} onChange={endDate} className={"picker"} defaultValue={moment(Date.now(), dateFormat)} format={dateFormat}/>
                </Tooltip>
                <Tooltip title={"Pick ending time"}>
                    <TimePicker className={"picker"} style={{display: "inline-block"}} onChange={endTime} defaultValue={moment('23:59', timeFormat)} format={timeFormat}/>
                </Tooltip>
            </div>

            <canvas id={"pieChart"} width={'600px'} height={'600px'}></canvas>
        </div>
    );
}

export default TransakcijeBankovni;
