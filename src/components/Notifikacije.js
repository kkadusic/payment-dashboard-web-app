import React, { useState, useEffect } from "react";
import { Avatar, Empty, List, Divider, Popover } from "antd";
import {
  CheckCircleTwoTone,
  InfoCircleTwoTone,
  WarningTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../utilities/Common";

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
            <List.Item>
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
