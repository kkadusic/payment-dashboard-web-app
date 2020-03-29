import React, { useState, useEffect } from "react";
import { Spin, Collapse,  } from "antd";
import AccountComponent from "./accountListComponent/accountComponent"
import {CaretRightOutlined} from "@ant-design/icons";
import axios from "axios"

import "./accountListComponent/accountComponent.css"
import {getToken} from "../utilities/Common";

const { Panel } = Collapse;

function DodaniRacuni() {
  const [accounts, setAccounts] = useState({
      data: [],
      loading: true
  });

  const loadData = () => {
      axios.get(
          "https://payment-server-si.herokuapp.com/api/accounts/all", {
              headers: {
                  Authorization: "Bearer " + getToken()
              }
          }
      ).then(res => {
          setAccounts({
              data: res.data,
              loading: false
          });
      }).catch(err => {
          console.log(err);
      });

  };

  const deleteAccount = (id) => {

    axios.delete(
        "https://payment-server-si.herokuapp.com/api/accounts/delete/" + id, {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
    ).then(() => {
        setAccounts({
            data: [],
            loading: true
        });
        loadData();
    }).catch(err => {
        console.log(err);
    });
  };

  // componentDidMount
  useEffect(loadData, []);

  let index = 1;

  return (
    <div>
      { (accounts.loading || !accounts.data) ? (
        <Spin size="large" style={{ "margin": "0" }}/>
      ) : (
        <Collapse accordion bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
          className="site-collapse-custom-collapse">
          {accounts.data.map(element =>
              <Panel header={element.bankName} key={element.id} className="site-collapse-custom-panel" forceRender={true}>
                <AccountComponent account = {element} deleteAccount = {deleteAccount}/>
              </Panel>
          )}
        </Collapse>

      )}
    </div>
  );
}

export default DodaniRacuni;
