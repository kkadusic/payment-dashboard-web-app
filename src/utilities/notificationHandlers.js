import { Collapse, Modal } from "antd";
import axios from "axios";
import React from "react";
import { getToken } from "./Common";

const { Panel } = Collapse;

export const notificationType = {
  TRANSACTION: "TRANSACTION",
  MONEY_TRANSFER: "MONEY_TRANSFER",
  ACCOUNT_BALANCE: "ACCOUNT_BALANCE",
};
export const notificationStatus = {
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

const h4Style = {
  color: "blue",
};

const pStyle = {
  color: "black",
};

const getCustomCollapse = (notification, transaction) => {
  return (
    <div>
      <Collapse defaultActiveKey={"1"}>
        <Panel header={"Notification details"} key={"1"}>
          <h4>
            Date and Time:{" "}
            <p style={pStyle}>{notification.notificationDateAndTime}</p>
          </h4>
          <h4 style={h4Style}>
            Notification Id: <p style={pStyle}>{notification.notificationId}</p>
          </h4>
          <h4 style={h4Style}>
            Message: <p style={pStyle}>{notification.message}</p>
          </h4>
        </Panel>
        <Collapse>
          <Panel header={"Transaction details"} key={"2"}>
            <h4 style={h4Style}>
              Transaction Id:{" "}
              <p style={pStyle}>
                {transaction.transactionDataResponse.transactionId}
              </p>
            </h4>
            <h4 style={h4Style}>
              Card number:{" "}
              <p style={pStyle}>
                {transaction.transactionDataResponse.cardNumber}
              </p>
            </h4>
            <h4 style={h4Style}>
              Date:{" "}
              <p style={pStyle}>
                {transaction.transactionDataResponse.date.substr(0, 19)}
              </p>
            </h4>
            <h4 style={h4Style}>
              Total price:{" "}
              <p style={pStyle}>
                {transaction.transactionDataResponse.totalPrice} KM
              </p>
            </h4>
            <h4 style={h4Style}>
              Services:{" "}
              <p style={pStyle}>
                {transaction.transactionDataResponse.service}
              </p>
            </h4>
            <h4 style={{ color: "red" }}>{transaction.paymentStatus}</h4>
          </Panel>
        </Collapse>
      </Collapse>
    </div>
  );
};

export const showFailedTransaction = async (notification) => {
  const transaction = await getTransactionDetailsById(notification.subjectId);
  console.log(transaction);
  Modal.error({
    keyboard: true,
    mask: true,
    maskClosable: true,
    width: "500px",
    title: notification.notificationType,
    content: getCustomCollapse(notification, transaction),
  });
};

export const showCanceledTransaction = async (notification) => {
  const transaction = await getTransactionDetailsById(notification.subjectId);
  console.log(transaction);
  Modal.info({
    keyboard: true,
    mask: true,
    maskClosable: true,
    width: "500px",
    title: notification.notificationType,
    content: getCustomCollapse(notification, transaction),
  });
};

export const getTransactionDetailsById = (transactionId) => {
  return axios
    .get(
      "https://payment-server-si.herokuapp.com/api/transactions/details/" +
        transactionId,
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
