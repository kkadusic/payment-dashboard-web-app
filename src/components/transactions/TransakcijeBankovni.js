import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../utilities/Common";
import Chart from "chart.js";
import { Button, DatePicker, Divider } from "antd";
import moment from "moment";
import "../../css/TransakcijeBankovni.css";
import { message } from "antd";

const { RangePicker } = DatePicker;

function TransakcijeBankovni() {
  const backgroundColorStrength = "0.5";
  const borderColorStrength = "1";

  const rangePickerFormat = "DD.MM.YYYY HH:mm:ss";

  let interval = {
    startDate: moment().startOf("month").format(rangePickerFormat),
    endDate: moment().endOf("month").format(rangePickerFormat),
  };
  let data = {
    transactions: [],
  };

  let ctx = null;
  let pieChart = null;
  const dataChart = {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          label: "# of Votes",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false, //this will remove only the label
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Spendings by bank account",
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return (
              data["labels"][tooltipItem["index"]] +
              "\n Spent: " +
              data["datasets"][0]["data"][tooltipItem["index"]] +
              " KM"
            );
          },
        },
      },
      plugins: {
        outlabels: {
          display: false,
        },
      },
    },
  };

  const fetchAllData = () => {
    return axios
      .get("https://payment-server-si.herokuapp.com/api/transactions/all", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .catch((err) => console.log(err));
  };

  const fetchDataForTimeRange = () => {
    return axios
      .post(
        "https://payment-server-si.herokuapp.com/api/transactions/date",
        JSON.stringify(interval),
        {
          headers: {
            Authorization: "Bearer " + getToken(),
            "Content-Type": "application/json",
          },
        }
      )
      .then()
      .catch((err) => console.log(err));
  };

  const go = () => {
    if (
      (interval.startDate == null || interval.startDate === "") && //If range picker is empty
      (interval.endDate == null || interval.endDate === "")
    ) {
      fetchAllData()
        .then((response) => {
          if (!(response.status === 200 || response.statusText === "OK")) {
            console.log(response);
            return [];
          }
          return response.data;
        })
        .then(loadData);
    } else if (
      interval.startDate == null ||
      interval.startDate === "" || //If range picker is empty
      interval.endDate == null ||
      interval.endDate === ""
    ) {
      message.error("You can not pick only one date!");
      loadData([]);
      return;
    } else if (rangeDiffOk()) {
      fetchDataForTimeRange()
        .then((response) => {
          if (!(response.status === 200 || response.statusText === "OK")) {
            console.log(response);
            return [];
          }
          return response.data;
        })
        .then(loadData);
    }
  };

  const loadData = (transactions) => {
    data.transactions = transactions;
    console.log(data.transactions);
    fillChartData();
  };

  const fillChartData = () => {
    if (data.transactions.length) {
      let labels = [];
      let map = new Map();
      let totals = [];
      // filling labels
      let index = 0;
      for (let t of data.transactions) {
        if (typeof map.get(t.cardNumber) === "undefined") {
          // doesn't exist
          map.set(t.cardNumber, index);
          labels.push("Card number: " + t.cardNumber);
          totals.push(t.totalPrice);
          index++;
        } else {
          totals[map.get(t.cardNumber)] += t.totalPrice;
        }
      }
      // filling colors
      let backgroundColors = [];
      for (let i = 0; i < map.size; i++) {
        backgroundColors.push(genColor(backgroundColorStrength));
      }
      dataChart.data.labels = labels;
      dataChart.data.datasets.forEach((set) => {
        set.data = totals;
        set.backgroundColor = backgroundColors;
        let borderColors = [];
        backgroundColors.forEach((c) => {
          borderColors.push(
            c.substr(0, c.length - (backgroundColorStrength.length + 1)) +
              borderColorStrength +
              ")"
          );
        });
        set.borderColor = borderColors;
      });
    } else {
      dataChart.data = {
        labels: [],
        datasets: [
          {
            label: "# of Votes",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      };
    }

    ctx = document.getElementById("pieChart");
    if (!pieChart) pieChart = new Chart(ctx, dataChart);
    else pieChart.update();
  };

  const genColor = (strength) => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + "," + strength + ")";
  };

  const pickTime = () => (
    <div className={"timePicker"}>
      <RangePicker
        className={"picker"}
        ranges={{
          Today: [moment().startOf("day"), moment().endOf("day")],
          "This Week": [moment().startOf("week"), moment().endOf("week")],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        defaultValue={[moment().startOf("month"), moment().endOf("month")]}
        showTime
        format={rangePickerFormat}
        onChange={onChangeTime}
      />
      <Button
        className={"filterButton"}
        type={"primary"}
        shape={"round"}
        onClick={go}
      >
        Filter
      </Button>
    </div>
  );

  const rangeDiffOk = () => {
    const duration = moment.duration(
      moment(interval.endDate).diff(moment(interval.startDate))
    );
    if (duration.asHours() < 1) {
      message.error("Range difference has to be bigger than 1 hour!");
      return false;
    }
    return true;
  };

  const onChangeTime = (value, stringTime) => {
    interval = {
      startDate: stringTime[0],
      endDate: stringTime[1],
    };
  };

  useEffect(() => {
    go();
  }, []);

  return (
    <div className={"container"}>
      <Divider>
        <h1 className={"transactionsHeaderPie"}>
          Spendings by bank account for selected time range
        </h1>
      </Divider>
      {pickTime()}
      <Divider />
      <canvas
        style={{ margin: "20px auto" }}
        id={"pieChart"}
        width="738"
        height="598"
      />
    </div>
  );
}

export default TransakcijeBankovni;
