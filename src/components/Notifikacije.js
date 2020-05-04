import React, { useState, useEffect } from "react";
import { Avatar, Empty, List, Divider, Input, message } from "antd";
import {
  InfoCircleTwoTone,
  WarningTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, saveNotification, saveTransfer } from "../utilities/Common";
import {
  notificationStatus,
  notificationType,
  showFailedTransaction,
  showCanceledTransaction,
} from "../utilities/notificationHandlers";
import { showFailedTransfer } from "./NeuspjesniTransferi";

const { Search } = Input;

function Notifikacije() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  let search = ''

  const getNotifications = () => {
    axios
      .get("https://payment-server-si.herokuapp.com/api/notifications/all", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((res) => {
        console.log(res.data);
        setNotifications([...res.data]);
        setFilteredNotifications([...res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(getNotifications, []);

  const checkType = (notification) => {
    if (notification.notificationStatus === notificationStatus.INFO)
      return <InfoCircleTwoTone twoToneColor="#41bdf2" />;
    else if (notification.notificationStatus === notificationStatus.WARNING)
      return <WarningTwoTone twoToneColor="#f0a800" />;
    else if (notification.notificationStatus === notificationStatus.ERROR)
      return <CloseCircleTwoTone twoToneColor="#f00000" />;
  };

  const checkPath = (notification) => {
    if (
      notification.notificationStatus === "INFO" &&
      notification.notificationType === "MONEY_TRANSFER"
    )
      return "/transferi";
    else if (
      notification.notificationStatus === "ERROR" &&
      notification.notificationType === "MONEY_TRANSFER"
    )
      return "/notifikacije";
    else if (notification.notificationType === notificationType.TRANSACTION) {
      if (
        notification.notificationStatus === notificationStatus.ERROR ||
        notification.message === "The transaction was canceled successfully!"
      )
        return "/notifikacije";
      else return "/pregledTransakcija";
    } else if (
      notification.notificationType === notificationType.ACCOUNT_BALANCE
    )
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

  const filterNotifications = (searchValue) => {

  }

  let filterWords;
  let hasType, hasStatus, type, status;
  let searchValues = [];
  let searchMessage = '';

  const setSearchParams = () => {
    filterWords = search.split(' ');
    hasType = 0;
    hasStatus = 0;
    type = '';
    status = '';
    searchValues = [];
    for (let word of filterWords) {
      if (word === notificationType.TRANSACTION
          || word === notificationType.MONEY_TRANSFER
          || word === notificationType.ACCOUNT_BALANCE){
        hasType++;
        type = word;
        console.log('type: ' + type);
      } else if (word === notificationStatus.INFO
          || word === notificationStatus.WARNING
          || word === notificationStatus.ERROR) {
        hasStatus++;
        status = word;
        console.log('status: ' + status);
      } else searchValues.push(word);
      console.log(searchValues);
    }
    if (hasType > 1) searchMessage += ' You have inputed more then one notification type';
    else if (hasStatus > 1) searchMessage += ' You have inputed more then one notification status';
    else searchMessage = '';
  }

  const refreshFIlteredNotifications = () => {
    setFilteredNotifications(notifications.filter(
        item => {
          if (status !== '' && !(item.notificationStatus === status)) {
            return false;
          }
          if (type !== '' && !(item.notificationType === type)) {
            return false;
          }
          for (let word of searchValues) {
            if (!item.message.toLowerCase().includes(word.toLowerCase())) {
              return false;
            }
          }
          return true;
        }));
    console.log(filteredNotifications);
  }

  const onSearch = (value) => {
    search = value;
    console.log('value: ' + search);
    setSearchParams();
    if (searchMessage !== '') {
      message.warning(searchMessage);
      return;
    }
    refreshFIlteredNotifications();
    const list = document.getElementById('notification-list');
    list.dataSource = filteredNotifications;
  }

  return (
    <div>
      <Divider>
        <h1 style={{ color: "#030852" }}>Received notifications</h1>
      </Divider>
      {notifications.length === 0 ? (
        <Empty description="No notifications"></Empty>
      ) : (
          <div>
            <Search
                placeholder={'Find notification'}
                enterButton={'Search'}
                size={'large'}
                onSearch={onSearch}
            />
            <List
                id={'notification-list'}
                itemLayout="horizontal"
                dataSource={filteredNotifications}
                renderItem={(notification) => (
                    <List.Item
                        actions={[
                          <Link
                              onClick={() => {
                                saveNotification(notification);
                                if (notification.notificationType === "MONEY_TRANSFER") {
                                  transferDetails(notification.subjectId);
                                  if (notification.notificationStatus === "ERROR")
                                    showFailedTransfer(notification);
                                } else if (
                                    notification.notificationType ==
                                    notificationType.TRANSACTION &&
                                    notification.notificationStatus ==
                                    notificationStatus.ERROR
                                )
                                  showFailedTransaction(notification);
                                else if (
                                    notification.notificationType === "TRANSACTION" &&
                                    notification.message ===
                                    "The transaction was canceled successfully!"
                                )
                                  showCanceledTransaction(notification);
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
          </div>

      )}
    </div>
  );
}
export default Notifikacije;
