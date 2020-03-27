import React, { useState, useEffect } from "react";
import { Spin, Collapse,  } from "antd";
import AccountComponent from "./accountListComponent/accountComponent"
import {CaretRightOutlined} from "@ant-design/icons";

import "./accountListComponent/accountComponent.css"

const { Panel } = Collapse;

function DodaniRacuni() {
  const [accounts, setAccounts] = useState({
      data: [],
      loading: true
  });

  const data = [
      {
          id: 1,
          accountOwner: "Nermin",
          bankName: "Ziraat",
          expiryDate: "2020-03-27T13:26:44.000+0000",
          cardNumber: "000000000000000000"
      },
      {
          id: 2,
          accountOwner: "Nermin",
          bankName: "Ziraat",
          expiryDate: "2020-03-27T13:26:44.000+0000",
          cardNumber: "000000000000000000"
      },
      {
          id: 3,
          accountOwner: "Nermin",
          bankName: "Ziraat",
          expiryDate: "2020-03-27T13:26:44.000+0000",
          cardNumber: "000000000000000000"
      },
      {
          id: 4,
          accountOwner: "Nermin",
          bankName: "Ziraat",
          expiryDate: "2020-03-27T13:26:44.000+0000",
          cardNumber: "000000000000000000"
      }
  ];

  const loadData = () => {
      // tryout url
      // const url = "http://dummy.restapiexample.com/api/v1/employees";
      // fetch(url)
      //     .then(res => res.json())
      //     .then(posts => {
      //         console.log(posts);
      //         (posts.status === "ok" ||  posts.status === "success") ? setAccounts({
      //             data: posts.data,
      //             loading: false
      //         }) : setAccounts({
      //             data: [],
      //             loading: true
      //         });
      //     })
      //     .catch(e => {
      //         console.log(e);
      //     });

      setAccounts({
          data: data,
          loading: false
      })

  };

  const deleteAccount = (id) => {
    // delete receipt

    setAccounts({
        data: [],
        loading: true
    });
    loadData();
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
