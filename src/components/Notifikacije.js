import React, { useState, useEffect } from "react";
import { Avatar, Empty, List, Divider } from "antd";
import {
  InfoCircleTwoTone,
  WarningTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, saveNotification, saveTransfer } from "../utilities/Common";

function Notifikacije() {
  const [notifications, setNotifications] = useState([
    // {
    //   notificationId: "jsjsjsjsjssiij",
    //   subjectId: "idTransakcije",
    //   message: "poruka",
    //   notificationStatus: "INFO",
    //   notificationType: "TRANSACTION",
    // },
    // {
    //   notificationId: "jsjsjsjsjssiij",
    //   subjectId: "idTransakcije",
    //   message: "poruka",
    //   notificationStatus: "ERROR",
    //   notificationType: "TRANSACTION",
    // },
    // {
    //   notificationId: "jsjsjsjsjssiij",
    //   subjectId: "idTransakcije",
    //   message: "poruka",
    //   notificationStatus: "WARNING",
    //   notificationType: "TRANSACTION",
    // },
  ]);

  const getNotifications = () => {
    axios
      .get("https://payment-server-si.herokuapp.com/api/notifications/all", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((res) => {
        console.log(res.data);
        setNotifications([...res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(getNotifications, []);

  const checkType = (notification) => {
    if (notification.notificationStatus === "INFO")
      return <InfoCircleTwoTone twoToneColor="#41bdf2" />;
    else if (notification.notificationStatus === "WARNING")
      return <WarningTwoTone twoToneColor="#f0a800" />;
    else if (notification.notificationStatus === "ERROR")
      return <CloseCircleTwoTone twoToneColor="#f00000" />;
  };

  const checkPath = (notification) => {
    if (
      notification.notificationStatus === "INFO" &&
      notification.notificationType === "MONEY_TRANSFER"
    )
      return "/transferi";
    else if (notification.notificationType === "TRANSACTION")
      return "/pregledTransakcija";
    else if (notification.notificationType === "ACCOUNT_BALANCE")
      return "/pregledRacuna";
  };

  const transferDetails = (id) => {
    axios
      .get(
        "https://payment-server-si.herokuapp.com/api/accounts/moneyTransfer/" +
          id,
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        saveTransfer(response.data.transfers[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Divider>
        <h1 style={{ color: "#030852" }}>Received notifications</h1>
      </Divider>
      {notifications.length === 0 ? (
        <Empty description="No notifications"></Empty>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              actions={[
                <Link
                  onClick={() => {
                    saveNotification(notification);
                    if (notification.notificationType === "MONEY_TRANSFER")
                      transferDetails(notification.subjectId);
                  }}
                  to={{
                    pathname: checkPath(notification),
                    notification: notification,
                  }}
                >
                  See more
                </Link>,
                // <Link
                //   onClick={() => {
                //     saveNotification(notification);
                //     if (notification.notificationType === "MONEY_TRANSFER")
                //       transferDetails(notification.subjectId);
                //   }}
                //   to={checkPath(notification)}
                // >
                //   See more
                // </Link>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: "white" }}
                    icon={checkType(notification)}
                  />
                }
                title={notification.notificationDateAndTime}
                description={notification.message}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
export default Notifikacije;
