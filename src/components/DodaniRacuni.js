import React, { useState, useEffect } from "react";
import {Collapse, Button, Tooltip} from "antd";
import AccountComponent from "./accountListComponent/accountComponent"
import {CaretRightOutlined, ReloadOutlined} from "@ant-design/icons";
import axios from "axios"

import "./accountListComponent/accountComponent.css"
import {getToken} from "../utilities/Common";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

const { Panel } = Collapse;

const loadData = (setAccounts) => {
    axios.get(
        "https://payment-server-si.herokuapp.com/api/accounts/all", {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
    ).then(res => {
        console.log(res.data);
        setAccounts({
            data: res.data,
            loading: false
        });
    }).catch(err => {
        console.log(err);
    });
};

function DodaniRacuni() {
    const [accounts, setAccounts] = useState({
        data: null,
        loading: true
    });



  const deleteAccount = (id) => {
    axios.delete(
        "https://payment-server-si.herokuapp.com/api/accounts/delete/" + id, {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
    ).then(() => {
        reload()
    }).catch(err => {
        console.log(err);
    });
  };

  const reload = () => {
      setAccounts({
          data: null,
          loading: true
      });
      loadData(setAccounts);
  };

  // componentDidMount
  useEffect(() => {
      if (accounts.data === null) loadData(setAccounts);
  }, [setAccounts]);

  return (
    <div>
      { (accounts.loading || !accounts.data) ? (
          <Tooltip title={"Loading..."}>
              <Button type={"primary"} shape={"circle"} className={"reload-button"} icon={<LoadingOutlined />}/>
          </Tooltip>
      ) : (
          <div>
              <Tooltip title={"Reload"}>
                  <Button type="primary" shape="circle" className={"reload-button"} onClick={reload}  icon={<ReloadOutlined />} />
              </Tooltip>
              <Collapse accordion bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                        className="site-collapse-custom-collapse">
                  {accounts.data.map(element =>
                      <Panel header={element.bankName} key={element.id} className="site-collapse-custom-panel" forceRender={true}>
                          <AccountComponent account = {element} deleteAccount = {deleteAccount}/>
                      </Panel>
                  )}
              </Collapse>
          </div>


      )}
    </div>
  );
}

export default DodaniRacuni;
