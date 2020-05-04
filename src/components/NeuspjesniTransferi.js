import React from "react";
import { Collapse, Modal } from "antd";
import { getTransfer, getToken } from "../utilities/Common";
import axios from "axios";
import "../css/Transferi.css";

const { Panel } = Collapse;

const checkSrcAccount = () => {
  if (getTransfer().sourceCardNumber === null) return "/";
  else return getTransfer().sourceCardNumber;
};

const checkDestAccount = () => {
  if (getTransfer().destCardNumber === null) return "/";
  else return getTransfer().destCardNumber;
};

const h4Style = {
  color: "#030852",
};

const pStyle = {
  color: "black",
};

const getCustomCollapse = (notification, transfer) => {
  return (
    <div>
      <Collapse defaultActiveKey={"1"}>
        <Panel header={"Notification details"} key={"1"}>
          <h4>
            Date and time:{" "}
            <p style={pStyle}>{notification.notificationDateAndTime}</p>
          </h4>
          <h4 style={h4Style}>
            Notification ID: <p style={pStyle}>{notification.notificationId}</p>
          </h4>
          <h4 style={h4Style}>
            Message: <p style={pStyle}>{notification.message}</p>
          </h4>
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header={"Transfer details"} key={"2"}>
          <h4 style={h4Style}>
            Transfer ID: <p style={pStyle}>{transfer.id}</p>
          </h4>
          <h4 style={h4Style}>
            Transfered from: <p style={pStyle}>{checkSrcAccount()}</p>
          </h4>
          <h4 style={h4Style}>
            Transfered to: <p style={pStyle}>{checkDestAccount()}</p>
          </h4>
          <h4 style={h4Style}>
            Transfer date and time:{" "}
            <p style={pStyle}>{transfer.transferDateAndTime}</p>
          </h4>
          <h4 style={h4Style}>
            Transfered amount: <p style={pStyle}>{transfer.amount} KM</p>
          </h4>
          <h4 style={{ color: "red" }}>{transfer.paymentStatus}</h4>
        </Panel>
      </Collapse>
    </div>
  );
};

export const showFailedTransfer = async (notification) => {
  const transfer = await transferDetails(notification.subjectId);
  Modal.error({
    keyboard: true,
    mask: true,
    maskClosable: true,
    width: "500px",
    title: notification.notificationType,
    content: getCustomCollapse(notification, transfer),
  });
};

const transferDetails = (id) => {
  return axios
    .get(
      "https://payment-server-si.herokuapp.com/api/accounts/moneyTransfer/" +
        id,
      {
        headers: { Authorization: "Bearer " + getToken() },
      }
    )
    .then((response) => {
      return response.data.transfers[0];
      // console.log(response);
      // saveTransfer(response.data.transfers[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};

// return (
// <div style={{ textAlign: "center" }}>
//   <table className="failed-transfer">
//     <thead>
//       <tr rowSpan="2">
//         <th colSpan="2">Failed transfer details</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td className="first-col">Transfer id</td>
//         <td>{getTransfer().id}</td>
//       </tr>
//       <tr>
//         <td className="first-col">Transfered from</td>
//         <td>{checkSrcAccount()}</td>
//       </tr>
//       <tr>
//         <td className="first-col">Transfered to</td>
//         <td>{checkDestAccount()}</td>
//       </tr>
//       <tr>
//         <td className="first-col">Transfer date and time</td>
//         <td>{getTransfer().transferDateAndTime}</td>
//       </tr>
//       <tr>
//         <td className="first-col">Transfered amount</td>
//         <td>{getTransfer().amount} KM</td>
//       </tr>
//       <tr>
//         <td className="first-col">Payment status</td>
//         <td>{getTransfer().paymentStatus}</td>
//       </tr>
//     </tbody>
//   </table>
//   <Button
//     style={{
//       background: "#030852",
//       color: "white",
//       marginLeft: "auto",
//       marginRight: "auto",
//       marginTop: "20px",
//     }}
//   >
//     <Link to="/notifikacije">See all notifications</Link>
//   </Button>
// </div>
//);
